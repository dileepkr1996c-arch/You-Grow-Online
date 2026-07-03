# Google Sheets Form Integration — Deployment Guide

## Step 1: Deploy the Apps Script

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

## Step 2: Update the Website

1. Open `assets/js/main.js`
2. Find this line:
   ```js
   const SHEETS_URL = 'YOUR_WEB_APP_URL';
   ```
3. Replace `YOUR_WEB_APP_URL` with the URL you copied

## Step 3: Test

1. Open your website (or a local preview)
2. Fill out the contact form on any page and submit
3. Check your Google Sheet — a new row should appear with the data

## Notes
- The form works with **`no-cors`** mode (Google Apps Script limitation). The success/failure check happens optimistically — data arrives at the sheet even though the browser can't read the response.
- The sheet gets a header row (Timestamp, Name, Email, Phone, Service, Budget, Message, Source Page) on first submission automatically.
- Form data appears immediately after submission — no email relay needed.
