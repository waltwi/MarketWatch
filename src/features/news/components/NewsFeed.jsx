import React, { useEffect, useState } from 'react'
import { fetchNews } from '../NewsService'

export default function NewsFeed() {
  const [items, setItems] = useState([])

  useEffect(() => {
    let mounted = true
    fetchNews().then((data) => mounted && setItems(data)).catch(() => {})
    return () => { mounted = false }
  }, [])

  return (
    <div className="flex flex-col divide-y divide-mw-border/50 -my-0.5">
      {items.map((n) => (
        <a
          key={n.id}
          href={n.url || '#'}
          className="block py-3 first:pt-2 last:pb-2 rounded-lg -mx-1 px-1 hover:bg-white/[0.03] transition-colors text-left group"
        >
          <div className="text-[13px] font-semibold text-slate-100 leading-snug group-hover:text-white">
            {n.headline}
          </div>
          {n.summary ? (
            <div className="text-[11px] text-mw-muted mt-1.5 leading-relaxed line-clamp-2">{n.summary}</div>
          ) : null}
          <div className="flex items-center justify-between gap-2 mt-2">
            <span className="text-[10px] uppercase tracking-wide text-mw-muted">{n.source}</span>
            {n.url && n.url !== '#' ? (
              <span className="text-[10px] font-medium text-mw-up/90 truncate max-w-[55%]">
                {(() => {
                  try {
                    return new URL(n.url).hostname.replace(/^www\./, '')
                  } catch {
                    return 'Link'
                  }
                })()}
              </span>
            ) : null}
          </div>
        </a>
      ))}
    </div>
  )
}
