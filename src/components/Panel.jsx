import React from 'react'

export default function Panel({ children, className = '', title }) {
  return (
    <div className={`bg-slate-800 p-4 rounded-md border border-slate-700 ${className}`}>
      {title && <div className="text-sm text-slate-300 mb-2 font-semibold">{title}</div>}
      {children}
    </div>
  )
}
