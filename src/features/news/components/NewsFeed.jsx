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
    <div className="space-y-3">
      {items.map((n) => (
        <a key={n.id} href={n.url || '#'} className="block bg-slate-800 p-3 rounded-md hover:bg-slate-700">
          <div className="text-sm font-semibold text-slate-100">{n.headline}</div>
          <div className="text-xs text-slate-400">{n.source}</div>
        </a>
      ))}
    </div>
  )
}
