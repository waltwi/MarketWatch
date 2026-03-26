import React from 'react'

export default function TickerCard({ item }) {
  const positive = item.percent >= 0
  return (
    <div className="bg-slate-800 p-3 rounded-md shadow-inner">
      <div className="flex items-baseline justify-between">
        <div className="text-lg font-semibold">{item.symbol}</div>
        <div className="text-sm text-slate-300">${item.current}</div>
      </div>
      <div className={`text-sm ${positive ? 'text-green-400' : 'text-rose-400'}`}>
        {positive ? '+' : ''}{item.percent}%
      </div>
    </div>
  )
}
