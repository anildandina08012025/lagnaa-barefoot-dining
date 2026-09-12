const requestCounts = new Map()
const WINDOW_MS = 60_000
const MAX_REQUESTS_PER_WINDOW = 8

function json(response, body, status = 200) {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', 'no-store')
  response.end(JSON.stringify(body))
}

function clientAddress(request) {
  const forwardedFor = typeof request.headers?.get === 'function'
    ? request.headers.get('x-forwarded-for')
    : request.headers?.['x-forwarded-for']
  return forwardedFor?.split(',')[0]?.trim() || 'unknown'
}

function isRateLimited(request) {
  const key = clientAddress(request)
  const now = Date.now()
  const existing = requestCounts.get(key)
  const active = !existing || now - existing.startedAt > WINDOW_MS
    ? { startedAt: now, count: 0 }
    : existing

  active.count += 1
  requestCounts.set(key, active)
  return active.count > MAX_REQUESTS_PER_WINDOW
}

async function requestBody(request) {
  if (request.body && typeof request.body === 'object') return request.body
  if (typeof request.body === 'string') return JSON.parse(request.body)

  let body = ''
  for await (const chunk of request) body += chunk
  return JSON.parse(body || '{}')
}

function cleanText(value, maxLength = 500) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function validateCookingClassRequest(payload) {
  const request = {
    source: cleanText(payload.source, 40) || 'website',
    name: cleanText(payload.name, 120),
    email: cleanText(payload.email, 160),
    phone: cleanText(payload.phone, 60),
    dietary: cleanText(payload.dietary, 500),
    dish: cleanText(payload.dish, 1200),
  }

  const errors = {}
  if (request.name.length < 2) errors.name = 'Enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(request.email)) errors.email = 'Enter a valid email address.'
  if (!/^\+?\d[\d\s()-]{6,}$/.test(request.phone)) errors.phone = 'Enter a phone number with country code.'
  if (!request.dish) errors.dish = 'Tell Lagnaa...barefoot dining which dish you would like to learn.'

  return { request, errors }
}

export default async function handler(request, response) {
  if (request.method !== 'POST') return json(response, { error: 'Method not allowed.' }, 405)
  if (isRateLimited(request)) return json(response, { error: 'Please wait a moment before sending another cooking-class request.' }, 429)

  const appsScriptUrl = process.env.COOKING_CLASS_APPS_SCRIPT_URL
  const appsScriptSecret = process.env.COOKING_CLASS_APPS_SCRIPT_SECRET
  if (!appsScriptUrl || !appsScriptSecret) {
    return json(response, { error: 'Cooking-class requests are not configured yet. Please contact Lagnaa...barefoot dining directly.' }, 503)
  }

  let payload
  try {
    payload = await requestBody(request)
  } catch {
    return json(response, { error: 'Please send valid cooking-class details.' }, 400)
  }

  const { request: cookingClassRequest, errors } = validateCookingClassRequest(payload)
  if (Object.keys(errors).length) return json(response, { error: 'Please check the cooking-class details.', errors }, 400)

  try {
    const upstream = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: appsScriptSecret, ...cookingClassRequest }),
    })
    const text = await upstream.text()
    let result = {}
    try {
      result = JSON.parse(text)
    } catch {
      result = {}
    }

    if (!upstream.ok || result.ok === false) {
      console.error('Cooking-class Apps Script error', upstream.status, result.error || text.slice(0, 180))
      return json(response, { error: 'Cooking-class requests are temporarily unavailable. Please contact Lagnaa...barefoot dining directly.' }, 502)
    }

    return json(response, {
      ok: true,
      reference: typeof result.reference === 'string' ? result.reference : undefined,
      message: 'Your cooking-class request has been sent to Lagnaa...barefoot dining.',
    })
  } catch (error) {
    console.error('Cooking-class request error', error)
    return json(response, { error: 'Cooking-class requests are temporarily unavailable. Please contact Lagnaa...barefoot dining directly.' }, 502)
  }
}
