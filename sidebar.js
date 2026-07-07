/* Menu lateral de navegação — fonte única, injetado em todas as páginas de artigo.
   Ao publicar um post novo, adicionar um item no início do array POSTS abaixo. */
(function(){
  var POSTS = [
    {s:"o-olhar-no-horror", t:"Por que o monstro que te encara dá mais medo", g:null, c:"conceitos"},
    {s:"gozo-jouissance", t:"Por que a gente continua jogando o que já cansou de divertir", g:null, c:"conceitos"},
    {s:"playstation-sem-midia-fisica", t:"PlayStation sem mídia física: a angústia de não ser dono do jogo", g:"PlayStation (mídia física)", c:"cultura"},
    {s:"resident-evil", t:"Resident Evil: o horror do corpo que se recusa a morrer", g:"Resident Evil", c:"analises"},
    {s:"alan-wake", t:"Alan Wake: o escritor diante do próprio inconsciente", g:"Alan Wake", c:"analises"},
    {s:"life-is-strange", t:"Life is Strange: rebobinar o tempo é uma defesa psíquica", g:"Life is Strange", c:"analises"},
    {s:"warhammer-40000", t:"Warhammer 40.000: um império que adora um pai morto", g:"Warhammer 40.000", c:"analises"},
    {s:"gears-of-war", t:"Gears of War: a armadura viril e o luto por baixo dela", g:"Gears of War", c:"analises"},
    {s:"a-plague-tale", t:"A Plague Tale: a mãe morta e o filho marcado", g:"A Plague Tale", c:"analises"},
    {s:"bioshock", t:'BioShock: "Would you kindly" e a ilusão do livre-arbítrio', g:"BioShock", c:"analises"},
    {s:"hellblade-senua", t:"Hellblade: a psicose vista por dentro", g:"Hellblade", c:"analises"},
    {s:"red-dead-redemption-2", t:"Red Dead Redemption 2: Arthur Morgan e a redenção psíquica", g:"Red Dead Redemption 2", c:"analises"},
    {s:"god-of-war", t:"God of War: tragédia grega, Édipo e a fúria de Kratos", g:"God of War", c:"analises"},
    {s:"silent-hill-2", t:"Silent Hill 2: a culpa e o retorno do recalcado", g:"Silent Hill 2", c:"analises"},
    {s:"fomo-gta6", t:"FOMO nos games: o que o GTA 6 revela sobre o desejo", g:"GTA 6 (FOMO)", c:"cultura"},
    {s:"brutal-legend-ozzy", t:"Ozzy Osbourne nos videogames: o excesso que não se cala", g:"Brütal Legend (Ozzy)", c:"cultura"},
    {s:"samurai-e-ninja", t:"Por que amamos samurais e ninjas? A psicanálise responde", g:"Ghost of Yōtei", c:"cultura"},
    {s:"death-stranding-2", t:"Death Stranding 2: luto, trauma e depressão", g:"Death Stranding 2", c:"analises"},
    {s:"death-stranding", t:"Death Stranding: a psicanálise por trás do jogo do Kojima", g:"Death Stranding", c:"analises"},
    {s:"gta", t:"Por que o GTA é tão viciante? A psicanálise explica", g:"GTA", c:"analises"},
    {s:"the-last-of-us-2", t:"The Last of Us 2: por que a história se sabota", g:"The Last of Us 2", c:"analises"},
    {s:"the-plucky-squire", t:"The Plucky Squire: análise psicológica e significado", g:"The Plucky Squire", c:"cultura"}
  ];
  var CATS = [["analises","Análises"],["cultura","Cultura Gamer"],["conceitos","Conceitos"]];
  function esc(x){return String(x).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
  var here = location.pathname.split("/").pop().replace(/\.html$/,"");

  function link(slug,text){
    var cur = slug===here ? ' class="cur"' : '';
    return '<a href="'+slug+'.html"'+cur+'>'+esc(text)+'</a>';
  }
  // Por jogo (A-Z)
  var jogos = POSTS.filter(function(p){return p.g;}).slice().sort(function(a,b){return a.g.toLowerCase()<b.g.toLowerCase()?-1:1;});
  var vJogo = jogos.map(function(p){return link(p.s,p.g);}).join("");
  // Por data
  var vData = POSTS.map(function(p){return link(p.s,p.t);}).join("");
  // Por categoria
  var vCat = CATS.map(function(c){
    var g = POSTS.filter(function(p){return p.c===c[0];});
    var items = g.map(function(p){return link(p.s, p.g||p.t);}).join("");
    return '<div class="arc-grp"><div class="arc-grp-h">'+esc(c[1])+' <span class="n">'+g.length+'</span></div>'+items+'</div>';
  }).join("");

  var HTML =
    '<div class="arc-side-label">Navegar por</div>'+
    '<div class="arc-tabs">'+
      '<button class="arc-tab on" data-tab="jogo">Por jogo (A–Z)</button>'+
      '<button class="arc-tab" data-tab="data">Por data</button>'+
      '<button class="arc-tab" data-tab="cat">Por categoria</button>'+
    '</div>'+
    '<nav class="arc-view on" id="sv-jogo">'+vJogo+'</nav>'+
    '<nav class="arc-view" id="sv-data">'+vData+'</nav>'+
    '<nav class="arc-view" id="sv-cat">'+vCat+'</nav>';

  function init(){
    var art = document.querySelector('article.article');
    if(!art) return;                                   // só páginas de artigo
    if(document.querySelector('.home-side')||document.querySelector('.arc-side')||document.querySelector('.site-side')) return; // home/analises já têm
    var aside = document.createElement('aside');
    aside.className = 'site-side';
    aside.innerHTML = HTML;
    var layout = document.createElement('div');
    layout.className = 'site-layout';
    art.parentNode.insertBefore(layout, art);
    layout.appendChild(aside);
    layout.appendChild(art);
    aside.querySelectorAll('.arc-tab').forEach(function(b){
      b.addEventListener('click', function(){
        aside.querySelectorAll('.arc-tab').forEach(function(x){x.classList.remove('on');});
        aside.querySelectorAll('.arc-view').forEach(function(x){x.classList.remove('on');});
        b.classList.add('on');
        aside.querySelector('#sv-'+b.dataset.tab).classList.add('on');
      });
    });
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}else{init();}
})();
