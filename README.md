# You Grow Online — Static Web Distribution Package

Welcome to your production-ready, fully responsive static website package. This directory is hand-crafted using clean, pixel-perfect, and modern architecture, optimized for immediate hosting on **GitHub Pages** with zero-build or setup steps required!

## 📦 What's Inside the Static Package

-   `index.html`: The core single-page visual layout, structured in semantic sections with built-in dark mode capabilities, navigation routing, and high-fidelity sections.
-   `js/data.js`: Houses all the business data objects (niche services definitions, portfolo details, standardized pricing, and FAQs directories). Adjusting content here instantly updates the rendering on-screen!
-   `js/app.js`: Connects all interactive elements. Controls state configurations, persists metrics locally, validates inputs, dynamically executes pricing calculations, and dispatches form content.
-   `images/`: Created directory containing guidelines for inserting local media assets instead of the lightweight Unsplash CDN URLs.

---

## 🚀 Features Fully Transpiled Into Plain Code

1.  **Fully Interactive Budget Estimator:**
    -   Dynamic sliders, category selectors, and extra checkboxes.
    -   Real-time conversion calculations supporting both **₹ INR** and **$ USD**.
    -   One-click WhatsApp export with pre-formatted inquiry templates.
2.  **Autonomous Client Testimonials Form:**
    -   Clients can submit reviews with custom ratings.
    -   Submissions instantly update the on-screen list and are persisted directly in the browser's `localStorage` cache for offline preservation.
    -   Copies are also routed as live text notifications to your email.
3.  **Autonomous Core Leads Reservation Form:**
    -   Full corporate business parameters (with phone digits validations).
    -   Live dispatch via **FormSubmit.co Ajax Gateway** securely proxying email delivery directly to:
        `contact.yougrowonline@gmail.com`.
    -   Completed submissions are recorded in an integrated local tracker inside your dashboard.
4.  **Floating Conversational Widget:**
    -   Includes a modern hover status and instant WhatsApp chat bindings matching active schedules.
5.  **Corporation Modals:**
    -   Rich interactive overlays listing legal clauses and terms of service.

---

## 🛠️ How to View and Test Locally

Because the system manages dependencies via performance CDNs, testing is incredibly simple:
1. Double-click on `index.html` to open it directly in any modern browser (Chrome, Safari, Firefox, Edge, etc.).
2. That's it! Tap the Dark/Light Mode toggle in the top navbar, run estimated quote pricing calculations on the estimator, or test form validations.

---

## 🐙 How to Host on GitHub Pages (Completely Free!)

Ready to make the website live? Follow these 5 quick steps:

1.  **Create a Repository:**
    Log into your GitHub account, click **New Repository**, name it (e.g., `you-grow-online`), set it to **Public**, and click **Create**.
2.  **Upload the Files:**
    Inside your repository view, select **upload an existing file**. Drag and drop all the files from this `static-site/` folder directly:
    -   `index.html` (Must be directly in your primary repository root)
    -   `js/` (The folder with the subfiles `data.js` and `app.js`)
    -   `images/` (The image folder with assets)
    Click **Commit changes**.
3.  **Activate GitHub Pages:**
    -   Go to the **Settings** tab of your repository.
    -   In the left sidebar, click on **Pages**.
    -   Under "Build and deployment", set the source to **Deploy from a branch**.
    -   Under "Branch", select **main** (or `master`) and folder **/** (root). Click **Save**.
4.  **Confirm Activation:**
    -   Wait 1 to 2 minutes. Refresh the settings page.
    -   GitHub will display a notification: *"Your site is live at: https://username.github.io/you-grow-online/"*.
5.  **Set Up Custom Domain (Optional):**
    If you purchase a custom domain (e.g., `yougrowonline.com`), simply type it inside the **Custom domain** input box on the Pages settings page, click Save, and set up your registrar's CNAME records matching GitHub's server IPs!

---

*This static suite was engineered by You Grow Online Agency with pixel-perfect visual alignments matching 2026 performance targets.*
