import React, { useState } from 'react'

export default function Header() {
  const [leaders, setLeaders] = useState('gainers')

  return (
    <header className="border-b border-mw-border bg-mw-canvas/95 text-slate-100 sticky top-0 z-10 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 h-12 sm:h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-5 min-w-0">
          <div className="text-lg sm:text-xl font-bold tracking-tight text-white shrink-0">MarketWatch</div>
          <nav className="hidden md:flex items-center gap-1 text-[13px] text-mw-muted">
            <a href="#" className="px-2.5 py-1 rounded-md hover:text-white hover:bg-white/5 transition-colors">
              All
            </a>
            <a href="#" className="px-2.5 py-1 rounded-md hover:text-white hover:bg-white/5 transition-colors">
              Stocks
            </a>
            <a href="#" className="px-2.5 py-1 rounded-md hover:text-white hover:bg-white/5 transition-colors">
              Crypto
            </a>
            <a href="#" className="px-2.5 py-1 rounded-md hover:text-white hover:bg-white/5 transition-colors">
              Commodities
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div
            className="hidden sm:flex items-center rounded-lg bg-mw-surface p-0.5 border border-mw-border"
            role="group"
            aria-label="Sort movers"
          >
            <button
              type="button"
              onClick={() => setLeaders('gainers')}
              className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide rounded-md transition-colors ${
                leaders === 'gainers' ? 'bg-mw-raised text-mw-up shadow-sm' : 'text-mw-muted hover:text-slate-200'
              }`}
            >
              Gainers
            </button>
            <button
              type="button"
              onClick={() => setLeaders('losers')}
              className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide rounded-md transition-colors ${
                leaders === 'losers' ? 'bg-mw-raised text-mw-down shadow-sm' : 'text-mw-muted hover:text-slate-200'
              }`}
            >
              Losers
            </button>
          </div>
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg bg-mw-raised text-[13px] font-medium border border-mw-border hover:bg-mw-surface transition-colors"
          >
            Sign in
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg text-[13px] font-medium border border-mw-border text-slate-200 hover:bg-white/5 transition-colors"
          >
            Register
          </button>
        </div>
      </div>
    </header>
  )
}
