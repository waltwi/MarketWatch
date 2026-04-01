import React from 'react'

export default function Panel({ children, className = '', title, action }) {
  return (
    <div
      className={`rounded-xl border border-mw-border bg-mw-raised/90 shadow-card backdrop-blur-sm ${className}`}
    >
      {(title || action) && (
        <div className="flex items-center justify-between gap-2 px-3.5 pt-3.5 pb-2 border-b border-mw-border/80">
          {title && (
            <div className="text-[11px] font-semibold uppercase tracking-wider text-mw-muted">{title}</div>
          )}
          {action}
        </div>
      )}
      <div className={`p-3.5 ${title || action ? 'pt-3' : ''}`}>{children}</div>
    </div>
  )
}
