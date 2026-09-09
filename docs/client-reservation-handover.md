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

## Update Vercel

In Vercel → Project → Settings → Environment Variables, replace:

```text
RESERVATION_APPS_SCRIPT_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
RESERVATION_APPS_SCRIPT_SECRET=the-same-new-private-secret
```

Use the deployed Apps Script's `/exec` URL and the exact same secret used in the Apps Script. Redeploy the website after saving the Vercel variables.

## Check once after switching

Submit one real-looking test reservation from the deployed site. Confirm that:

- exactly one row appears in the client Sheet;
- the row status is `Approved`;
- the client Gmail receives one notification;
- the customer sees the success message but receives no email.
