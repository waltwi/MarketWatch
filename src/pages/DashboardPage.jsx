import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Chart from '../components/Chart'
import ListRow from '../components/ListRow'
import Panel from '../components/Panel'
import SpreadCard from '../features/market/components/SpreadCard'
import { fetchBulkQuotes } from '../features/market/MarketService'
import { useAuth } from '../features/auth/AuthContext'
import { CRYPTO_CHOICES, STOCK_CHOICES, shortCryptoLabel } from '../features/auth/symbols'

function nameForSymbol(symbol, kind) {
  if (kind === 'stock') {
    return STOCK_CHOICES.find((s) => s.symbol === symbol)?.name || ''
  }
  return CRYPTO_CHOICES.find((s) => s.symbol === symbol)?.name || ''
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [quotes, setQuotes] = useState([])

  const stockSet = useMemo(() => new Set(user?.stockSymbols || []), [user])
  const cryptoSet = useMemo(() => new Set(user?.cryptoSymbols || []), [user])

  const symbols = useMemo(
    () => [...(user?.stockSymbols || []), ...(user?.cryptoSymbols || [])],
    [user]
  )

  useEffect(() => {
    let mounted = true
    if (!symbols.length) return undefined
    fetchBulkQuotes(symbols)
      .then((res) => mounted && setQuotes(res))
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [symbols])

  const { stockRows, cryptoRows } = useMemo(() => {
    const stocks = []
    const cryptos = []
    for (const q of quotes) {
      if (stockSet.has(q.symbol)) stocks.push(q)
      else if (cryptoSet.has(q.symbol)) cryptos.push(q)
    }
    return { stockRows: stocks, cryptoRows: cryptos }
  }, [quotes, stockSet, cryptoSet])

  const orderedCards = useMemo(() => {
    const list = []
    for (const s of user?.stockSymbols || []) {
      const q = quotes.find((x) => x.symbol === s)
      if (q)
        list.push({
          key: s,
          kind: 'stock',
          symbol: s,
          name: nameForSymbol(s, 'stock'),
          price: q.current,
          percent: q.percent,
        })
    }
    for (const s of user?.cryptoSymbols || []) {
      const q = quotes.find((x) => x.symbol === s)
      if (q)
        list.push({
          key: s,
          kind: 'crypto',
          symbol: s,
          displaySymbol: shortCryptoLabel(s),
          name: nameForSymbol(s, 'crypto'),
          price: q.current,
          percent: q.percent,
        })
    }
    return list
  }, [quotes, user])

  if (!user) return null

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl border border-mw-border bg-mw-raised/60 shadow-card px-4 py-3 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-mw-muted">Your dashboard</p>
          <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
            Hi, {user.name}
            <span className="text-mw-muted font-normal text-[14px] sm:text-[15px]"> — markets you follow</span>
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg border border-mw-border bg-mw-canvas px-3 py-2 text-[13px] font-medium text-slate-200 hover:bg-white/5 transition-colors"
          >
            Public overview
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-2 sm:gap-3">
        {orderedCards.map((c) => (
          <div key={c.key} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
            <SpreadCard
              symbol={c.symbol}
              displaySymbol={c.displaySymbol}
              name={c.name}
              price={c.price}
              percent={c.percent}
              kind={c.kind}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-2 sm:gap-3 items-start">
        <aside className="col-span-12 lg:col-span-3 flex flex-col gap-2 sm:gap-3">
          <Panel title="Your stocks">
            <div className="divide-y divide-mw-border/50 -my-0.5">
              {stockRows.length ? (
                stockRows.map((w) => (
                  <ListRow
                    key={w.symbol}
                    symbol={w.symbol}
                    mid={w.current != null ? `$${Number(w.current).toFixed(2)}` : '—'}
                    percent={w.percent}
                  />
                ))
              ) : (
                <p className="text-[12px] text-mw-muted py-2">Loading or no symbols…</p>
              )}
            </div>
          </Panel>
        </aside>

        <main className="col-span-12 lg:col-span-6 flex flex-col gap-2 sm:gap-3 min-w-0">
          <Chart
            title="Your watchlist chart"
            subtitle="Sample OHLC series for the dashboard. Connect live data per symbol when your API plan allows."
          />
        </main>

        <aside className="col-span-12 lg:col-span-3 min-w-0">
          <Panel title="Your crypto">
            <div className="divide-y divide-mw-border/50 -my-0.5">
              {cryptoRows.length ? (
                cryptoRows.map((w) => (
                  <ListRow
                    key={w.symbol}
                    symbol={shortCryptoLabel(w.symbol)}
                    mid={w.current != null ? `$${Number(w.current).toFixed(2)}` : '—'}
                    percent={w.percent}
                  />
                ))
              ) : (
                <p className="text-[12px] text-mw-muted py-2">Loading or no pairs…</p>
              )}
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  )
}
