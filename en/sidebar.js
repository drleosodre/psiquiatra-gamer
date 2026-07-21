/* Side navigation menu, single source, injected on every article page (English).
   When publishing a new post, add an item to the top of the POSTS array below. */
(function(){
  var POSTS = [
    {s:"luto-nos-games", t:"Grief in games: why it hurts when a character dies", g:null, c:"conceitos"},
    {s:"avatar-estagio-do-espelho", t:"The avatar and the mirror: why we get attached to the character", g:null, c:"conceitos"},
    {s:"hype-frustracao", t:"Why the games we hype the most are the ones that disappoint us most", g:null, c:"cultura"},
    {s:"personas-streamers", t:"Streamers and the ego-ideal: who are you when the camera turns on", g:null, c:"cultura"},
    {s:"o-olhar-no-horror", t:"Why the monster that stares back scares you more", g:null, c:"conceitos"},
    {s:"gozo-jouissance", t:"Why we keep playing what stopped being fun", g:null, c:"conceitos"},
    {s:"playstation-sem-midia-fisica", t:"PlayStation without physical media: the dread of not owning your game", g:"PlayStation (physical media)", c:"cultura"},
    {s:"resident-evil", t:"Resident Evil: the horror of a body that refuses to die", g:"Resident Evil", c:"analises"},
    {s:"alan-wake", t:"Alan Wake: the writer facing his own unconscious", g:"Alan Wake", c:"analises"},
    {s:"life-is-strange", t:"Life is Strange: rewinding time is a psychic defense", g:"Life is Strange", c:"analises"},
    {s:"warhammer-40000", t:"Warhammer 40,000: an empire that worships a dead father", g:"Warhammer 40,000", c:"analises"},
    {s:"gears-of-war", t:"Gears of War: the manly armor and the grief beneath it", g:"Gears of War", c:"analises"},
    {s:"a-plague-tale", t:"A Plague Tale: the dead mother and the marked child", g:"A Plague Tale", c:"analises"},
    {s:"bioshock", t:'BioShock: "Would you kindly" and the illusion of free will', g:"BioShock", c:"analises"},
    {s:"hellblade-senua", t:"Hellblade: psychosis seen from the inside", g:"Hellblade", c:"analises"},
    {s:"red-dead-redemption-2", t:"Red Dead Redemption 2: Arthur Morgan and psychic redemption", g:"Red Dead Redemption 2", c:"analises"},
    {s:"god-of-war", t:"God of War: Greek tragedy, Oedipus and Kratos's rage", g:"God of War", c:"analises"},
    {s:"silent-hill-2", t:"Silent Hill 2: guilt and the return of the repressed", g:"Silent Hill 2", c:"analises"},
    {s:"fomo-gta6", t:"FOMO in gaming: what GTA 6 reveals about desire", g:"GTA 6 (FOMO)", c:"cultura"},
    {s:"brutal-legend-ozzy", t:"Ozzy Osbourne in video games: the excess that won't be silenced", g:"Brütal Legend (Ozzy)", c:"cultura"},
    {s:"samurai-e-ninja", t:"Why do we love samurai and ninja? Psychoanalysis answers", g:"Ghost of Yōtei", c:"cultura"},
    {s:"death-stranding-2", t:"Death Stranding 2: grief, trauma and depression", g:"Death Stranding 2", c:"analises"},
    {s:"death-stranding", t:"Death Stranding: the psychoanalysis behind Kojima's game", g:"Death Stranding", c:"analises"},
    {s:"gta", t:"Why is GTA so addictive? Psychoanalysis explains", g:"GTA", c:"analises"},
    {s:"the-last-of-us-2", t:"The Last of Us 2: why the story sabotages itself", g:"The Last of Us 2", c:"analises"},
    {s:"the-plucky-squire", t:"The Plucky Squire: psychological analysis and meaning", g:"The Plucky Squire", c:"cultura"}
  ];
  var CATS = [["analises","Analyses"],["cultura","Gaming Culture"],["conceitos","Concepts"]];
  function esc(x){return String(x).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
  var here = location.pathname.split("/").pop().replace(/\.html$/,"");

  function link(slug,text){
    var cur = slug===here ? ' class="cur"' : '';
    return '<a href="'+slug+'.html"'+cur+'>'+esc(text)+'</a>';
  }
  // By game (A-Z)
  var jogos = POSTS.filter(function(p){return p.g;}).slice().sort(function(a,b){return a.g.toLowerCase()<b.g.toLowerCase()?-1:1;});
  var vJogo = jogos.map(function(p){return link(p.s,p.g);}).join("");
  // By date
  var vData = POSTS.map(function(p){return link(p.s,p.t);}).join("");
  // By category
  var vCat = CATS.map(function(c){
    var g = POSTS.filter(function(p){return p.c===c[0];});
    var items = g.map(function(p){return link(p.s, p.g||p.t);}).join("");
    return '<div class="arc-grp"><div class="arc-grp-h">'+esc(c[1])+' <span class="n">'+g.length+'</span></div>'+items+'</div>';
  }).join("");

  var HTML =
    '<div class="arc-side-label">Browse by</div>'+
    '<div class="arc-tabs">'+
      '<button class="arc-tab on" data-tab="jogo">By game (A–Z)</button>'+
      '<button class="arc-tab" data-tab="data">By date</button>'+
      '<button class="arc-tab" data-tab="cat">By category</button>'+
    '</div>'+
    '<nav class="arc-view on" id="sv-jogo">'+vJogo+'</nav>'+
    '<nav class="arc-view" id="sv-data">'+vData+'</nav>'+
    '<nav class="arc-view" id="sv-cat">'+vCat+'</nav>';

  function init(){
    var art = document.querySelector('article.article');
    if(!art) return;                                   // article pages only
    if(document.querySelector('.home-side')||document.querySelector('.arc-side')||document.querySelector('.site-side')) return; // home/analises already have it
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
