// YOU GROW ONLINE - Static Web Directory Data Config
// All records are aligned with the main digital agency's 2026 performance targets.

const agencyServices = [
  {
    id: 'web-dev',
    title: 'Custom Website Development',
    subtitle: 'High-performance, secure, and bespoke web solutions tailored for your business.',
    icon: 'globe',
    description: 'We build fast, secure, responsive, and SEO-optimized websites from scratch. From robust React single-page applications to rich corporate platforms, our custom code ensures complete flexibility and scales cleanly as your business grows.',
    benefits: [
      'Built with clean, modern technologies (React, Next.js, Node.JS)',
      'Ultra-fast load times (95+ Google PageSpeed Score)',
      'Desktop-first precise layouts, scaled seamlessly for mobile support',
      'Advanced technical SEO markup and structured data fully integrated',
      'Fully customizable layouts with no bloated third-party code'
    ],
    ctaText: 'Start Building Custom Website',
    priceEstimate: 'Starts at ₹24,999 / $499'
  },
  {
    id: 'wordpress-dev',
    title: 'WordPress Website Development',
    subtitle: 'Premium WordPress themes, fast custom builders, and powerful CMS setup.',
    icon: 'layers',
    description: 'Empower your marketing team with a beautiful, responsive, and completely manageable WordPress website. We develop using clean, light-weight page builders (Elementor, Gutenberg blocks), ensuring speedy loading and direct content management without coding.',
    benefits: [
      'Tailored custom WordPress themes (strictly zero-bloat)',
      'Highly secure login and advanced security reinforcement',
      'Fully editable custom posts, headers, footers and layouts',
      'E-commerce ready setups (WooCommerce optimization integrated)',
      'Includes premium SEO setup and Google Search Console pairing'
    ],
    ctaText: 'Launch Your WordPress Site',
    priceEstimate: 'Starts at ₹14,999 / $299'
  },
  {
    id: 'landing-page',
    title: 'Landing Page Design',
    subtitle: 'High-converting & highly persuasive landing pages built for max ROI.',
    icon: 'target',
    description: 'Transform advertising traffic into paying customers. Our elite landing pages are designed on strict conversion principles, featuring compelling structural hierarchies, copy points, speed-optimized performance, and robust mobile layouts.',
    benefits: [
      'A/B test ready structures with singular clear action points',
      'Persuasive, highly optimized visual layout with smooth scroll triggers',
      'Direct CRM integration, lead capture forms and email sync',
      'Extremely quick loading (<1.2s first contentful paint)',
      'Aesthetic UX, interactive benefits tables and click-to-WhatsApp'
    ],
    ctaText: 'Design a High-Converting Page',
    priceEstimate: 'Starts at ₹9,999 / $199'
  }
];

const portfolioProjects = [
  {
    id: 'project-1',
    title: 'Elite Capital - Corporate Advisory Website',
    category: 'business',
    description: 'A responsive business website developed for an international corporate financial firm in India and USA.',
    image: 'images/portfolio-elite.svg',
    features: ['Custom structural sections', 'Fully responsive layouts', 'SEO schema mapping', 'Advanced Lead validation system'],
    results: '+142% Increase in demo consultation requests',
    demoUrl: 'https://yougrowonline.com/portfolio/elite-capital'
  },
  {
    id: 'project-2',
    title: 'ProSaaS - Dark Mode Marketing Platform',
    category: 'landing',
    description: 'An aesthetic high-converting landing page created for a modern automated startup tool.',
    image: 'images/portfolio-prosaas.svg',
    features: ['Instant speed optimization', 'Interactive interactive pricing toggle', 'Interactive features grid', 'WhatsApp lead webhook'],
    results: '28.4% Conversion rate on cold PPC campaigns',
    demoUrl: 'https://yougrowonline.com/portfolio/prosaas'
  },
  {
    id: 'project-3',
    title: 'Vastra Organics - WooCommerce Brand Store',
    category: 'ecommerce',
    description: 'A WordPress WooCommerce website developed for an premium organic garment brand.',
    image: 'images/portfolio-vastra.svg',
    features: ['Fully fast WooCommerce setup', 'Optimized checkout experience', 'Filtered inventory systems', 'WordPress security hardening'],
    results: '+88% Boost in year-over-year e-commerce sales',
    demoUrl: 'https://yougrowonline.com/portfolio/vastra'
  },
  {
    id: 'project-4',
    title: 'Dr. Mehta Clinic - Healthcare Services Platform',
    category: 'business',
    description: 'A local SEO optimized clinic website offering seamless booking for healthcare clinics in Mumbai & Bangalore.',
    image: 'images/portfolio-mehta.svg',
    features: ['Local business schema dynamic tagging', 'Doctor schedules switcher', 'Interactive clinic MAP visualizer', 'Secure contact forms'],
    results: 'Ranked #1 for localized primary healthcare terms in region',
    demoUrl: 'https://yougrowonline.com/portfolio/mehta'
  },
  {
    id: 'project-5',
    title: 'SkyBound Logistics - Global Freight Agency',
    category: 'agency',
    description: 'A sophisticated modern multi-page presence for a logistics and global shipping brand with real-time tracking tracker mockup.',
    image: 'images/portfolio-skybound.svg',
    features: ['Interactive price estimator', 'Multi-location map visualizer', 'Modern motion transitions', 'Advanced client portal setup'],
    results: 'Reduced operational support inquiries by 40%',
    demoUrl: 'https://yougrowonline.com/portfolio/skybound'
  },
  {
    id: 'project-6',
    title: 'Fintech Spark - One Page SaaS Launch Page',
    category: 'landing',
    description: 'A modern landing page designed to gather high-intent email RSVPs for a new corporate card launch.',
    image: 'images/portfolio-fintech-spark.svg',
    features: ['Persuasive structural copy hooks', 'Highly visual benefit breakdowns', 'One-click feedback popup', 'Direct HubSpot pipeline integration'],
    results: '8,400+ Qualified email list signups collected in 2 weeks',
    demoUrl: 'https://yougrowonline.com/portfolio/fintech-spark'
  }
];

const agencyTestimonials = [
  {
    id: 'test-1',
    name: 'Anish Sharma',
    company: 'Fintech India Services',
    rating: 5,
    text: 'You Grow Online completely overhauled our business website. The page speed went from 18 seconds to under 1.5 seconds. Our local and organic leads in India shot up by nearly 200%. True experts who prioritize responsiveness.',
    image: 'images/avatar-1.svg',
    resultMetric: '+194% Lead Growth'
  },
  {
    id: 'test-2',
    name: 'Sarah Jenkins',
    company: 'GlowBloom Skincare USA',
    rating: 5,
    text: 'The WooCommerce store they built is fast, clean, and extremely professional. The layout on mobile is flawless. Our conversions on Facebook and Instagram ads increased overnight simply due to the speed and custom checkout flow.',
    image: 'images/avatar-2.svg',
    resultMetric: '+32% Conversion Rate'
  },
  {
    id: 'test-3',
    name: 'Vikram Grover',
    company: 'AeroCranes Logistics',
    rating: 5,
    text: 'Highly professional, accessible, and fast developers. They created a custom landing page for our machinery sales campaign that has consistently outperformed generic software pages. Absolute value with incredible corporate visuals.',
    image: 'images/avatar-3.svg',
    resultMetric: 'ROI increased 3.6x'
  },
  {
    id: 'test-4',
    name: 'Pooja Iyer',
    company: 'Dwell Interiors India',
    rating: 5,
    text: 'Our team is highly pleased with our WordPress website development. We can easily upload new portfolios ourselves. It renders stunningly across tablets and mobile and ranks incredibly well on local maps.',
    image: 'images/avatar-4.svg',
    resultMetric: '#1 Position Local SEO'
  }
];

const pricingPlans = [
  {
    name: 'Starter Plan',
    price: {
      monthly: 19,
      oneTime: 299
    },
    description: 'Perfect for local businesses, early-stage startups and professional portfolios looking for a highly refined web presence.',
    features: [
      '1 Custom High-Converting Landing Page',
      '100% Fully Responsive Layout',
      'Ultra-Fast Performance Setup (<1.5s)',
      'Basic On-Page SEO Mapping',
      'One Click Click-to-WhatsApp Buttons',
      'Contact Form with Instant CRM Push & Webhooks',
      '1 Month of Free Technical Support & Hosting Guide'
    ],
    recommended: false,
    deliveryTime: '3-5 Working Days'
  },
  {
    name: 'Business Plan',
    price: {
      monthly: 39,
      oneTime: 599
    },
    description: 'The standard plan for growing brands, agencies, and SMEs wanting full corporate visibility and SEO authority.',
    features: [
      'Up to 5 Fully Custom Multi-page Website Views',
      'Custom WordPress Website Development setup',
      'Advanced On-Page technical SEO mapping',
      'Competitor Keyword SEO Tracking Configuration',
      'Social Media & Pixel integration tracking links',
      'Direct WhatsApp, Chat & Phone tap integration',
      '3 Months of Premium Technical Maintenance'
    ],
    recommended: true,
    deliveryTime: '7-10 Working Days'
  },
  {
    name: 'Premium Plan',
    price: {
      monthly: 79,
      oneTime: 1199
    },
    description: 'Bespoke web architecture for high-growth e-commerce brands, custom SaaS applications, or high-volume service providers.',
    features: [
      'Unlimited Pages / Custom React SPA architecture',
      'Complete WooCommerce integration with secure checkout',
      'Unlimited integrated products & catalog setups',
      'Advanced Lead Routing & customized admin dashboards',
      'Robust security hardening & firewall configuration',
      'Preloaded Schema Microdata & CDN deployment',
      '6 Months of Direct Slack & Phone Support'
    ],
    recommended: false,
    deliveryTime: '14-21 Working Days'
  }
];

const faqItems = [
  {
    id: 'faq-1',
    question: 'How long does it take to develop a business website or landing page?',
    answer: 'Our landing pages are ready in 3 to 5 business days. A custom business website or standard WordPress website development usually takes 7 to 10 working days, depending on content availability and complexity of custom logic.',
    category: 'development'
  },
  {
    id: 'faq-2',
    question: 'Can I edit the content of my WordPress website myself later?',
    answer: 'Absolutely! For all our WordPress website development and CMS solutions, we design highly visual page setups using trusted, lightweight builders. You will be able to edit text, images, blog articles, and add new services in just a few clicks with no programming knowledge path.',
    category: 'wordpress'
  },
  {
    id: 'faq-3',
    question: 'Are all websites designed by You Grow Online mobile-friendly and responsive?',
    answer: 'Yes. Responsive Website Design is at the core of our engineering process. Every single page passes rigorous testing across desktop monitors, laptops, iPads, tablets, and iPhones. We implement highly-fluid responsive designs using Tailwind CSS utility standards.',
    category: 'development'
  },
  {
    id: 'faq-4',
    question: 'Is SEO optimization included automatically in your agency packages?',
    answer: 'Yes, we optimize every website for SEO. We lay down high-intent header keywords (Website Development Company, SEO Optimized Website, WordPress Website Development, Landing Page Design, etc.), construct XML sitemaps, inject rich schema microdata, enforce perfect site hierarchy (H1-H6), and optimize image alt properties for Local SEO.',
    category: 'seo'
  },
  {
    id: 'faq-5',
    question: 'Do you charge a recurring monthly fee or is it a one-time project cost?',
    answer: 'We operate primarily on a straightforward local and international One-Time Contract basis with clear milestones. We also provide incredibly reasonable annual maintenance and quick hosting setup packages or light monthly support if your team needs recurring content revisions.',
    category: 'pricing'
  },
  {
    id: 'faq-6',
    question: 'Can you migrate my existing website to a faster WordPress platform without losing data?',
    answer: 'Yes. We specialize in speed overhaul migrations. We can safely move all your historical blog posts, pages, and images from slow, obsolete hosting systems directly to high-performance WordPress CMS hosts, optimizing speed metrics by up to 300%.',
    category: 'wordpress'
  }
];
