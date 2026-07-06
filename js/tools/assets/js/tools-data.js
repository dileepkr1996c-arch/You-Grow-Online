/* ==========================================
   You Grow Online — Tools Data & Renderer
   To add a new tool:
     1. Create /tools/your-tool-name/index.html
     2. Add an entry to the allTools array below
     3. The hub page will pick it up automatically
   ========================================== */

const allTools = [
  {
    id: 'meta-tag-generator',
    title: 'Meta Tag Generator',
    desc: 'Generate SEO-optimized HTML meta tags for your web pages instantly. Create title tags, meta descriptions, and keyword tags with proper formatting for better search engine rankings.',
    icon: 'fa-solid fa-code',
    url: '/tools/meta-tag-generator/'
  },
  {
    id: 'utm-url-builder',
    title: 'UTM Link Creator',
    desc: 'Build trackable UTM URLs for your marketing campaigns in seconds. Add source, medium, and campaign parameters to measure traffic from email, social media, and ads in Google Analytics.',
    icon: 'fa-solid fa-link',
    url: '/tools/utm-url-builder/'
  },
  {
    id: 'character-counter',
    title: 'Character & Word Counter',
    desc: 'Count characters, words, and sentences in real-time. Stay within Google\'s title tag (60 characters) and meta description (160 characters) limits for optimal search result display.',
    icon: 'fa-solid fa-text-width',
    url: '/tools/character-counter/'
  },
  {
    id: 'url-slug-generator',
    title: 'URL Slug Generator',
    desc: 'Convert any text into clean, SEO-friendly URL slugs instantly. Transform blog titles, product names, and page headings into lowercase hyphenated URLs that search engines love.',
    icon: 'fa-solid fa-tag',
    url: '/tools/url-slug-generator/'
  },
  {
    id: 'image-compressor',
    title: 'Image Compressor',
    desc: 'Compress JPEG, PNG, and WebP images directly in your browser. Reduce file size by up to 80% while maintaining visual quality. No uploads to any server — your images stay private.',
    icon: 'fa-solid fa-compress',
    url: '/tools/image-compressor/'
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    desc: 'Generate strong, secure passwords instantly. Customize length, include uppercase, lowercase, numbers, and symbols. Copy with one click — perfect for account security.',
    icon: 'fa-solid fa-key',
    url: '/tools/password-generator/'
  },
  {
    id: 'case-converter',
    title: 'Case Converter',
    desc: 'Convert text between uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case, and kebab-case instantly. Essential for developers and content writers.',
    icon: 'fa-solid fa-font',
    url: '/tools/case-converter/'
  },
  {
    id: 'lorem-ipsum-generator',
    title: 'Lorem Ipsum Generator',
    desc: 'Generate placeholder text for your designs, mockups, and layouts. Choose from standard Lorem Ipsum or Cicero original. Perfect for web designers and UI/UX professionals.',
    icon: 'fa-solid fa-paragraph',
    url: '/tools/lorem-ipsum-generator/'
  },
  {
    id: 'json-formatter',
    title: 'JSON Formatter & Validator',
    desc: 'Format, validate, and minify JSON data with syntax highlighting and error detection. Essential for developers working with APIs, configs, and data structures.',
    icon: 'fa-solid fa-brackets-curly',
    url: '/tools/json-formatter/'
  },
  {
    id: 'color-converter',
    title: 'Color Converter',
    desc: 'Convert colors between HEX, RGB, HSL, and named color formats. Pick colors visually or paste values. Copy any format with one click. Perfect for designers and front-end developers.',
    icon: 'fa-solid fa-palette',
    url: '/tools/color-converter/'
  },
  {
    id: 'text-diff-checker',
    title: 'Text Diff Checker',
    desc: 'Compare two texts side by side and highlight differences. Find added, removed, and unchanged lines instantly. Ideal for code reviews, content edits, and version comparisons.',
    icon: 'fa-solid fa-not-equal',
    url: '/tools/text-diff-checker/'
  },
  {
    id: 'base64-converter',
    title: 'Base64 Encoder / Decoder',
    desc: 'Encode text or files to Base64 format and decode Base64 strings back to readable text. Supports UTF-8 and file upload. Essential for web developers and API testing.',
    icon: 'fa-solid fa-shield-halved',
    url: '/tools/base64-converter/'
  }
];

function renderToolCards() {
  const grid = document.getElementById('tools-grid');
  if (!grid) return;
  grid.innerHTML = '';
  allTools.forEach(function(tool) {
    const card = document.createElement('div');
    card.className = 'tool-card';
    card.innerHTML =
      '<div class="tool-card-icon"><i class="' + tool.icon + '"></i></div>' +
      '<h3>' + tool.title + '</h3>' +
      '<p>' + tool.desc + '</p>' +
      '<a href="' + tool.url + '" class="btn btn-primary">Open Free Tool</a>';
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', renderToolCards);
