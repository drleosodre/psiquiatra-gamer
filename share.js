(function () {
  var foot = document.querySelector('.article-foot');
  if (!foot) return; // só em páginas de artigo
  var url = encodeURIComponent(window.location.href);
  var title = encodeURIComponent(document.title);
  var bar = document.createElement('div');
  bar.className = 'share';
  bar.innerHTML =
    '<span class="share-label">Compartilhe</span>' +
    '<a class="share-btn wa" target="_blank" rel="noopener" href="https://wa.me/?text=' + title + '%20' + url + '">WhatsApp</a>' +
    '<a class="share-btn x" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?url=' + url + '&text=' + title + '">X</a>' +
    '<a class="share-btn tg" target="_blank" rel="noopener" href="https://t.me/share/url?url=' + url + '&text=' + title + '">Telegram</a>';
  foot.parentNode.insertBefore(bar, foot);
})();
