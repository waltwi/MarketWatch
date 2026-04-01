import React from 'react'

export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div className="w-full max-w-[420px] mx-auto">
      <div className="rounded-2xl border border-mw-border bg-mw-raised/90 shadow-card backdrop-blur-sm overflow-hidden">
        <div className="px-6 pt-7 pb-1">
          <h1 className="text-xl font-bold tracking-tight text-white">{title}</h1>
          {subtitle ? <p className="text-[13px] text-mw-muted mt-1.5 leading-relaxed">{subtitle}</p> : null}
        </div>
        <div className="px-6 py-6">{children}</div>
        {footer ? (
          <div className="px-6 py-4 border-t border-mw-border bg-mw-surface/40 text-center text-[13px] text-mw-muted">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  )
}
