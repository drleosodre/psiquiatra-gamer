(function () {
  var hero = document.querySelector('.post-hero');
  if (!hero) return; // só em páginas de artigo (têm imagem de destaque)
  var url = encodeURIComponent(window.location.href);
  var title = encodeURIComponent(document.title);

  var ICONS = {
    x: '<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>',
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
