import React from 'react'

function fmtPrice(v) {
  if (v === null || v === undefined || v === '' || Number.isNaN(Number(v))) return '—'
  const n = Number(v)
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function SpreadCard({
  symbol = 'SYM',
  displaySymbol,
  name = '',
  price = '--',
  percent = 0,
  kind = 'stock',
}) {
  const p = typeof percent === 'number' ? percent : Number(percent)
  const positive = Number.isFinite(p) ? p >= 0 : true
  const headline = displaySymbol || symbol
  const sub =
    name ||
    (kind === 'crypto' ? 'Crypto' : kind === 'stock' ? 'Equity' : '')
  return (
    <div className="h-full rounded-xl border border-mw-border bg-mw-raised/90 shadow-card px-3.5 py-3 flex flex-col gap-2 min-h-[88px]">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">{headline}</div>
          {sub ? <div className="text-[12px] text-mw-muted truncate mt-0.5">{sub}</div> : null}
        </div>
        <div
          className={`text-sm font-semibold tabular-nums shrink-0 ${
            Number.isFinite(p) ? (positive ? 'text-mw-up' : 'text-mw-down') : 'text-mw-muted'
          }`}
        >
          {Number.isFinite(p) ? `${positive ? '+' : ''}${p.toFixed(2)}%` : '—'}
        </div>
      </div>
      <div className="flex items-end justify-end mt-auto pt-1 border-t border-mw-border/60">
        <div className="text-base sm:text-lg font-semibold tabular-nums text-slate-100">${fmtPrice(price)}</div>
      </div>
    </div>
  )
}
