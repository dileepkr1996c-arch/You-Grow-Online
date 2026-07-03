// YOU GROW ONLINE - Front-End Logic Engine
// Dynamic single-page navigation router, calculator estimator, lead submission logging & reviews persistence.

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements Cache ---
  const pages = {
    home: document.getElementById('page-home'),
    about: document.getElementById('page-about'),
    services: document.getElementById('page-services'),
    portfolio: document.getElementById('page-portfolio'),
    pricing: document.getElementById('page-pricing'),
    testimonials: document.getElementById('page-testimonials'),
    faq: document.getElementById('page-faq'),
    contact: document.getElementById('page-contact')
  };

  const navButtons = document.querySelectorAll('.nav-link');
  const mobileNavContainer = document.getElementById('mobile-nav-menu');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const mobileNavButtons = document.querySelectorAll('.mobile-nav-link');
  
  // --- Initialize Lucide Icons ---
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- Dark Mode State Engine ---
  let darkMode = localStorage.getItem('ygo_dark_mode') !== 'false'; // Defaults to true
  
  function applyTheme() {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      if (themeToggleBtn) themeToggleBtn.innerHTML = '<i data-lucide="sun" class="w-5 h-5 text-yellow-400"></i>';
      if (themeToggleMobile) themeToggleMobile.innerHTML = '<i data-lucide="sun" class="w-4 h-4 text-yellow-400"></i>';
    } else {
      document.documentElement.classList.remove('dark');
      if (themeToggleBtn) themeToggleBtn.innerHTML = '<i data-lucide="moon" class="w-5 h-5 text-slate-800 dark:text-white"></i>';
      if (themeToggleMobile) themeToggleMobile.innerHTML = '<i data-lucide="moon" class="w-4 h-4 text-slate-600 dark:text-slate-350"></i>';
    }
    if (window.lucide) {
      window.lucide.createIcons();
    }
    localStorage.setItem('ygo_dark_mode', darkMode);
  }

  themeToggleBtn.addEventListener('click', () => {
    darkMode = !darkMode;
    applyTheme();
  });

  applyTheme();

  // --- Router & Page Switching ---
  function navigateTo(pageId) {
    if (!pages[pageId]) pageId = 'home';
    
    // Hide all pages
    Object.keys(pages).forEach(key => {
      if (pages[key]) {
        pages[key].classList.add('hidden');
      }
    });

    // Show active page
    pages[pageId].classList.remove('hidden');

    // Update address hash
    window.location.hash = pageId;

    // Update navigation styles
    navButtons.forEach(btn => {
      const pageValue = btn.getAttribute('data-page');
      if (pageValue === pageId) {
        btn.classList.add('text-blue-600', 'dark:text-blue-400', 'bg-blue-50', 'dark:bg-blue-900/30');
        btn.classList.remove('text-slate-600', 'dark:text-slate-300');
      } else {
        btn.classList.remove('text-blue-600', 'dark:text-blue-400', 'bg-blue-50', 'dark:bg-blue-900/30');
        btn.classList.add('text-slate-600', 'dark:text-slate-300');
      }
    });

    // Update mobile navigation styles
    mobileNavButtons.forEach(btn => {
      const pageValue = btn.getAttribute('data-page-trigger');
      if (pageValue === pageId) {
        btn.classList.add('bg-blue-50', 'dark:bg-blue-900/30', 'text-blue-600', 'dark:text-blue-400');
        btn.classList.remove('text-slate-600', 'dark:text-slate-350');
      } else {
        btn.classList.remove('bg-blue-50', 'dark:bg-blue-900/30', 'text-blue-600', 'dark:text-blue-400');
        btn.classList.add('text-slate-600', 'dark:text-slate-350');
      }
    });

    // Close mobile menu drawer if open
    mobileNavContainer.classList.add('opacity-0', 'scale-y-95', 'pointer-events-none');
    mobileNavContainer.classList.remove('opacity-100', 'scale-y-100', 'pointer-events-auto');

    // Reset mobile menu toggle icon to "menu"
    if (mobileMenuToggle) {
      mobileMenuToggle.innerHTML = '<i data-lucide="menu" class="w-5 h-5"></i>';
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }

    // Smooth scroll to top of window
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // Bind navigation click triggers
  document.querySelectorAll('[data-page-trigger]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const pageId = e.currentTarget.getAttribute('data-page-trigger');
      navigateTo(pageId);
    });
  });

  // Handle mobile drawer toggles
  mobileMenuToggle.addEventListener('click', () => {
    const isClosed = mobileNavContainer.classList.contains('pointer-events-none');
    if (isClosed) {
      mobileNavContainer.classList.remove('opacity-0', 'scale-y-95', 'pointer-events-none');
      mobileNavContainer.classList.add('opacity-100', 'scale-y-100', 'pointer-events-auto');
      mobileMenuToggle.innerHTML = '<i data-lucide="x" class="w-5 h-5"></i>';
    } else {
      mobileNavContainer.classList.add('opacity-0', 'scale-y-95', 'pointer-events-none');
      mobileNavContainer.classList.remove('opacity-100', 'scale-y-100', 'pointer-events-auto');
      mobileMenuToggle.innerHTML = '<i data-lucide="menu" class="w-5 h-5"></i>';
    }
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  // Listen for hash modifications
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && pages[hash]) {
      navigateTo(hash);
    }
  });

  // Determine initial entry page from hash reload
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && pages[initialHash]) {
    navigateTo(initialHash);
  } else {
    navigateTo('home');
  }

  // --- Dynamic Content Rendering (Templates Helper) ---
  
  // 1. Render Niche Services
  const servicesContainerHome = document.getElementById('services-grid-home');
  const servicesContainerDetail = document.getElementById('services-grid-detail');
  
  function renderServices() {
    let homeHtml = '';
    let detailHtml = '';
    
    agencyServices.forEach((service, idx) => {
      const cardBenefits = service.benefits.slice(0,3).map(b => `
        <li class="flex items-center space-x-2">
          <span class="w-1.5 h-1.5 bg-blue-500 rounded-full inline-block"></span>
          <span>${b}</span>
        </li>
      `).join('');

      const allBenefits = service.benefits.map(b => `
        <div class="flex items-center space-x-2">
          <span class="w-1.5 h-1.5 bg-blue-500 rounded-full inline-block"></span>
          <span>${b}</span>
        </div>
      `).join('');

      // Simple HTML snippet for home preview
      homeHtml += `
        <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
          <div class="space-y-4">
            <div class="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <i data-lucide="${service.icon}" class="w-5 h-5"></i>
            </div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">${service.title}</h3>
            <p class="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">${service.subtitle}</p>
            <ul class="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-300 pt-2">
              ${cardBenefits}
            </ul>
          </div>
          <div class="border-t border-slate-150 dark:border-slate-800/50 mt-6 pt-4 flex items-center justify-between">
            <div class="text-xs">
              <span class="text-slate-450 dark:text-slate-400 block font-normal">Est. Budget:</span>
              <span class="font-bold text-slate-800 dark:text-white font-mono">${service.priceEstimate.replace('Starts at ', '')}</span>
            </div>
            <button data-page-trigger="contact" class="p-2 h-9 w-9 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white dark:bg-slate-800 dark:text-white dark:hover:bg-blue-600 rounded-lg transition-colors flex items-center justify-center">
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      `;

      // Full-length snippet for detailed service page
      detailHtml += `
        <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-lg flex flex-col lg:flex-row gap-8 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}">
          <div class="w-full lg:w-1/2 bg-slate-100 dark:bg-slate-950 p-8 rounded-2xl flex flex-col justify-center items-center text-center space-y-4 relative min-h-[250px]">
            <div class="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-md">
              <i data-lucide="${service.icon}" class="w-7 h-7"></i>
            </div>
            <h3 class="text-lg font-bold text-slate-850 dark:text-white uppercase tracking-wider">${service.title}</h3>
            <p class="text-slate-400 text-xs font-mono">${service.priceEstimate}</p>
            <div class="h-1 w-20 bg-blue-605 rounded-full"></div>
          </div>
          <div class="w-full lg:w-1/2 space-y-6 text-sm">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">${service.title}</h3>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">${service.subtitle}</p>
            <p class="text-slate-500 dark:text-slate-400 leading-relaxed">${service.description}</p>
            <div>
              <h4 class="font-bold text-slate-800 dark:text-white uppercase text-xs tracking-wider mb-2">Technical Benefits Included:</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                ${allBenefits}
              </div>
            </div>
            <div class="pt-4 flex flex-col sm:flex-row gap-3">
              <button data-page-trigger="contact" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center space-x-1.5">
                <span>${service.ctaText}</span>
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
              </button>
              <button data-page-trigger="pricing" class="px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold rounded-xl text-xs transition-colors">
                Calculate Est. Budget
              </button>
            </div>
          </div>
        </div>
      `;
    });

    if (servicesContainerHome) servicesContainerHome.innerHTML = homeHtml;
    if (servicesContainerDetail) servicesContainerDetail.innerHTML = detailHtml;
  }

  // 2. Render Portfolio Cases Gallery with Segment Filtering
  const portfolioGridHome = document.getElementById('portfolio-grid-home');
  const portfolioGridDetail = document.getElementById('portfolio-grid-detail');
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  let currentFilter = 'all';

  function renderPortfolio() {
    let homeHtml = '';
    
    // Slice home cases to first 3 elements
    portfolioProjects.slice(0, 3).forEach(project => {
      homeHtml += createPortfolioCard(project);
    });
    if (portfolioGridHome) portfolioGridHome.innerHTML = homeHtml;

    // Render detailed custom gallery page
    const filtered = currentFilter === 'all' 
      ? portfolioProjects 
      : portfolioProjects.filter(p => p.category === currentFilter);
    
    let detailHtml = '';
    filtered.forEach(project => {
      detailHtml += createPortfolioCard(project);
    });
    
    if (portfolioGridDetail) {
      portfolioGridDetail.innerHTML = detailHtml || '<p class="text-center col-span-3 text-slate-400">No template project listed in this segment yet.</p>';
    }

    // Attach click listeners to cards to open the Modal details
    document.querySelectorAll('[data-project-id]').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-project-id');
        openPortfolioModal(id);
      });
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function createPortfolioCard(project) {
    return `
      <div data-project-id="${project.id}" class="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between">
        <div>
          <div class="h-48 overflow-hidden relative">
            <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            <div class="absolute top-3 left-3 px-2 py-0.5 bg-blue-600 text-white text-[9px] uppercase tracking-wider font-extrabold rounded-md shadow-md">
              ${project.category}
            </div>
          </div>
          <div class="p-5 space-y-3">
            <h3 class="font-bold text-slate-850 dark:text-white text-md truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              ${project.title}
            </h3>
            <p class="text-slate-500 dark:text-slate-400 text-xs line-clamp-2 leading-relaxed">
              ${project.description}
            </p>
          </div>
        </div>
        <div class="px-5 pb-5 pt-1">
          <div class="bg-slate-55 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-semibold text-blue-600 dark:text-blue-400 font-mono">
            <span>Verified Output KPI:</span>
            <span>${project.results}</span>
          </div>
        </div>
      </div>
    `;
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('bg-blue-600', 'text-white'));
      filterBtns.forEach(b => b.classList.add('bg-slate-100', 'dark:bg-slate-900', 'text-slate-600', 'dark:text-slate-400'));
      
      e.currentTarget.classList.add('bg-blue-600', 'text-white');
      e.currentTarget.classList.remove('bg-slate-100', 'dark:bg-slate-900', 'text-slate-600', 'dark:text-slate-400');
      
      currentFilter = e.currentTarget.getAttribute('data-filter');
      renderPortfolio();
    });
  });

  // 3. Portfolio Case Detail Modal Overlay Engine
  const modalCover = document.getElementById('portfolio-detail-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-description');
  const modalImg = document.getElementById('modal-image');
  const modalKpi = document.getElementById('modal-kpi');
  const modalFeatures = document.getElementById('modal-features');
  const modalCta = document.getElementById('modal-cta-whatsapp');

  function openPortfolioModal(id) {
    const project = portfolioProjects.find(p => p.id === id);
    if (!project) return;

    modalTitle.textContent = project.title;
    modalDesc.textContent = project.description;
    modalImg.src = project.image;
    modalKpi.textContent = project.results;

    // Map features list
    modalFeatures.innerHTML = project.features.map(f => `
      <li class="flex items-center space-x-2 text-xs">
        <i data-lucide="check" class="w-4 h-4 text-emerald-500"></i>
        <span>${f}</span>
      </li>
    `).join('');

    // Pre-build WhatsApp inquiry message
    const waText = encodeURIComponent(`Hello You Grow Online! I am viewing your portfolio project "${project.title}" and would like to build a similar website structure.`);
    modalCta.href = `https://wa.me/918971835181?text=${waText}`;

    modalCover.classList.remove('hidden', 'opacity-0');
    modalCover.classList.add('flex', 'opacity-100');
    document.body.style.overflow = 'hidden';

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function closePortfolioModal() {
    modalCover.classList.add('hidden', 'opacity-0');
    modalCover.classList.remove('flex', 'opacity-100');
    document.body.style.overflow = 'auto';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closePortfolioModal);
  }
  if (modalCover) {
    modalCover.addEventListener('click', (e) => {
      if (e.target === modalCover) closePortfolioModal();
    });
  }

  // 4. Render Testimonials/Reviews
  const reviewsContainer = document.getElementById('reviews-container');
  
  function getCustomReviews() {
    const saved = localStorage.getItem('ygo_custom_testimonials');
    return saved ? JSON.parse(saved) : [];
  }

  function renderTestimonials() {
    if (!reviewsContainer) return;
    
    const custom = getCustomReviews();
    const merged = [...custom, ...agencyTestimonials];
    
    let html = '';
    merged.forEach(review => {
      // Create rating stars HTML
      let stars = '';
      for (let i = 0; i < 5; i++) {
        const isFilled = i < review.rating;
        stars += `<i data-lucide="star" class="w-4 h-4 ${isFilled ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}"></i>`;
      }

      html += `
        <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-lg flex flex-col justify-between space-y-6">
          <div class="space-y-4">
            <div class="flex items-center space-x-1">${stars}</div>
            <p class="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed italic">"${review.text}"</p>
          </div>
          <div class="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
            <div class="flex items-center space-x-3">
              <img src="${review.image}" alt="${review.name}" class="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm">
              <div>
                <span class="block text-xs font-bold text-slate-800 dark:text-white leading-tight">${review.name}</span>
                <span class="text-[10px] text-slate-400 font-semibold block mt-0.5">${review.company}</span>
              </div>
            </div>
            ${review.resultMetric ? `<span class="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-[9px] font-mono rounded-lg border border-blue-100 dark:border-blue-900/20">${review.resultMetric}</span>` : ''}
          </div>
        </div>
      `;
    });

    reviewsContainer.innerHTML = html;
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // 5. Render standard pricing plan grids
  const pricingContainer = document.getElementById('pricing-grid-detail');
  
  function renderPricing() {
    if (!pricingContainer) return;
    let html = '';
    
    pricingPlans.forEach(plan => {
      const isRec = plan.recommended;
      const featuresList = plan.features.map(f => `
        <li class="flex items-start space-x-2.5 text-xs">
          <i data-lucide="check" class="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"></i>
          <span>${f}</span>
        </li>
      `).join('');

      html += `
        <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border flex flex-col justify-between shadow-md relative ${isRec ? 'border-blue-600 dark:border-blue-500 ring-2 ring-blue-600/15' : 'border-slate-200 dark:border-slate-800/80'}">
          ${isRec ? `
            <span class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-[10px] uppercase font-bold tracking-widest leading-none shadow-md">
              Recommended Plan
            </span>
          ` : ''}
          <div class="space-y-6">
            <div>
              <h4 class="text-lg font-bold text-slate-900 dark:text-white">${plan.name}</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed min-h-[40px]">${plan.description}</p>
            </div>
            <div class="py-4 border-t border-b border-slate-100 dark:border-slate-800 flex items-baseline justify-between">
              <div>
                <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block font-mono">Starts At</span>
                <span class="text-3xl sm:text-4xl font-mono font-bold text-slate-900 dark:text-white">$${plan.price.oneTime}</span>
              </div>
              <span class="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                Est. ${plan.deliveryTime}
              </span>
            </div>
            <ul class="space-y-3 text-xs text-slate-600 dark:text-slate-300 font-medium">
              ${featuresList}
            </ul>
          </div>
          <div class="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800">
            <button data-page-trigger="contact" class="w-full py-3 font-semibold rounded-xl text-xs transition-colors ${isRec ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'}">
              Book Free Evaluation Consult
            </button>
            <p class="text-[10px] text-center text-slate-400 mt-3 font-mono">Includes direct technical SEO integrations</p>
          </div>
        </div>
      `;
    });

    pricingContainer.innerHTML = html;
  }

  // 6. Render FAQs List with Search bar support
  const faqGridDetail = document.getElementById('faq-accordion-detail');
  const faqSearchInput = document.getElementById('faq-search-query');

  function renderFaqs(searchTerm = '') {
    if (!faqGridDetail) return;
    
    const term = searchTerm.toLowerCase().trim();
    const filtered = faqItems.filter(f => 
      f.question.toLowerCase().includes(term) || f.answer.toLowerCase().includes(term)
    );

    let html = '';
    
    if (filtered.length === 0) {
      html = '<p class="text-center text-slate-400 py-6">No matching SEO support guides found. Try searching another query.</p>';
    } else {
      filtered.forEach((faq, i) => {
        const isOpenInitially = i === 0 && !term; // Open first item by default if no active search
        html += `
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm overflow-hidden mb-4">
            <button type="button" class="faq-toggle-btn w-full text-left p-5 font-bold text-slate-800 dark:text-white text-sm sm:text-md flex justify-between items-center bg-transparent focus:outline-none" data-faq-id="${faq.id}">
              <span>${faq.question}</span>
              <span class="faq-arrow transform transition-transform text-slate-400 ${isOpenInitially ? 'rotate-180 text-blue-600' : ''}">
                <i data-lucide="chevron-down" class="w-5 h-5"></i>
              </span>
            </button>
            <div class="faq-content p-5 pt-0 border-t border-slate-50 dark:border-slate-800 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl ${isOpenInitially ? '' : 'hidden'}">
              ${faq.answer}
            </div>
          </div>
        `;
      });
    }

    faqGridDetail.innerHTML = html;
    
    // Bind click handlers inside the generated elements
    document.querySelectorAll('.faq-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const contentDiv = btn.nextElementSibling;
        const arrowSpan = btn.querySelector('.faq-arrow');
        
        const isHidden = contentDiv.classList.contains('hidden');
        if (isHidden) {
          contentDiv.classList.remove('hidden');
          arrowSpan.classList.add('rotate-180', 'text-blue-600');
        } else {
          contentDiv.classList.add('hidden');
          arrowSpan.classList.remove('rotate-180', 'text-blue-600');
        }
      });
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', (e) => {
      renderFaqs(e.target.value);
    });
  }

  // --- Run Grid Initializers ---
  renderServices();
  renderPortfolio();
  renderTestimonials();
  renderPricing();
  renderFaqs();

  // Highlight bindings update helper to re-bind triggers whenever content swaps
  // Because 'data-page-trigger' elements populate dynamically, check clicks globally
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-page-trigger]');
    if (trigger) {
      const pageId = trigger.getAttribute('data-page-trigger');
      navigateTo(pageId);
    }
  });


  // --- Cost Estimator Interactive Calculator Logic ---
  const calcPlatformBtns = document.querySelectorAll('.calc-platform-btn');
  const calcScreenSlider = document.getElementById('calc-screens-slider');
  const calcScreenLabel = document.getElementById('calc-screens-label');
  const calcAddonBtns = document.querySelectorAll('.calc-addon-btn');
  const calcCurrencyInrBtn = document.getElementById('calc-curr-inr');
  const calcCurrencyUsdBtn = document.getElementById('calc-curr-usd');
  const calcFinalPriceDisplay = document.getElementById('calc-final-price');
  
  // Estimate UI state values
  let calcPlatform = 'custom'; // custom | wordpress | landing
  let calcScreens = 3;
  let calcAddonsState = {
    seo: true,
    speed: true,
    ecommerce: false,
    mapping: false,
    whatsapp: true
  };
  let calcCurrency = 'INR'; // INR | USD

  const calculatorRates = {
    basePrice: {
      wordpress: { INR: 9999, USD: 199 },
      custom: { INR: 15999, USD: 299 },
      landing: { INR: 7999, USD: 149 },
    },
    screenRate: {
      wordpress: { INR: 1500, USD: 30 },
      custom: { INR: 2500, USD: 50 },
      landing: { INR: 0, USD: 0 },
    },
    addOns: {
      seo: { INR: 2500, USD: 50 },
      speed: { INR: 2000, USD: 40 },
      ecommerce: { INR: 8000, USD: 150 },
      mapping: { INR: 1000, USD: 20 },
      whatsapp: { INR: 800, USD: 15 },
    }
  };

  function updateCalculator() {
    // 1. Base Budget
    let price = calculatorRates.basePrice[calcPlatform][calcCurrency];

    // 2. Screencount Multipliers
    if (calcPlatform !== 'landing' && calcScreens > 1) {
      price += (calcScreens - 1) * calculatorRates.screenRate[calcPlatform][calcCurrency];
    }

    // 3. Extensions Aggregate
    Object.keys(calcAddonsState).forEach(key => {
      if (calcAddonsState[key]) {
        price += calculatorRates.addOns[key][calcCurrency];
      }
    });

    // 4. Format Output Screen
    const formatted = price.toLocaleString();
    calcFinalPriceDisplay.textContent = (calcCurrency === 'INR' ? '₹' : '$') + formatted;

    // Update dynamic summary list labels
    document.getElementById('calc-summary-platform').textContent = 
      calcPlatform === 'wordpress' ? 'WordPress Development' : calcPlatform === 'custom' ? 'Custom Website' : 'Landing Page';
    
    document.getElementById('calc-summary-scope').textContent = 
      calcPlatform === 'landing' ? '1 High-Converting screen' : `${calcScreens} Detailed Screens`;
    
    document.getElementById('calc-summary-delivery').textContent = 
      calcPlatform === 'landing' ? '3-4 Days' : calcScreens <= 5 ? '5-7 Days' : '10-14 Days';
  }

  // Bind Platform selections
  calcPlatformBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      calcPlatformBtns.forEach(b => b.classList.remove('bg-blue-600', 'text-white', 'shadow-md'));
      calcPlatformBtns.forEach(b => b.classList.add('bg-slate-50', 'dark:bg-slate-800', 'border-slate-200', 'dark:border-slate-700', 'text-slate-700'));
      
      e.currentTarget.classList.add('bg-blue-600', 'text-white', 'shadow-md');
      e.currentTarget.classList.remove('bg-slate-50', 'dark:bg-slate-800', 'border-slate-200', 'dark:border-slate-700', 'text-slate-700');

      calcPlatform = e.currentTarget.getAttribute('data-platform');
      
      // If landing page, screen counts is locked to 1
      const sliderContainer = document.getElementById('calc-slider-container');
      if (calcPlatform === 'landing') {
        calcScreens = 1;
        if (sliderContainer) sliderContainer.classList.add('hidden');
      } else {
        if (sliderContainer) sliderContainer.classList.remove('hidden');
        calcScreens = parseInt(calcScreenSlider.value);
      }

      updateCalculator();
    });
  });

  // Bind range input updates
  if (calcScreenSlider) {
    calcScreenSlider.addEventListener('input', (e) => {
      calcScreens = parseInt(e.target.value);
      calcScreenLabel.textContent = calcScreens + ' Pages';
      updateCalculator();
    });
  }

  // Bind Extension toggle checkboxes
  calcAddonBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const addonId = e.currentTarget.getAttribute('data-addon');
      calcAddonsState[addonId] = !calcAddonsState[addonId];

      const indicator = e.currentTarget.querySelector('.addon-indicator');
      if (calcAddonsState[addonId]) {
        e.currentTarget.classList.add('bg-blue-50/70', 'dark:bg-blue-900/10', 'border-blue-400', 'text-slate-800', 'dark:text-white');
        indicator.classList.add('bg-blue-600', 'border-blue-600', 'text-white');
        indicator.innerHTML = '<i data-lucide="check" class="w-3 h-3 stroke-[3]"></i>';
      } else {
        e.currentTarget.classList.remove('bg-blue-50/70', 'dark:bg-blue-900/10', 'border-blue-400', 'text-slate-800', 'dark:text-white');
        indicator.classList.remove('bg-blue-600', 'border-blue-600', 'text-white');
        indicator.innerHTML = '';
      }

      if (window.lucide) {
        window.lucide.createIcons();
      }
      updateCalculator();
    });
  });

  // Bind currency switches
  calcCurrencyInrBtn.addEventListener('click', () => {
    calcCurrencyInrBtn.classList.add('bg-white', 'dark:bg-slate-700', 'text-blue-600', 'dark:text-white', 'shadow-sm');
    calcCurrencyInrBtn.classList.remove('text-slate-505');
    calcCurrencyUsdBtn.classList.remove('bg-white', 'dark:bg-slate-700', 'text-blue-600', 'dark:text-white', 'shadow-sm');
    calcCurrencyUsdBtn.classList.add('text-slate-505');
    calcCurrency = 'INR';
    
    // Update addon rates badges
    document.querySelectorAll('[data-addon-rate]').forEach(badge => {
      const id = badge.getAttribute('data-addon-rate');
      badge.textContent = '+' + (calcCurrency === 'INR' ? '₹' + calculatorRates.addOns[id].INR : '$' + calculatorRates.addOns[id].USD);
    });

    updateCalculator();
  });

  calcCurrencyUsdBtn.addEventListener('click', () => {
    calcCurrencyUsdBtn.classList.add('bg-white', 'dark:bg-slate-700', 'text-blue-600', 'dark:text-white', 'shadow-sm');
    calcCurrencyUsdBtn.classList.remove('text-slate-505');
    calcCurrencyInrBtn.classList.remove('bg-white', 'dark:bg-slate-700', 'text-blue-600', 'dark:text-white', 'shadow-sm');
    calcCurrencyInrBtn.classList.add('text-slate-505');
    calcCurrency = 'USD';

    // Update addon rates badges
    document.querySelectorAll('[data-addon-rate]').forEach(badge => {
      const id = badge.getAttribute('data-addon-rate');
      badge.textContent = '+' + (calcCurrency === 'INR' ? '₹' + calculatorRates.addOns[id].INR : '$' + calculatorRates.addOns[id].USD);
    });

    updateCalculator();
  });

  // Trigger Estimate WhatsApp export dispatch
  document.getElementById('calc-whatsapp-export-btn').addEventListener('click', () => {
    const platformLabel = calcPlatform === 'wordpress' ? 'WordPress Development' : calcPlatform === 'custom' ? 'Custom Website' : 'Conversion Landing Page';
    const activeAddonsName = Object.entries(calcAddonsState)
      .filter(([_, value]) => value)
      .map(([name]) => name.toUpperCase())
      .join(', ');
    
    const textMsg = `Hello You Grow Online! I calculated a website quote on your estimator:\n\n` +
      `- Platform Niche: ${platformLabel}\n` +
      `- Screencount: ${calcPlatform === 'landing' ? '1 Page' : `${calcScreens} Pages`}\n` +
      `- Included Extras: ${activeAddonsName || 'None'}\n` +
      `- Estimated Quote: ${calcFinalPriceDisplay.textContent}\n\n` +
      `I would like to discuss booking a free consultation of the project outline!`;

    window.open(`https://wa.me/918971835181?text=${encodeURIComponent(textMsg)}`, '_blank');
  });

  updateCalculator();


  // --- Lead Submission Forms & Persistence Logging ---
  const leadSubmitForm = document.getElementById('contact-quote-form');
  const leadAlertBox = document.getElementById('lead-alert-box');
  const leadAlertMsg = document.getElementById('lead-alert-message');
  const leadSuccessShowcase = document.getElementById('lead-success-screen');
  const localTrackerContainer = document.getElementById('lead-local-logs-panel');
  const localLeadsBody = document.getElementById('leads-history-body');

  function saveSubmittedLeadLocally(lead) {
    const saved = localStorage.getItem('ygo_submitted_leads');
    const existing = saved ? JSON.parse(saved) : [];
    const updated = [lead, ...existing];
    localStorage.setItem('ygo_submitted_leads', JSON.stringify(updated));
    renderSubmittedLeadsLogs();
  }

  function renderSubmittedLeadsLogs() {
    if (!localLeadsBody) return;
    const saved = localStorage.getItem('ygo_submitted_leads');
    const leads = saved ? JSON.parse(saved) : [];

    if (leads.length === 0) {
      localTrackerContainer.classList.add('hidden');
      return;
    }

    localTrackerContainer.classList.remove('hidden');
    let rowsHtml = '';
    leads.forEach(lead => {
      rowsHtml += `
        <tr class="border-b border-slate-100 dark:border-slate-800/80 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
          <td class="p-3 text-slate-900 dark:text-white font-bold font-mono">${lead.id}</td>
          <td class="p-3">
            <span class="block text-slate-800 dark:text-slate-200 font-semibold">${lead.name}</span>
            <span class="text-[10px] text-slate-400 block">${lead.email}</span>
          </td>
          <td class="p-3 font-medium text-slate-600 dark:text-slate-400">${lead.niche}</td>
          <td class="p-3">
            <span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-50 dark:bg-blue-900/35 text-blue-600 dark:text-blue-400 tracking-wider">RECEIVED</span>
          </td>
          <td class="p-3 text-[10px] text-slate-400 font-mono">${lead.timestamp}</td>
        </tr>
      `;
    });

    localLeadsBody.innerHTML = rowsHtml;
  }

  // Handle request form submission
  if (leadSubmitForm) {
    leadSubmitForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Grab values
      const nameVal = document.getElementById('lead-name-input').value.trim();
      const emailVal = document.getElementById('lead-email-input').value.trim();
      const phoneVal = document.getElementById('lead-phone-input').value.trim();
      const subjectVal = document.getElementById('lead-subject-input').value.trim();
      const nicheVal = document.getElementById('lead-niche-select').value;
      const messageVal = document.getElementById('lead-message-textarea').value.trim();

      // Clear alert box
      leadAlertBox.classList.add('hidden');
      leadAlertMsg.textContent = '';

      // Validate inputs
      if (!nameVal) {
        showLeadError('Please write your full name or company.');
        return;
      }
      if (!emailVal || !emailVal.includes('@')) {
        showLeadError('Please write a valid business email address.');
        return;
      }
      if (!phoneVal || phoneVal.length < 8) {
        showLeadError('Please write a valid phone number with country digits.');
        return;
      }
      if (!messageVal || messageVal.length < 10) {
        showLeadError('Please describe your project scope briefly (at least 10 characters).');
        return;
      }

      // Toggle sending state on button
      const submitBtn = leadSubmitForm.querySelector('button[type="submit"]');
      const originalBtnTxt = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i data-lucide="loader" class="w-4 h-4 animate-spin mr-1.5 inline"></i> Sending Request...';
      if (window.lucide) window.lucide.createIcons();

      const leadId = 'L-' + Math.floor(1000 + Math.random() * 9000);

      try {
        // Dispatch to real Webhook endpoint (FormSubmit.co ajax proxy)
        const response = await fetch('https://formsubmit.co/ajax/contact.yougrowonline@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `[Lead Submission] ${nameVal} - ${subjectVal || nicheVal}`,
            leadId: leadId,
            fullName: nameVal,
            businessEmail: emailVal,
            phoneNumber: phoneVal,
            requestedCategory: nicheVal,
            customSubject: subjectVal || 'N/A',
            projectGoalsAndScope: messageVal,
            submissionTime: new Date().toLocaleString()
          })
        });

        const result = await response.json();

        if (result.success === 'true' || response.ok) {
          // Success
          const newLead = {
            id: leadId,
            name: nameVal,
            email: emailVal,
            phone: phoneVal,
            niche: nicheVal,
            timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          };

          saveSubmittedLeadLocally(newLead);
          
          // Display success panel
          leadSubmitForm.classList.add('hidden');
          leadSuccessShowcase.classList.remove('hidden');
          
          // Clear inputs
          leadSubmitForm.reset();
        } else {
          showLeadError('Could not process email request. Please try again later or contact us directly.');
        }
      } catch (err) {
        showLeadError('Network connection error. Please try again or reach out on WhatsApp.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnTxt;
        if (window.lucide) window.lucide.createIcons();
      }
    });

    // Success reset binding
    document.getElementById('reset-quote-form-btn').addEventListener('click', () => {
      leadSuccessShowcase.classList.add('hidden');
      leadSubmitForm.classList.remove('hidden');
    });
  }

  function showLeadError(msg) {
    leadAlertMsg.textContent = msg;
    leadAlertBox.classList.remove('hidden');
    leadAlertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  renderSubmittedLeadsLogs();


  // --- Verified Testimonials Dynamic Form ---
  const reviewSubmitForm = document.getElementById('add-review-form');
  const reviewSuccessPanel = document.getElementById('review-form-success');
  const reviewResetBtn = document.getElementById('reset-review-form');
  
  let tempStarsRating = 5;

  // Star selectors clicking logic inside form
  document.querySelectorAll('.review-star-select').forEach(star => {
    star.addEventListener('click', (e) => {
      tempStarsRating = parseInt(e.currentTarget.getAttribute('data-value'));
      
      // Update UI stars color highlight
      document.querySelectorAll('.review-star-select').forEach(s => {
        const val = parseInt(s.getAttribute('data-value'));
        if (val <= tempStarsRating) {
          s.classList.add('text-amber-400', 'fill-amber-400');
          s.classList.remove('text-slate-350');
        } else {
          s.classList.remove('text-amber-400', 'fill-amber-400');
          s.classList.add('text-slate-350');
        }
      });
    });
  });

  if (reviewSubmitForm) {
    reviewSubmitForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const revName = document.getElementById('rev-name-input').value.trim();
      const revCompany = document.getElementById('rev-company-input').value.trim();
      const revMetric = document.getElementById('rev-metric-input').value.trim();
      const revText = document.getElementById('rev-text-textarea').value.trim();

      if (!revName || !revCompany || !revText) {
        alert('Please fill out all required testimonial fields.');
        return;
      }

      const reviewId = 'rev-' + Date.now();
      const publishBtn = reviewSubmitForm.querySelector('button[type="submit"]');
      publishBtn.disabled = true;
      publishBtn.textContent = 'Publishing Testimonial...';

      try {
        // Dispatch to real Webhook endpoint (FormSubmit.co ajax proxy)
        await fetch('https://formsubmit.co/ajax/contact.yougrowonline@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `[New Testimonial Review] ${revName} (${revCompany})`,
            reviewId: reviewId,
            clientName: revName,
            companyAndTitle: revCompany,
            ratingStars: `${tempStarsRating} / 5`,
            outcomeMetric: revMetric || 'N/A',
            reviewText: revText,
            submissionTime: new Date().toLocaleString()
          })
        });
      } catch (err) {
        console.warn('Silent email webhook failure, proceeding to write local client backup');
      }

      // Formulate review record
      const randomAvatar = `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 900000)}?auto=format&fit=facearea&facepad=2&w=120&h=120&q=80`;
      
      const newReview = {
        id: reviewId,
        name: revName,
        company: revCompany,
        rating: tempStarsRating,
        text: revText,
        image: randomAvatar,
        resultMetric: revMetric || ''
      };

      // Add to custom local storage reviews array
      const currentCustoms = getCustomReviews();
      localStorage.setItem('ygo_custom_testimonials', JSON.stringify([newReview, ...currentCustoms]));

      // Clear input fields
      reviewSubmitForm.reset();
      tempStarsRating = 5;

      // Reset selection UI stars state
      document.querySelectorAll('.review-star-select').forEach(s => {
        s.classList.add('text-amber-400', 'fill-amber-400');
      });

      // Show success screen
      reviewSubmitForm.classList.add('hidden');
      reviewSuccessPanel.classList.remove('hidden');

      // Re-trigger testimonial rendering to update on-screen list instantly!
      renderTestimonials();

      publishBtn.disabled = false;
      publishBtn.textContent = 'Publish Verified Testimonial';
    });
  }

  if (reviewResetBtn) {
    reviewResetBtn.addEventListener('click', () => {
      reviewSuccessPanel.classList.add('hidden');
      reviewSubmitForm.classList.remove('hidden');
    });
  }


  // --- Newsletter Signup Handling ---
  const footerNewsletterForm = document.getElementById('footer-newsletter-form');
  const newsletterAlertOk = document.getElementById('newsletter-alert-ok');
  const newsletterAlertErr = document.getElementById('newsletter-alert-error');

  if (footerNewsletterForm) {
    footerNewsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const emailInput = document.getElementById('newsletter-email-input');
      const emailVal = emailInput.value.trim();

      newsletterAlertOk.classList.add('hidden');
      newsletterAlertErr.classList.add('hidden');

      if (!emailVal || !emailVal.includes('@')) {
        newsletterAlertErr.classList.remove('hidden');
        return;
      }

      // Disable buttons
      const joinBtn = footerNewsletterForm.querySelector('button[type="submit"]');
      joinBtn.disabled = true;
      joinBtn.textContent = '...';

      try {
        const response = await fetch('https://formsubmit.co/ajax/contact.yougrowonline@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `[Newsletter subscription] ${emailVal}`,
            emailAddress: emailVal,
            actionType: 'Newsletter Signup Flow',
            submittedTime: new Date().toLocaleString()
          })
        });

        if (response.ok) {
          newsletterAlertOk.classList.remove('hidden');
          emailInput.value = '';
        } else {
          newsletterAlertErr.classList.remove('hidden');
        }
      } catch (err) {
        newsletterAlertErr.classList.remove('hidden');
      } finally {
        joinBtn.disabled = false;
        joinBtn.textContent = 'Join';
      }

      setTimeout(() => {
        newsletterAlertOk.classList.add('hidden');
        newsletterAlertErr.classList.add('hidden');
      }, 4000);
    });
  }


  // --- Policy legal Modals Engine ---
  const policyModal = document.getElementById('policy-legal-modal');
  const policyCloseBtn = document.getElementById('policy-close-btn');
  const policyTitle = document.getElementById('policy-title');
  const policyContent = document.getElementById('policy-content');

  function openPolicyModal(type) {
    policyTitle.textContent = type === 'privacy' ? 'Privacy Policy & Data Principles' : 'Terms of Business Service';

    // Build dense, realistic custom terms
    if (type === 'privacy') {
      policyContent.innerHTML = `
        <div class="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
          <p class="font-bold">Effective Date: May 30, 2026</p>
          <p>
            At You Grow Online, we protect all submitted company lead outlines, email lists, and dynamic calculator logs securely. We strictly process form-provided data solely for evaluation of direct project pricing scopes. No analytical dataset is traded with third-party networks.
          </p>
          <h4 class="font-bold text-slate-800 dark:text-white mt-4">1. Data Collected Automatically</h4>
          <p>
            Our static estimator forms collect custom configurations, business contact numbers, and requested niches in order to deliver authentic cost breakdowns.
          </p>
          <h4 class="font-bold text-slate-800 dark:text-white mt-4">2. Direct Communication Triggers</h4>
          <p>
            Clicking our WhatsApp contact badges opens end-to-end encrypted chats with our staff directly. These interactions are managed using the user's secure account preferences.
          </p>
        </div>
      `;
    } else {
      policyContent.innerHTML = `
        <div class="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
          <p class="font-bold">Effective Date: May 30, 2026</p>
          <p>
            By consulting the You Grow Online dynamic calculator planner or submitting business inquiries, you accept our standard digital agency Terms of Service.
          </p>
          <h4 class="font-bold text-slate-800 dark:text-white mt-4">1. One-time Projects Milestones</h4>
          <p>
            All website design, CMS setups (WordPress development), and landing page scopes are executed on pre-determined contract models. Est. timelines (3-5 days starter, 7-10 days business) depend strictly on text and graphic asset handovers.
          </p>
          <h4 class="font-bold text-slate-800 dark:text-white mt-4">2. Liability Limitation</h4>
          <p>
            We optimize local SEO schemas, site load velocity, and mobile alignments. Final search indexing rankings rest strictly on organic algorithmic metrics in targets.
          </p>
        </div>
      `;
    }

    policyModal.classList.remove('hidden', 'opacity-0');
    policyModal.classList.add('flex', 'opacity-100');
    document.body.style.overflow = 'hidden';
  }

  function closePolicyModal() {
    policyModal.classList.add('hidden', 'opacity-0');
    policyModal.classList.remove('flex', 'opacity-100');
    document.body.style.overflow = 'auto';
  }

  policyCloseBtn.addEventListener('click', closePolicyModal);
  policyModal.addEventListener('click', (e) => {
    if (e.target === policyModal) closePolicyModal();
  });

  // Bind footer legal buttons
  document.querySelectorAll('[data-policy-trigger]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const type = e.currentTarget.getAttribute('data-policy-trigger');
      openPolicyModal(type);
    });
  });

});
