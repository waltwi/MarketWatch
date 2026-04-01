import React, { useEffect, useState } from 'react'
import { fetchBulkQuotes } from '../features/market/MarketService'
import SpreadCard from '../features/market/components/SpreadCard'
import Panel from '../components/Panel'
import Chart from '../components/Chart'
import NewsFeed from '../features/news/components/NewsFeed'

const TOP_SYMBOLS = ['FSLY', 'DHX', 'VAL', 'RNG', 'TNDM']
const WATCHLIST = ['AAPL', 'TSLA', 'NVDA', 'INTC']
const COMPARE = ['AVGO', 'INTC', 'ORCL', 'ADBE']

function ListRow({ symbol, mid, percent, dense }) {
  const n = typeof percent === 'number' ? percent : Number(percent)
  const finite = Number.isFinite(n)
  const positive = finite && n >= 0
  const pct = finite ? `${positive ? '+' : ''}${n.toFixed(2)}%` : '—'
  return (
    <div
      className={`flex items-center gap-2 ${dense ? 'py-1.5' : 'py-2'} px-1 -mx-1 rounded-lg hover:bg-white/[0.03] transition-colors`}
    >
      <span className="font-semibold text-[13px] text-white tabular-nums w-14 shrink-0">{symbol}</span>
      <span className="flex-1 text-[12px] text-mw-muted tabular-nums truncate text-center">{mid}</span>
      <span
        className={`text-[12px] font-semibold tabular-nums w-[4.25rem] text-right shrink-0 ${
          !finite ? 'text-mw-muted' : positive ? 'text-mw-up' : 'text-mw-down'
        }`}
      >
        {pct}
      </span>
    </div>
  )
}

function seedFromSymbol(symbol) {
  let h = 0
  for (let i = 0; i < symbol.length; i += 1) h = (Math.imul(31, h) + symbol.charCodeAt(i)) | 0
  return Math.abs(h)
}

function CompareCard({ symbol }) {
  const seed = seedFromSymbol(symbol)
  const cap = (50 + (seed % 850) / 10).toFixed(1)
  const volM = (1 + (seed % 90) / 10).toFixed(1)
  const vol = `${volM}M`
  const pct = Number((((seed % 1000) / 1000 - 0.5) * 6).toFixed(2))
  const positive = pct >= 0
  const rows = [
    { label: 'Price', value: '$—' },
    { label: 'Market Cap', value: `$${cap}B` },
    { label: 'Vol', value: vol },
    {
      label: '% Change',
      value: `${positive ? '+' : ''}${pct.toFixed(2)}%`,
      valueClass: positive ? 'text-mw-up' : 'text-mw-down',
    },
  ]
  return (
    <div className="rounded-xl border border-mw-border bg-mw-raised/90 shadow-card p-3.5 flex flex-col min-h-[140px]">
      <div className="text-[15px] font-bold text-white tracking-tight pb-2 border-b border-mw-border/80 mb-2">
        {symbol}
      </div>
      <dl className="space-y-2 flex-1">
        {rows.map(({ label, value, valueClass }) => (
          <div key={label} className="flex items-baseline justify-between gap-2 text-[12px]">
            <dt className="text-mw-muted shrink-0">{label}</dt>
            <dd className={`font-medium tabular-nums text-right ${valueClass || 'text-slate-200'}`}>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default function LandingPage() {
  const [topTickers, setTopTickers] = useState([])
  const [watch, setWatch] = useState([])

  useEffect(() => {
    let mounted = true
    fetchBulkQuotes(TOP_SYMBOLS).then((res) => mounted && setTopTickers(res)).catch(() => {})
    fetchBulkQuotes(WATCHLIST).then((res) => mounted && setWatch(res)).catch(() => {})
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-12 gap-2 sm:gap-3">
        {topTickers.map((t, i) => (
          <div key={t.symbol || i} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2">
            <SpreadCard symbol={t.symbol} name={t.name || ''} price={t.current} percent={t.percent} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-2 sm:gap-3 items-start">
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-2 sm:gap-3">
          <Panel title="Assets">
            <div className="divide-y divide-mw-border/50 -my-0.5">
              {watch.map((w) => (
                <ListRow
                  key={w.symbol}
                  symbol={w.symbol}
                  mid={w.current != null ? `$${Number(w.current).toFixed(2)}` : '—'}
                  percent={w.percent}
                />
              ))}
            </div>
          </Panel>

          <Panel title="Watchlist">
            <div className="divide-y divide-mw-border/50 -my-0.5">
              {topTickers.length ? (
                topTickers.map((t) => (
                  <ListRow
                    key={t.symbol}
                    symbol={t.symbol}
                    dense
                    mid={t.current != null ? `$${Number(t.current).toFixed(2)}` : '—'}
                    percent={t.percent}
                  />
                ))
              ) : (
                <p className="text-[12px] text-mw-muted py-2">Loading…</p>
              )}
            </div>
          </Panel>
        </aside>

        <main className="col-span-12 lg:col-span-6 flex flex-col gap-2 sm:gap-3 min-w-0">
          <Chart />
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3">
            {COMPARE.map((s) => (
              <CompareCard key={s} symbol={s} />
            ))}
          </div>
        </main>

        <aside className="col-span-12 lg:col-span-3 min-w-0">
          <Panel title="News Feed">
            <NewsFeed />
          </Panel>
        </aside>
      </div>
    </div>
  )
}
