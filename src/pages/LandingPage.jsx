import React, { useEffect, useState } from 'react'
import { fetchBulkQuotes } from '../features/market/MarketService'
import TickerCard from '../features/market/components/TickerCard'
import SpreadCard from '../features/market/components/SpreadCard'
import Panel from '../components/Panel'
import Chart from '../components/Chart'
import NewsFeed from '../features/news/components/NewsFeed'

const TOP_SYMBOLS = ['FSLY', 'DHX', 'VAL', 'RNG', 'TNDM']
const WATCHLIST = ['AAPL', 'TSLA', 'NVDA', 'INTC']

export default function LandingPage() {
  const [topTickers, setTopTickers] = useState([])
  const [watch, setWatch] = useState([])

  useEffect(() => {
    let mounted = true
    fetchBulkQuotes(TOP_SYMBOLS).then((res) => mounted && setTopTickers(res)).catch(() => {})
    fetchBulkQuotes(WATCHLIST).then((res) => mounted && setWatch(res)).catch(() => {})
    return () => { mounted = false }
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-4">
        {topTickers.map((t, i) => (
          <div key={t.symbol || i} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2">
            <SpreadCard symbol={t.symbol} name={t.name || ''} price={t.current} percent={t.percent} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <aside className="col-span-3 space-y-4">
          <Panel title="Assets">
            <div className="space-y-2">
              {watch.map((w) => (
                <div key={w.symbol} className="flex justify-between text-sm text-slate-300">
                  <div>{w.symbol}</div>
                  <div className={`font-medium ${w.percent>=0? 'text-green-400':'text-rose-400'}`}>${w.current}</div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Watchlist">{/* placeholder, can be expanded */}</Panel>
        </aside>

        <main className="col-span-6">
          <Chart />
          <div className="mt-4 grid grid-cols-4 gap-4">
            {/* Compare cards - simplified */}
            {['AVGO', 'INTC', 'ORCL', 'ADBE'].map((s) => (
              <div key={s} className="bg-slate-800 p-4 rounded-md text-left">
                <div className="text-lg font-semibold">{s}</div>
                <div className="text-xs text-slate-400 mt-2">Price</div>
                <div className="font-medium mt-1">$—</div>
              </div>
            ))}
          </div>
        </main>

        <aside className="col-span-3">
          <Panel title="News Feed">
            <NewsFeed />
          </Panel>
        </aside>
      </div>
    </div>
  )
}
