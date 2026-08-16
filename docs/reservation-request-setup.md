# Lagnaa reservation request setup

This setup uses the website/chatbot, Vercel API, Google Sheets and Apps Script.

It does not require Google Cloud for the owner-approval version.

## Flow

1. Customer submits a request from `/reservations` or the chatbot.
2. Website sends data to `/api/reservations`.
3. `/api/reservations` forwards the request to the Apps Script Web App.
4. Apps Script adds a row to Google Sheets.
5. Apps Script emails the owner.
6. Owner reviews the request and changes `Status` manually.
7. If `Status` becomes `Confirmed`, Apps Script can email the customer once.

The website and chatbot must not claim a reservation is confirmed.

## Required Vercel environment variables

```env
RESERVATION_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
RESERVATION_APPS_SCRIPT_SECRET=use-a-long-random-secret
```

The secret must match `RESERVATION_SECRET` inside `docs/reservation-apps-script.js`.

## Spreadsheet ID

Set `SPREADSHEET_ID` inside `docs/reservation-apps-script.js` to the reservation Google Sheet ID.

For this sheet URL:

```text
https://docs.google.com/spreadsheets/d/1yBsYj072fQ0_m3UGy1SBoDdG3U6nkVTXENAbti3bedo/edit
```

Use:

```js
const SPREADSHEET_ID = '1yBsYj072fQ0_m3UGy1SBoDdG3U6nkVTXENAbti3bedo'
```

Rows are written to the tab named:

```text
Reservation_Requests
```

If that tab does not exist, the script creates it.

## Google Sheet columns

The Apps Script creates these columns automatically:

- Timestamp
- Reference
- Status
- Source
- Name
- Phone
- Email
- Preferred date
- Preferred time
- Guests
- Visit type
- Message
- Owner notes
- Customer email sent?
- Confirmation sent at

## Owner approval

Default status is `Pending`.

When the owner changes status to `Confirmed`, the optional `onEdit` trigger sends the customer email only if:

- customer email exists;
- status is `Confirmed`;
- `Customer email sent?` is not already `Yes`.

This avoids duplicate emails.
