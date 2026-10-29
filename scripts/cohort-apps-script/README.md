# Cohort form backend (Google Apps Script)

Receives the cohort page's form submissions and adds them as rows in a Google Sheet.
Short-form answers go to the `Short` tab, long-form answers to the `Long` tab (created automatically).

## Setup (one time, on the CivicDataLab Google account)

1. Create a new Google Sheet, e.g. "Cohort applications".
2. In the Sheet: **Extensions → Apps Script**.
3. Delete the sample code, paste the whole of `Code.gs` from this folder, and click **Save**.
4. Click **Deploy → New deployment**. Click the gear icon next to "Select type" and choose **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, then **Authorise access**. Pick the CivicDataLab account. If you see
   "Google hasn't verified this app", click **Advanced → Go to (project name)** and **Allow**.
6. Copy the **Web app URL** (it ends in `/exec`).
7. Paste it into `SCRIPT_URL` in `src/components/cohort/config.js` and deploy the site.

## Test it

Open the URL in a browser: you should see `{"ok":true,"status":"running"}`.

Send a test submission (replace the URL):

```sh
URL="https://script.google.com/macros/s/XXXX/exec"
curl -L -d 'form=short&email=test@example.com&website=&q=a' "$URL"
```

Expected reply: `{"ok":true}`, and a new row in the `Short` tab. Delete the test row afterwards.

## Changing the code later

After editing `Code.gs`, you **must** publish a new version, or the URL keeps running the old code:
**Deploy → Manage deployments →** pencil (edit) icon **→ Version: New version → Deploy**.
The URL stays the same, so the website needs no change.

## Email on each new submission

At the top of `Code.gs`, set for example:

```js
var NOTIFY_EMAIL = 'team@civicdatalab.in';
```

Save, then publish a new version (see above). Google asks you to authorise once more (to send mail).
Set it back to `''` to switch emails off.

## Notes

- Columns: `Timestamp`, then one column per question. New questions are added as new columns at the
  right; existing columns are never moved, so sorting and filtering the sheet is safe.
  Don't rename row 1 headers — the script matches answers to columns by those names.
- **Privacy:** the sheet holds applicants' personal data. Share it only with the programme team.
