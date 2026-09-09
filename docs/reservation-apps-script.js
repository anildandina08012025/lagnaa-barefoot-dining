/* eslint-disable no-unused-vars */

/**
 * Lagnaa reservation request Apps Script.
 *
 * Setup:
 * 1. Create a Google Sheet for reservation requests.
 * 2. Extensions → Apps Script.
 * 3. Paste this file.
 * 4. Update RESERVATION_SECRET and OWNER_EMAIL.
 * 5. Deploy → New deployment → Web app.
 * 6. Execute as: Me.
 * 7. Who has access: Anyone.
 * 8. Add the Web App URL to Vercel as RESERVATION_APPS_SCRIPT_URL.
 * 9. Add the same secret to Vercel as RESERVATION_APPS_SCRIPT_SECRET.
 */

const RESERVATION_SECRET = 'CHANGE_THIS_TO_A_LONG_RANDOM_SECRET'
const OWNER_EMAIL = 'owner@example.com'
const SPREADSHEET_ID = 'PASTE_RESERVATION_SHEET_ID_HERE'
const SHEET_NAME = 'Reservation_Requests'

const HEADERS = [
  'Timestamp',
  'Reference',
  'Status',
  'Source',
  'Name',
  'Phone',
  'Email',
  'Preferred date',
  'Preferred time',
  'Guests',
  'Visit type',
  'Message',
  'Owner notes',
]

function getSheet_() {
  const spreadsheet = SPREADSHEET_ID === 'PASTE_RESERVATION_SHEET_ID_HERE'
    ? SpreadsheetApp.getActiveSpreadsheet()
    : SpreadsheetApp.openById(SPREADSHEET_ID)
  let sheet = spreadsheet.getSheetByName(SHEET_NAME)
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME)

  const currentHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0]
  const missingHeaders = HEADERS.some((header, index) => currentHeaders[index] !== header)
  if (missingHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
    sheet.setFrozenRows(1)
  }

  const statusColumn = HEADERS.indexOf('Status') + 1
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Approved', 'Cancelled'], true)
    .setAllowInvalid(false)
    .build()
  sheet.getRange(2, statusColumn, Math.max(sheet.getMaxRows() - 1, 1), 1).setDataValidation(statusRule)

  return sheet
}

function json_(body, statusCode) {
  return ContentService
    .createTextOutput(JSON.stringify({ statusCode: statusCode || 200, ...body }))
    .setMimeType(ContentService.MimeType.JSON)
}

function clean_(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents || '{}')
    if (payload.secret !== RESERVATION_SECRET) return json_({ ok: false, error: 'Unauthorised' }, 401)

    const reference = `LAG-${Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd-HHmmss')}`
    const row = [
      new Date(),
      reference,
      'Approved',
      clean_(payload.source) || 'website',
      clean_(payload.name),
      clean_(payload.phone),
      clean_(payload.email),
      clean_(payload.date),
      clean_(payload.time),
      clean_(payload.guests),
      clean_(payload.experience) || 'Regular Dining',
      clean_(payload.message),
      '',
    ]

    getSheet_().appendRow(row)
    sendOwnerEmail_(reference, payload)

    return json_({ ok: true, reference }, 200)
  } catch (error) {
    return json_({ ok: false, error: String(error) }, 500)
  }
}

function sendOwnerEmail_(reference, payload) {
  const subject = `New confirmed Lagnaa reservation: ${reference}`
  const body = [
    'A new confirmed reservation was submitted.',
    '',
    `Reference: ${reference}`,
    `Source: ${clean_(payload.source) || 'website'}`,
    `Name: ${clean_(payload.name)}`,
    `Phone: ${clean_(payload.phone)}`,
    `Email: ${clean_(payload.email)}`,
    `Preferred date: ${clean_(payload.date)}`,
    `Preferred time: ${clean_(payload.time)}`,
    `Guests: ${clean_(payload.guests)}`,
    `Visit type: ${clean_(payload.experience) || 'Regular Dining'}`,
    `Message: ${clean_(payload.message) || 'None provided'}`,
    '',
    'Status: Approved',
    '',
    `Open sheet: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`,
  ].join('\n')

  MailApp.sendEmail(OWNER_EMAIL, subject, body)
}
