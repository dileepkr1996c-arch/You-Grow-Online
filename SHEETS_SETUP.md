# Deployment Guide — Main Site + Blog Subdomain

Live sites:
- **Main**: https://yougrowonline.in/ (this repo)
- **Blog**: https://blog.yougrowonline.in/ (`yougrowonline-blog/` — deploy as separate GitHub repo)

---

## Blog Subdomain Deployment

### Step 1: Create a separate GitHub repository

1. Create a new repo (e.g., `yougrowonline-blog`)
2. Copy all contents of `yougrowonline-blog/` into the repo root
3. Push to GitHub

### Step 2: Configure GitHub Pages

1. Go to repo **Settings > Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `main`, root folder `/`
4. **Custom domain**: `blog.yougrowonline.in`
5. Click **Save** and check **Enforce HTTPS**

### Step 3: DNS setup

Add a CNAME record at your DNS provider:

```
blog.yougrowonline.in  CNAME  <your-github-username>.github.io
```

### Step 4: Verify

Wait for DNS + HTTPS to propagate, then visit https://blog.yougrowonline.in/

---

## Updating Blog Cards on Main Site Homepage

The main site's "Our Blog" section fetches from `assets/data/blog-posts.json`. After adding a new blog post on the blog subdomain, update this file with the latest 3 posts. Use this format:

```json
[
  {
    "title": "Your Post Title",
    "date": "Mon DD, YYYY",
    "url": "https://blog.yougrowonline.in/post-slug/",
    "description": "Short summary of the post.",
    "image": "https://images.unsplash.com/photo-xxxxx?w=400&q=80",
    "categories": ["category-name"]
  }
]
```

Homepage cards link directly to `https://blog.yougrowonline.in/post-slug/`.

---

## Main Site Deployment

1. Push main site repo to GitHub
2. In repo **Settings > Pages**, set source to `main` branch, root folder `/`
3. Custom domain: `yougrowonline.in` (already set)
4. DNS: `yougrowonline.in` A records pointing to GitHub Pages IPs (or CNAME to `<user>.github.io`)

---

## Google Sheets Form Integration

### Step 1: Deploy the Apps Script

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1e5VAUeF2gn2KGe9BMa547V_ZsWc_PzwnUe2Q62RZLww/edit
2. Go to **Extensions > Apps Script**
3. Delete any default code and paste the entire content from `assets/js/google-sheets-apps-script.gs`
4. Click **Save** (💾 icon) — name the project "You Grow Online Form Handler"
5. Click **Deploy > New Deployment**
   - **Type**: Web App
   - **Description**: Form handler
   - **Execute as**: Me
   - **Who has access**: Anyone
6. Click **Deploy**
7. **Copy the Web App URL** (looks like `https://script.google.com/macros/s/.../exec`)

### Step 2: Update the Website

1. Open `assets/js/main.js`
2. Find this line:
   ```js
   const SHEETS_URL = 'YOUR_WEB_APP_URL';
   ```
3. Replace `YOUR_WEB_APP_URL` with the URL you copied

### Step 3: Test

1. Open your website (or a local preview)
2. Fill out the contact form on any page and submit
3. Check your Google Sheet — a new row should appear with the data

### Notes

- The form works with **`no-cors`** mode (Google Apps Script limitation). The success/failure check happens optimistically — data arrives at the sheet even though the browser can't read the response.
- The sheet gets a header row (Timestamp, Name, Email, Phone, Service, Budget, Message, Source Page) on first submission automatically.
- Form data appears immediately after submission — no email relay needed.
