#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Robo de publicacao do Psiquiatra Gamer.

O que faz, em uma execucao:
  1. Le agendados/fila.json e pega o PRIMEIRO post com status "pendente".
  2. Copia agendados/<slug>.html      -> <slug>.html        (raiz do site, PT)
     Copia agendados/en/<slug>.html   -> en/<slug>.html     (versao EN)
  3. Insere o card no index.html (PT) e no en/index.html (EN).
  4. Insere o item de feed e o item de data em analises.html e en/analises.html.
  5. Insere o post no topo do array POSTS em sidebar.js e en/sidebar.js.
  6. Acrescenta as duas URLs (PT e EN) no sitemap.xml.
  7. Marca o post como publicado na fila, com a data.

Regras de seguranca (o robo PARA sem alterar nada se algo estiver errado):
  - se o arquivo do post nao existir em agendados/, para.
  - se o post ja estiver no index.html, para (evita publicar duas vezes).
  - se algum marcador de insercao nao for encontrado, para.
Nada e' gravado no disco enquanto todas as verificacoes nao passarem.
"""

import json
import os
import re
import shutil
import sys
from datetime import datetime, timezone, timedelta

# Raiz do repositorio (o script vive em .github/scripts/)
RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

FILA = os.path.join(RAIZ, "agendados", "fila.json")
SITE = "https://psiquiatragamer.com.br"


def erro(msg):
    print("ERRO: " + msg)
    sys.exit(1)


def ler(caminho):
    with open(caminho, "r", encoding="utf-8") as f:
        return f.read()


def gravar(caminho, texto):
    with open(caminho, "w", encoding="utf-8") as f:
        f.write(texto)


def inserir_depois(texto, marcador, bloco, arquivo):
    """Insere `bloco` na linha seguinte a `marcador`. Erro se o marcador sumiu."""
    if marcador not in texto:
        erro("nao achei o marcador %r em %s. Nada foi alterado." % (marcador, arquivo))
    return texto.replace(marcador, marcador + "\n" + bloco, 1)


# ---------- montagem dos blocos de HTML ----------

def bloco_card(slug, d, idioma):
    ler_mais = "Ler análise →" if idioma == "pt" else "Read analysis →"
    return (
        '      <article class="card">\n'
        '        <span class="chip {classe}">{chip}</span>\n'
        '        <h3><a href="{slug}.html">{titulo}</a></h3>\n'
        '        <p>{descricao}</p>\n'
        '        <a class="more" href="{slug}.html">{ler_mais}</a>\n'
        '      </article>'
    ).format(classe=d["chip_classe"], chip=d["chip_card"], slug=slug,
             titulo=d["titulo"], descricao=d["descricao"], ler_mais=ler_mais)


def bloco_feed(slug, d):
    return (
        '      <a class="feed-item" href="{slug}.html">'
        '<span class="chip {classe}">{chip}</span>'
        '<span class="ft">{titulo}<span class="fd">{resumo}</span></span></a>'
    ).format(slug=slug, classe=d["chip_classe"], chip=d["chip_feed"],
             titulo=d["titulo"], resumo=d["resumo_feed"])


def bloco_data(slug, d):
    return '    <a href="{slug}.html">{titulo}</a>'.format(slug=slug, titulo=d["titulo"])


def bloco_sidebar(slug, d):
    return '    {{s:"{slug}", t:"{titulo}", g:null, c:"{classe}"}},'.format(
        slug=slug, titulo=d["titulo"], classe=d["chip_classe"])


def bloco_sitemap(slug, hoje):
    def url(caminho):
        return (
            "  <url>\n"
            "    <loc>{site}/{caminho}</loc>\n"
            "    <lastmod>{hoje}</lastmod>\n"
            "    <changefreq>monthly</changefreq>\n"
            "    <priority>0.8</priority>\n"
            "  </url>\n"
        ).format(site=SITE, caminho=caminho, hoje=hoje)
    return url(slug + ".html") + url("en/" + slug + ".html")


# ---------- programa principal ----------

def main():
    if not os.path.exists(FILA):
        erro("nao encontrei a fila em %s" % FILA)

    fila = json.loads(ler(FILA))
    pendentes = [p for p in fila["posts"] if p.get("status") == "pendente"]

    if not pendentes:
        print("Fila vazia. Hora de escrever posts novos (PT + EN). Nada a publicar.")
        return

    post = pendentes[0]
    slug = post["slug"]
    print("Post da vez: %s" % slug)

    # --- verificacoes antes de tocar em qualquer arquivo ---
    origem_pt = os.path.join(RAIZ, "agendados", slug + ".html")
    origem_en = os.path.join(RAIZ, "agendados", "en", slug + ".html")
    for caminho in (origem_pt, origem_en):
        if not os.path.exists(caminho):
            erro("o arquivo do post nao existe: %s" % caminho)

    alvos = {
        "index_pt":    os.path.join(RAIZ, "index.html"),
        "index_en":    os.path.join(RAIZ, "en", "index.html"),
        "analises_pt": os.path.join(RAIZ, "analises.html"),
        "analises_en": os.path.join(RAIZ, "en", "analises.html"),
        "sidebar_pt":  os.path.join(RAIZ, "sidebar.js"),
        "sidebar_en":  os.path.join(RAIZ, "en", "sidebar.js"),
        "sitemap":     os.path.join(RAIZ, "sitemap.xml"),
    }
    for nome, caminho in alvos.items():
        if not os.path.exists(caminho):
            erro("arquivo do site nao encontrado: %s" % caminho)

    conteudo = {nome: ler(caminho) for nome, caminho in alvos.items()}

    # ja publicado? nao repete.
    if (slug + ".html") in conteudo["index_pt"]:
        erro("o post %s ja aparece no index.html. Parece que ja foi publicado. "
             "Nada foi alterado, marque o status na fila." % slug)

    hoje = datetime.now(timezone(timedelta(hours=-3))).strftime("%Y-%m-%d")

    # --- montagem (ainda so em memoria) ---
    conteudo["index_pt"] = inserir_depois(
        conteudo["index_pt"], '    <div class="grid">',
        bloco_card(slug, post["pt"], "pt"), "index.html")

    conteudo["index_en"] = inserir_depois(
        conteudo["index_en"], '    <div class="grid">',
        bloco_card(slug, post["en"], "en"), "en/index.html")

    conteudo["analises_pt"] = inserir_depois(
        conteudo["analises_pt"], "      <!-- FEED-TOP -->",
        bloco_feed(slug, post["pt"]), "analises.html")
    conteudo["analises_pt"] = inserir_depois(
        conteudo["analises_pt"], "      <!-- DATA-TOP -->",
        bloco_data(slug, post["pt"]), "analises.html")

    conteudo["analises_en"] = inserir_depois(
        conteudo["analises_en"], "      <!-- FEED-TOP -->",
        bloco_feed(slug, post["en"]), "en/analises.html")
    conteudo["analises_en"] = inserir_depois(
        conteudo["analises_en"], "      <!-- DATA-TOP -->",
        bloco_data(slug, post["en"]), "en/analises.html")

    conteudo["sidebar_pt"] = inserir_depois(
        conteudo["sidebar_pt"], "  var POSTS = [",
        bloco_sidebar(slug, post["pt"]), "sidebar.js")
    conteudo["sidebar_en"] = inserir_depois(
        conteudo["sidebar_en"], "  var POSTS = [",
        bloco_sidebar(slug, post["en"]), "en/sidebar.js")

    if "</urlset>" not in conteudo["sitemap"]:
        erro("sitemap.xml sem a tag </urlset>. Nada foi alterado.")
    conteudo["sitemap"] = conteudo["sitemap"].replace(
        "</urlset>", bloco_sitemap(slug, hoje) + "</urlset>", 1)

    # --- a partir daqui grava no disco ---
    shutil.copyfile(origem_pt, os.path.join(RAIZ, slug + ".html"))
    shutil.copyfile(origem_en, os.path.join(RAIZ, "en", slug + ".html"))
    for nome, caminho in alvos.items():
        gravar(caminho, conteudo[nome])

    post["status"] = "publicado"
    post["publicado_em"] = hoje
    gravar(FILA, json.dumps(fila, ensure_ascii=False, indent=2) + "\n")

    restantes = len([p for p in fila["posts"] if p.get("status") == "pendente"])
    print("Publicado: %s" % post["pt"]["titulo"])
    print("PT: %s/%s.html" % (SITE, slug))
    print("EN: %s/en/%s.html" % (SITE, slug))
    print("Restam %d post(s) na fila." % restantes)

    # deixa o titulo disponivel para a mensagem de commit
    saida = os.environ.get("GITHUB_OUTPUT")
    if saida:
        with open(saida, "a", encoding="utf-8") as f:
            f.write("slug=%s\n" % slug)
            f.write("publicou=sim\n")
            f.write("restantes=%d\n" % restantes)


if __name__ == "__main__":
    main()
