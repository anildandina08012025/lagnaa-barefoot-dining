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
  'Customer email sent?',
  'Confirmation sent at',
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
      'Pending',
      clean_(payload.source) || 'website',
      clean_(payload.name),
      clean_(payload.phone),
      clean_(payload.email),
      clean_(payload.date),
      clean_(payload.time),
      clean_(payload.guests),
      clean_(payload.experience) || 'Table reservation',
      clean_(payload.message),
      '',
      '',
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
  const subject = `New Lagnaa reservation request: ${reference}`
  const body = [
    'A new reservation request was submitted.',
    '',
    `Reference: ${reference}`,
    `Source: ${clean_(payload.source) || 'website'}`,
    `Name: ${clean_(payload.name)}`,
    `Phone: ${clean_(payload.phone)}`,
    `Email: ${clean_(payload.email)}`,
    `Preferred date: ${clean_(payload.date)}`,
    `Preferred time: ${clean_(payload.time)}`,
    `Guests: ${clean_(payload.guests)}`,
    `Visit type: ${clean_(payload.experience) || 'Table reservation'}`,
    `Message: ${clean_(payload.message) || 'None provided'}`,
    '',
    'Status: Pending owner confirmation',
    '',
    `Open sheet: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`,
  ].join('\n')

  MailApp.sendEmail(OWNER_EMAIL, subject, body)
}

/**
 * Optional approval email:
 * When the owner changes Status to Confirmed, this sends one email to the customer.
 * Installable trigger required:
 * Apps Script → Triggers → Add Trigger → onEdit → From spreadsheet → On edit.
 */
function onEdit(event) {
  const sheet = event.range.getSheet()
  if (sheet.getName() !== SHEET_NAME || event.range.getRow() === 1) return

  const editedHeader = sheet.getRange(1, event.range.getColumn()).getValue()
  if (editedHeader !== 'Status') return

  const row = event.range.getRow()
  const values = sheet.getRange(row, 1, 1, HEADERS.length).getValues()[0]
  const record = Object.fromEntries(HEADERS.map((header, index) => [header, values[index]]))

  if (String(record.Status).toLowerCase() !== 'confirmed') return
  if (!record.Email || record['Customer email sent?'] === 'Yes') return

  const subject = 'Your Lagnaa reservation request'
  const body = [
    `Namaste ${record.Name},`,
    '',
    'Lagnaa has reviewed your reservation request and will confirm directly if any further detail is needed.',
    '',
    `Reference: ${record.Reference}`,
    `Date: ${record['Preferred date']}`,
    `Time: ${record['Preferred time']}`,
    `Guests: ${record.Guests}`,
    `Visit type: ${record['Visit type']}`,
    '',
    'Thank you,',
    'Lagnaa Barefoot Dining',
  ].join('\n')

  MailApp.sendEmail(String(record.Email), subject, body)

  const emailSentColumn = HEADERS.indexOf('Customer email sent?') + 1
  const sentAtColumn = HEADERS.indexOf('Confirmation sent at') + 1
  sheet.getRange(row, emailSentColumn).setValue('Yes')
  sheet.getRange(row, sentAtColumn).setValue(new Date())
}
