/**
 * Google Apps Script for You Grow Online contact form
 *
 * HOW TO DEPLOY:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1e5VAUeF2gn2KGe9BMa547V_ZsWc_PzwnUe2Q62RZLww/edit
 * 2. Go to Extensions > Apps Script
 * 3. Paste this entire code, replacing the placeholder
 * 4. Deploy > New Deployment > Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL and paste it into the form action in index.html and contact.html
 *    (replace "YOUR_WEB_APP_URL_HERE")
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Ensure header row exists
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Name', 'Email', 'Phone', 'Service',
        'Budget', 'Message', 'Source Page'
      ]);
    }

    // Append form data
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.service || '',
      data.budget || '',
      data.message || '',
      data.source || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('You Grow Online - Form handler is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
