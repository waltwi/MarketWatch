import React from 'react'

export default function Header() {
  return (
    <header className="bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold">MarketWatch</div>
          <nav className="hidden sm:flex gap-4 text-sm text-slate-300">
            <a href="#" className="hover:text-white">All</a>
            <a href="#" className="hover:text-white">Stocks</a>
            <a href="#" className="hover:text-white">Crypto</a>
            <a href="#" className="hover:text-white">Commodities</a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-1 bg-slate-800 rounded text-sm">Sign in</button>
          <button className="px-3 py-1 border border-slate-700 rounded text-sm">Register</button>
        </div>
      </div>
    </header>
  )
}
