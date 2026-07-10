(function() {
  function init() {
    var toolsContainer = document.getElementById('sidebarTools');
    var postsContainer = document.getElementById('sidebarPosts');
    if (!toolsContainer && !postsContainer) return;

    if (toolsContainer) {
      fetch('/tools/tools-master.json')
        .then(function(r) { return r.json(); })
        .then(function(data) {
          var allTools = [];
          Object.keys(data.tools || {}).forEach(function(catKey) {
            (data.tools[catKey] || []).forEach(function(t) {
              if (t.link && t.link !== '#') {
                allTools.push({ title: t.title, link: t.link });
              }
            });
          });
          var shuffled = allTools.sort(function() { return 0.5 - Math.random(); });
          var picked = shuffled.slice(0, 10);
          var html = '';
          picked.forEach(function(t) {
            html += '<li><a href="' + t.link + '">' + t.title + '</a></li>';
          });
          toolsContainer.innerHTML = html;
        })
        .catch(function() {
          toolsContainer.innerHTML = '<li><a href="/tools/">Browse all tools</a></li>';
        });
    }

    if (postsContainer) {
      var html = '<li><a href="https://blog.yougrowonline.in/">Visit Our Blog &rarr;</a></li>';
      postsContainer.innerHTML = html;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
