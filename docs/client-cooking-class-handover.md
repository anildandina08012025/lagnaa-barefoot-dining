# Switching Cooking with Chef requests to the client account

Use this guide after the client provides their Gmail address and their Google
Sheet. It applies only to the **Cooking with Chef** form. Reservation settings
remain separate and are documented in `client-reservation-handover.md`.

## What the form does

When someone submits the Cooking with Chef form:

1. Their details are added as one new row in the Google Sheet.
2. The client receives one Gmail notification with those details.
3. The guest sees a website success message.

The guest does **not** receive an email, and submitting the request does not
confirm a class place.

## 1. Create the client Google Sheet

Create a new Google Sheet in the client's Google account. Copy the Sheet ID
from its URL: it is the text between `/d/` and `/edit`.

For example, in:

```text
https://docs.google.com/spreadsheets/d/THIS_IS_THE_SHEET_ID/edit
```

the Sheet ID is `THIS_IS_THE_SHEET_ID`.

The Apps Script below creates the tab and headers automatically. Its tab name
is `Cooking_Class_Requests`.

The columns will be:

1. Timestamp
2. Reference
3. Source
4. Name
5. Email
6. Phone
7. Dietary restrictions
8. Requested dish
9. Owner notes

Phone numbers are saved as plain text, so numbers such as `+65 9784 4771` do
not show a Sheet formula error.

## 2. Add the Google Apps Script

In the new client Sheet, choose **Extensions → Apps Script**. Replace the
editor contents with the code below.

Before saving, replace these three values only:

```js
const COOKING_CLASS_SECRET = 'replace-with-a-new-long-private-secret'
const OWNER_EMAIL = 'client-email@example.com'
const SPREADSHEET_ID = 'client-google-sheet-id'
```

- `COOKING_CLASS_SECRET`: create a long, private value. Keep it secret. It
  must exactly match the Vercel value in step 4.
- `OWNER_EMAIL`: the client's Gmail address. This inbox receives each new
  Cooking with Chef request.
- `SPREADSHEET_ID`: the ID copied in step 1.

```js
const COOKING_CLASS_SECRET = 'replace-with-a-new-long-private-secret'
const OWNER_EMAIL = 'client-email@example.com'
const SPREADSHEET_ID = 'client-google-sheet-id'
const SHEET_NAME = 'Cooking_Class_Requests'

const HEADERS = [
  'Timestamp',
  'Reference',
  'Source',
  'Name',
  'Email',
  'Phone',
  'Dietary restrictions',
  'Requested dish',
  'Owner notes',
]

function getSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID)
  let sheet = spreadsheet.getSheetByName(SHEET_NAME)
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME)

  const currentHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0]
  const headersNeedUpdate = HEADERS.some((header, index) => currentHeaders[index] !== header)
  if (headersNeedUpdate) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
    sheet.setFrozenRows(1)
  }

  sheet.getRange('F:F').setNumberFormat('@')
  return sheet
}

function json_(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON)
}

function clean_(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function sheetText_(value) {
  const text = clean_(value)
  return text ? `'${text}` : ''
}

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents || '{}')
    if (payload.secret !== COOKING_CLASS_SECRET) {
      return json_({ ok: false, error: 'Unauthorised' })
    }

    const reference = `COOK-${Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd-HHmmss')}`
    const row = [
      new Date(),
      reference,
      clean_(payload.source) || 'website',
      clean_(payload.name),
      clean_(payload.email),
      sheetText_(payload.phone),
      clean_(payload.dietary) || 'None provided',
      clean_(payload.dish),
      '',
    ]

    const sheet = getSheet_()
    sheet.appendRow(row)
    sendOwnerEmail_(reference, payload, SpreadsheetApp.openById(SPREADSHEET_ID).getUrl())

    return json_({ ok: true, reference })
  } catch (error) {
    return json_({ ok: false, error: String(error) })
  }
}

function sendOwnerEmail_(reference, payload, sheetUrl) {
  const subject = `New Cooking with Chef request: ${reference}`
  const body = [
    'A new Cooking with Chef request was submitted.',
    '',
    `Reference: ${reference}`,
    `Source: ${clean_(payload.source) || 'website'}`,
    `Name: ${clean_(payload.name)}`,
    `Email: ${clean_(payload.email)}`,
    `Phone: ${clean_(payload.phone)}`,
    `Dietary restrictions: ${clean_(payload.dietary) || 'None provided'}`,
    `Dish the guest would like to learn: ${clean_(payload.dish)}`,
    '',
    `Open sheet: ${sheetUrl}`,
  ].join('\n')

  MailApp.sendEmail(OWNER_EMAIL, subject, body)
}
```

## 3. Deploy the Apps Script

1. Click **Save**.
2. Click **Deploy → New deployment**.
3. Select **Web app**.
4. Set **Execute as** to **Me**.
5. Set access so the website can submit requests (**Anyone**).
6. Click **Deploy** and complete Google authorisation.
7. Copy the Web app URL ending in `/exec`.

If the script is edited later, use **Deploy → Manage deployments → Edit → New
version → Deploy**. Updating an existing deployment normally keeps the same
`/exec` URL.

## 4. Add the two Vercel environment variables

In **Vercel → Project → Settings → Environment Variables**, add these values
for **Production** and **Preview**:

```text
COOKING_CLASS_APPS_SCRIPT_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
COOKING_CLASS_APPS_SCRIPT_SECRET=the-exact-same-private-secret-from-the-script
```

Do not put either value in GitHub, the React code, or a public document.

Redeploy the website after adding or changing either Vercel variable.

## 5. Test once

From the deployed Vercel website, submit one realistic test Cooking with Chef
request. Confirm that:

- one new row appears in `Cooking_Class_Requests`;
- the client Gmail receives one notification;
- the phone number displays normally, without `#ERROR!`;
- the guest sees the website success message;
- the guest receives no automatic email.

## Changing from the current owner to the client later

When the client sends their Gmail and Sheet:

1. Change `OWNER_EMAIL` and `SPREADSHEET_ID` in the Apps Script.
2. Save and deploy a **new version** of that Apps Script.
3. If the `/exec` URL stays the same, no URL change is needed in Vercel.
4. Keep the secret unchanged unless you deliberately create a new one.
5. If the secret changes, update `COOKING_CLASS_APPS_SCRIPT_SECRET` in Vercel
   to the exact same value and redeploy.
6. Test once using the checklist above.
