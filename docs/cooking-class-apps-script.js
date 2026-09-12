/*
 * Cooking with Chef form — Google Sheets + owner Gmail notification
 *
 * Before deploying, replace only these three values:
 * - COOKING_CLASS_SECRET
 * - OWNER_EMAIL
 * - SPREADSHEET_ID
 */

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
