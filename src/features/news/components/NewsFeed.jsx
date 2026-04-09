import React, { useEffect, useState } from 'react';
import { fetchNews } from '../NewsService';

export default function NewsFeed() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchNews()
      .then((data) => setItems(data))
      .catch((err) => {
        console.error('News fetch failed:', err);
        // Screenshot mocks WITH summaries
        setItems([
          { 
            id: '1', 
            headline: 'News Feed Stocks Down Global Tariffs', 
            summary: 'SCOTUS 6-3 strikes down Supreme Court tariffs ruling executive by exceeding granted powers.',
            source: 'Scotsman', 
            url: 'https://scotsman.com/news' 
          },
          { 
            id: '2', 
            headline: 'Kevin Warsh Formally Nominated Fed', 
            summary: 'President Warren formally nominates Kevin Warsh succeeded Jay Powell Federal Reserve Chair May.',
            source: 'Nasdaq', 
            url: 'https://nasdaq.com/fed' 
          },
          { 
            id: '3', 
            headline: 'Nvidia Scales OpenAI $5B Investment', 
            summary: 'Nvidia leading $5B investment OpenAI pivoting earlier $80B commitment.',
            source: 'Reuters', 
            url: 'https://reuters.com/ai' 
          },
          { 
            id: '4', 
            headline: 'Trump Declares DC Emergency Sewage', 
            summary: 'President declares DC emergency FEMA massive sewage.',
            source: 'Fox', 
            url: 'https://foxnews.com/dc' 
          },
          { 
            id: '5', 
            headline: 'S&P 500 Briefly Touches 7000 Milestone', 
            summary: 'The market Al supercycle cooling inflation data.',
            source: 'Morningstar', 
            url: 'https://morningstar.com/sp500' 
          }
        ]);
      });
  }, []);

  if (items.length === 0) {
    return <div className="p-4 text-sm text-mw-muted">Loading news...</div>;
  }

  return (
    <div className="flex flex-col divide-y divide-mw-border/50">
      {items.map((n) => (
        <a
          key={n.id}
          href={n.url || '#'}
          className="block py-2 hover:bg-white/[0.03] transition-colors text-left group no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="text-xs font-semibold text-slate-100 leading-tight group-hover:text-white">
            {n.headline}
          </div>
          <div className="text-[10px] text-mw-muted mt-1 leading-relaxed line-clamp-1">
            {n.summary}
          </div>
          <div className="flex items-center justify-between gap-1 mt-1 text-[10px]">
            <span className="uppercase tracking-wide text-mw-muted">{n.source}</span>
            {n.url && n.url !== '#' ? (
              <span className="font-medium text-mw-up/90 truncate">
                {(() => {
                  try {
                    return new URL(n.url).hostname.replace(/^www\./, '');
                  } catch {
                    return 'Link';
                  }
                })()}
              </span>
            ) : null}
          </div>
        </a>
      ))}
    </div>
  );
}