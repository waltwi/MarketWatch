const FINNHUB_BASE = 'https://finnhub.io/api/v1'
const API_KEY = process.env.REACT_APP_FINNHUB_KEY || ''

async function fetchQuote(symbol) {
  if (!API_KEY) return mockQuote(symbol)
  const res = await fetch(`${FINNHUB_BASE}/quote?symbol=${symbol}&token=${API_KEY}`)
  if (!res.ok) throw new Error('Quote fetch failed')
  const data = await res.json()
  return {
    symbol,
    current: data.c,
    change: data.d,
    percent: data.dp,
  }
}

async function fetchBulkQuotes(symbols = []) {
  // Finnhub doesn't provide a single bulk endpoint without plan; fetch in parallel
  const promises = symbols.map((s) => fetchQuote(s).catch(() => mockQuote(s)))
  return Promise.all(promises)
}

function mockQuote(symbol) {
  const base = Math.floor(Math.random() * 300) + 20
  const change = parseFloat(((Math.random() - 0.5) * 10).toFixed(2))
  const percent = parseFloat(((change / base) * 100).toFixed(2))
  return Promise.resolve({ symbol, current: base, change, percent })
}

export { fetchQuote, fetchBulkQuotes }
