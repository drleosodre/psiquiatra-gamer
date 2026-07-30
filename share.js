(function () {
  var hero = document.querySelector('.post-hero');
  if (!hero) return; // só em páginas de artigo (têm imagem de destaque)
  var url = encodeURIComponent(window.location.href);
  var title = encodeURIComponent(document.title);

  var ICONS = {
    x: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 4l16 16M20 4L4 20" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" fill="none"/></svg>',
    wa: '<svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><path d="M17 14.5c-.3 1.4-2.3 2.6-3.7 2.6-1 0-2.7-.4-5.6-3s-3.4-4.8-3.5-5.8c-.1-1.4 1-3.3 2.4-3.7.4-.1.8 0 1 .3l1.3 2c.2.3.2.7 0 1l-.7 1c-.2.3-.2.6 0 .9.5.9 1.4 1.8 2.3 2.3.3.2.6.2.9 0l1-.7c.3-.2.7-.2 1 0l2 1.3c.3.2.4.6.3 1z" fill="currentColor"/></svg>',
    li: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><text x="12" y="16.5" font-family="Arial, sans-serif" font-weight="700" font-size="11.5" text-anchor="middle" fill="currentColor">in</text></svg>',
    tg: '<svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><path d="M3 11.7L20 4.3c.8-.3 1.5.2 1.2 1.4l-2.8 13.2c-.2.9-.8 1.1-1.5.7l-4.1-3-2 1.9c-.2.2-.4.3-.8.3l.3-4 7.3-6.6c.3-.3-.1-.4-.5-.2L8.3 13 4 11.7z" fill="currentColor"/></svg>',
    fb: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M14.5 9H13V7.5c0-.6.4-.7.7-.7h1.3V4.3L13 4.3c-2.3 0-3 1.7-3 2.8V9H8.5v2.5H10V20h3v-8.5h2l.3-2.5z" fill="currentColor"/></svg>',
    rd: '<svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><circle cx="12" cy="14" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 8.5L6.2 5.2" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/><circle cx="5.7" cy="4.3" r="1" fill="currentColor"/><path d="M16 8.5l1.8-3.3" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/><circle cx="18.3" cy="4.3" r="1" fill="currentColor"/><circle cx="9.4" cy="13" r="1" fill="currentColor"/><circle cx="14.6" cy="13" r="1" fill="currentColor"/><path d="M9 16.3h6" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>',
    mail: '<svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><path d="M4 6h16v12H4z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M4 6l8 7 8-7" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>'
  };

  var NETWORKS = [
    { cls: 'x',    label: 'X',         href: 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title },
    { cls: 'wa',   label: 'WhatsApp',  href: 'https://wa.me/?text=' + title + '%20' + url },
    { cls: 'li',   label: 'LinkedIn',  href: 'https://www.linkedin.com/sharing/share-offsite/?url=' + url },
    { cls: 'tg',   label: 'Telegram',  href: 'https://t.me/share/url?url=' + url + '&text=' + title },
    { cls: 'fb',   label: 'Facebook',  href: 'https://www.facebook.com/sharer/sharer.php?u=' + url },
    { cls: 'rd',   label: 'Reddit',    href: 'https://www.reddit.com/submit?url=' + url + '&title=' + title },
    { cls: 'mail', label: 'E-mail',    href: 'mailto:?subject=' + title + '&body=' + url }
  ];

  var bar = document.createElement('div');
  bar.className = 'share-top';
  var html = '<span class="share-top-label">Compartilhe em</span><div class="share-icons">';
  NETWORKS.forEach(function (n) {
    var target = n.cls === 'mail' ? '' : ' target="_blank" rel="noopener"';
    html += '<a class="share-ic ' + n.cls + '"' + target + ' href="' + n.href + '" aria-label="Compartilhar no ' + n.label + '" title="' + n.label + '">' + ICONS[n.cls] + '</a>';
  });
  html += '</div>';
  bar.innerHTML = html;

  hero.parentNode.insertBefore(bar, hero.nextSibling);
})();
