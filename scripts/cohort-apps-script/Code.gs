// Cohort application form backend. Container-bound to the responses Sheet.
// See README.md in this folder for setup and deployment.

var NOTIFY_EMAIL = ''; // e.g. 'team@civicdatalab.in' to get an email per submission; '' = off
var TABS = { short: 'Short', long: 'Long' };
var SKIP = { form: true, website: true };
var MAX_LEN = 5000;

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function clean(v) {
  v = String(v == null ? '' : v).slice(0, MAX_LEN);
  return /^[=+\-@]/.test(v) ? "'" + v : v; // block formula injection
}

function doGet() {
  return json({ ok: true, status: 'running' });
}

function doPost(e) {
  try {
    var p = (e && e.parameter) || {};
    if (p.website) return json({ ok: true }); // honeypot: pretend success
    var tabName = TABS[p.form];
    if (!tabName) return json({ ok: false, error: 'Invalid form' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(p.email || '').trim())) {
      return json({ ok: false, error: 'Invalid email' });
    }

    var keys = Object.keys(p).filter(function (k) { return !SKIP[k]; });
    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName(tabName) || ss.insertSheet(tabName);
      var headers = sheet.getLastColumn() > 0
        ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String)
        : [];
      if (!headers.length) headers = ['Timestamp'];
      keys.forEach(function (k) { if (headers.indexOf(k) === -1) headers.push(k); }); // append-only
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

      var row = headers.map(function (h) {
        if (h === 'Timestamp') return new Date();
        return keys.indexOf(h) === -1 ? '' : clean(p[h]);
      });
      sheet.appendRow(row);
    } finally {
      lock.releaseLock();
    }

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(NOTIFY_EMAIL, 'New cohort application (' + tabName + ')',
        'From: ' + p.email + '\n\nOpen the sheet: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl());
    }
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: 'Server error' });
  }
}
