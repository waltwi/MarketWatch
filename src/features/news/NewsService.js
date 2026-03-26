const FINNHUB_BASE = 'https://finnhub.io/api/v1'
const API_KEY = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FINNHUB_KEY) || process.env.REACT_APP_FINNHUB_KEY || ''

async function fetchNews(category = 'general') {
  if (!API_KEY) return mockNews()
  const res = await fetch(`${FINNHUB_BASE}/news?category=${category}&token=${API_KEY}`)
  if (!res.ok) throw new Error('News fetch failed')
  const data = await res.json()
  return data.map((n) => ({
    id: n.id || n.datetime || n.url,
    headline: n.headline || n.title || n.summary || 'News',
    source: n.source || n.category || '',
    url: n.url,
    datetime: n.datetime || Date.now(),
  }))
}

function mockNews() {
  return Promise.resolve([
    { id: 1, headline: 'SCOTUS Strikes Down Global Tariffs', source: 'news', url: '#', datetime: Date.now() - 3600 },
    { id: 2, headline: 'Nvidia Scales OpenAI Investment to $30B', source: 'news', url: '#', datetime: Date.now() - 7200 },
    { id: 3, headline: 'U.S. Moves to Rebuild Venezuelan Energy', source: 'news', url: '#', datetime: Date.now() - 10800 },
  ])
}

export { fetchNews }
