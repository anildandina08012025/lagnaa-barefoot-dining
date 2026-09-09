# Switching reservations to the client account

Use this when the client provides their Gmail address and their own Google Sheet.

## What changes

Only three private settings need to be replaced in the Google Apps Script:

```js
const OWNER_EMAIL = 'client-email@example.com'
const SPREADSHEET_ID = 'client-google-sheet-id'
const RESERVATION_SECRET = 'a-new-long-private-secret'
```

- `OWNER_EMAIL`: the client's Gmail inbox. It receives one notification whenever a new reservation row is added.
- `SPREADSHEET_ID`: the ID from the client's Google Sheet URL, between `/d/` and `/edit`.
- `RESERVATION_SECRET`: a newly generated private value. Do not publish it or put it in the sheet.

The sheet tab must be named `Reservation_Requests`. If the client uses another tab name, change `SHEET_NAME` in the script to match it exactly.

## Google Sheet columns

Keep these headers in row 1, in this order:

1. Timestamp
2. Reference
3. Status
4. Source
5. Name
6. Phone
7. Email
8. Preferred date
9. Preferred time
10. Guests
11. Visit type
12. Message
13. Owner notes

Format the **Phone** column (F) as **Plain text**. The Apps Script also stores
phone numbers as text so country-code numbers such as `+65 8765 9872` do not
be interpreted as spreadsheet formulas.

For an existing Apps Script, make sure it contains this helper and uses it for
the Phone value in the reservation row:

```js
function sheetText_(value) {
  const text = clean_(value)
  return text ? `'${text}` : ''
}

// In the row array:
sheetText_(payload.phone),
```

For the Status column, set the dropdown range to `C2:C` and use:

- `Approved`
- `Cancelled`

New website reservations are automatically added as `Approved`. The customer sees confirmation on the website but does not receive an email. The client receives the new-reservation notification email.

## Publish the Apps Script

After changing the settings:

1. Save the Apps Script.
2. Select **Deploy** → **Manage deployments**.
3. Edit the existing Web app deployment.
4. Select **New version**, then **Deploy**.

Keep access set so the website can submit reservations. The existing `/exec` Web App URL remains the same when updating an existing deployment.

## Update Vercel only when needed

In Vercel → Project → Settings → Environment Variables, replace:

```text
RESERVATION_APPS_SCRIPT_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
RESERVATION_APPS_SCRIPT_SECRET=the-same-new-private-secret
```

Use the deployed Apps Script's `/exec` URL and the exact same secret used in the Apps Script.

- Deploying a **new version of the existing Web App** keeps its Deployment ID
  and `/exec` URL. No Vercel update is needed when they remain unchanged.
- Update `RESERVATION_APPS_SCRIPT_URL` only when the client creates a **new**
  Apps Script Web App deployment with a different `/exec` URL.
- Update `RESERVATION_APPS_SCRIPT_SECRET` only when `RESERVATION_SECRET` in
  Apps Script changes. The two values must match exactly.

Redeploy the website only after changing one of these Vercel variables.

## Check once after switching

Submit one real-looking test reservation from the deployed site. Confirm that:

- exactly one row appears in the client Sheet;
- the row status is `Approved`;
- the client Gmail receives one notification;
- the customer sees the success message but receives no email.
