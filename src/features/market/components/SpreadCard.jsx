import React from 'react'

export default function SpreadCard({ symbol = 'SYM', name = '', price = '--', percent = 0 }) {
  const positive = percent >= 0
  return (
    <div className="p-4 rounded-md border border-slate-700 bg-slate-800 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{symbol}</div>
          <div className={`text-sm ${positive ? 'text-green-400' : 'text-rose-400'}`}>{positive ? '+' : ''}{percent}%</div>
        </div>
        {name && <div className="text-sm text-slate-300 mt-1">{name}</div>}
      </div>
      <div className="mt-4 text-right">
        <div className="text-sm text-slate-300">Stock</div>
        <div className="text-xl font-semibold">${price}</div>
      </div>
    </div>
  )
}
