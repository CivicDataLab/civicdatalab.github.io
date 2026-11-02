// Cohort application form backend. Container-bound to the responses Sheet.
// See README.md in this folder for setup and deployment.

// The long ID from the Sheet's URL: docs.google.com/spreadsheets/d/<SHEET_ID>/edit
// Needed when the script was created at script.google.com rather than from the Sheet.
var SHEET_ID = '';
var NOTIFY_EMAIL = ''; // e.g. 'team@civicdatalab.in' to get an email per submission; '' = off
var TABS = { short: 'Short', long: 'Long' };
var SKIP = { form: true, website: true, _order: true };
var MAX_LEN = 5000;

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function clean(v) {
  v = String(v == null ? '' : v).slice(0, MAX_LEN);
  return /^[=+\-@]/.test(v) ? "'" + v : v; // block formula injection
}

// The form sends the question order in `_order`, because Apps Script does not keep the order
// fields arrive in. Keys it does not list go last, in arrival order.
function sortByOrder(keys, p) {
  var order = [];
  try { order = JSON.parse(p._order || '[]'); } catch (err) { order = []; }
  if (!Array.isArray(order)) order = [];
  function rank(k) { var i = order.indexOf(k); return i === -1 ? order.length : i; }
  return keys.map(function (k, i) { return { k: k, r: rank(k), i: i }; })
    .sort(function (a, b) { return a.r - b.r || a.i - b.i; })
    .map(function (x) { return x.k; });
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
    // Column names are the question texts, so find the email by name.
    var emailKey = Object.keys(p).filter(function (k) { return /email/i.test(k); })[0];
    var email = String(p[emailKey] || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ ok: false, error: 'Invalid email' });
    }

    var keys = sortByOrder(Object.keys(p).filter(function (k) { return !SKIP[k]; }), p);
    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName(tabName) || ss.insertSheet(tabName);
      // A tab with no answers yet is rebuilt in question order; once it has rows, columns are never moved.
      var headers = sheet.getLastRow() > 1 && sheet.getLastColumn() > 0
        ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String)
        : [];
      if (!headers.length) {
        if (sheet.getLastColumn() > 0) sheet.getRange(1, 1, 1, sheet.getLastColumn()).clearContent();
        headers = ['Timestamp'];
      }
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

    // The row is already saved, so a failed email must not report the submission as failed.
    if (NOTIFY_EMAIL) {
      try {
        MailApp.sendEmail(NOTIFY_EMAIL, 'New cohort application (' + tabName + ')',
          'From: ' + email + '\n\nOpen the sheet: ' + ss.getUrl());
      } catch (mailErr) {
        console.error(mailErr);
      }
    }
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: 'Server error' });
  }
}

// Optional, run by hand from the Apps Script editor: puts a tab that already has answers into
// question order (Timestamp, then Q1, Q2, ...). Moves whole columns, data included. Make a copy of
// the Sheet first. Stops if a header is blank.
function sortColumns(tabName) {
  var ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(tabName);
  if (!sheet || sheet.getLastRow() < 1) return;
  var values = sheet.getDataRange().getValues();
  var headers = values[0].map(String);
  if (headers.some(function (h) { return h === ''; })) throw new Error('Row 1 has a blank header. Name it first.');
  function rank(h) {
    if (h === 'Timestamp') return -1;
    var m = /^Q(\d+)\b/.exec(h);
    return m ? Number(m[1]) : 1000000;
  }
  var idx = headers.map(function (h, i) { return i; }).sort(function (a, b) {
    return rank(headers[a]) - rank(headers[b]) || a - b;
  });
  var out = values.map(function (row) { return idx.map(function (i) { return row[i]; }); });
  sheet.getRange(1, 1, out.length, out[0].length).setValues(out);
}
function sortLongColumns() { sortColumns(TABS.long); }
function sortShortColumns() { sortColumns(TABS.short); }
