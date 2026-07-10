(function() {
  var PER_PAGE = 20;
  var currentPage = 1;
  var allTools = [];
  var categoryId = '';

  // Detect category ID from URL path: /tools/{category-id}/
  var parts = window.location.pathname.replace(/\/+$/,'').split('/');
  for (var i = 0; i < parts.length; i++) {
    if (parts[i] === 'tools' && i + 1 < parts.length) {
      categoryId = parts[i + 1];
      break;
    }
  }

  var grid = document.getElementById('toolsSubgrid');
  var bar = document.getElementById('paginationBar');
  var info = document.getElementById('paginationInfo');
  if (!grid) return;

  fetch('/tools/tools-master.json')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      allTools = (data.tools && data.tools[categoryId]) || [];
      renderPage(1);
    })
    .catch(function() {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);">Failed to load tools.</p>';
    });

  function renderPage(page) {
    currentPage = page;
    grid.innerHTML = '';

    var totalPages = Math.ceil(allTools.length / PER_PAGE) || 1;
    var start = (page - 1) * PER_PAGE;
    var end = Math.min(start + PER_PAGE, allTools.length);
    var pageTools = allTools.slice(start, end);

    pageTools.forEach(function(tool) {
      var card = document.createElement('div');
      card.className = 'tool-item-card';
      var linkHref = tool.link && tool.link !== '#' ? tool.link : '#';
      card.innerHTML =
        '<div class="tool-icon"><i class="' + tool.icon_class + '"></i></div>' +
        '<h4>' + tool.title + '</h4>' +
        '<p>' + tool.desc + '</p>' +
        '<a href="' + linkHref + '" class="btn-sm ' + (linkHref === '#' ? 'disabled-link' : '') + '">' + (linkHref === '#' ? 'Coming Soon' : 'Open Tool') + '</a>';
      grid.appendChild(card);
    });

    if (info) {
      if (allTools.length === 0) {
        info.textContent = 'No tools available in this category yet.';
      } else {
        info.textContent = 'Showing ' + (start + 1) + '\u2013' + end + ' of ' + allTools.length + ' tools';
      }
    }

    // Pagination
    if (bar) {
      bar.innerHTML = '';
      if (totalPages <= 1) return;

      var prevBtn = document.createElement('button');
      prevBtn.className = 'page-btn';
      prevBtn.textContent = 'Previous';
      prevBtn.disabled = page === 1;
      prevBtn.onclick = function() { renderPage(page - 1); };
      bar.appendChild(prevBtn);

      for (var i = 1; i <= totalPages; i++) {
        (function(p) {
          var btn = document.createElement('button');
          btn.className = 'page-btn' + (p === page ? ' active' : '');
          btn.textContent = p;
          btn.onclick = function() { renderPage(p); };
          bar.appendChild(btn);
        })(i);
      }

      var nextBtn = document.createElement('button');
      nextBtn.className = 'page-btn';
      nextBtn.textContent = 'Next';
      nextBtn.disabled = page === totalPages;
      nextBtn.onclick = function() { renderPage(page + 1); };
      bar.appendChild(nextBtn);
    }
  }
})();
