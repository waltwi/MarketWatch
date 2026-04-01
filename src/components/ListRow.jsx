import React from 'react'

export default function ListRow({ symbol, mid, percent, dense }) {
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
