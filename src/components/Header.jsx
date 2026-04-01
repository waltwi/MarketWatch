import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/AuthContext'

const navCls = ({ isActive }) =>
  `px-2.5 py-1 rounded-md transition-colors ${
    isActive ? 'text-white bg-white/10' : 'text-mw-muted hover:text-white hover:bg-white/5'
  }`

export default function Header() {
  const [leaders, setLeaders] = useState('gainers')
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="border-b border-mw-border bg-mw-canvas/95 text-slate-100 sticky top-0 z-10 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 h-12 sm:h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-5 min-w-0">
          <Link to="/" className="text-lg sm:text-xl font-bold tracking-tight text-white shrink-0 hover:opacity-90">
            MarketWatch
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-[13px]">
            <NavLink to="/" end className={navCls}>
              All
            </NavLink>
            <NavLink to="/" className={navCls}>
              Stocks
            </NavLink>
            <NavLink to="/" className={navCls}>
              Crypto
            </NavLink>
            <NavLink to="/" className={navCls}>
              Commodities
            </NavLink>
            {isAuthenticated ? (
              <NavLink to="/dashboard" className={navCls}>
                My dashboard
              </NavLink>
            ) : null}
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div
            className="hidden sm:flex items-center rounded-lg bg-mw-surface p-0.5 border border-mw-border"
            role="group"
            aria-label="Sort movers"
          >
            <button
              type="button"
              onClick={() => setLeaders('gainers')}
              className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide rounded-md transition-colors ${
                leaders === 'gainers' ? 'bg-mw-raised text-mw-up shadow-sm' : 'text-mw-muted hover:text-slate-200'
              }`}
            >
              Gainers
            </button>
            <button
              type="button"
              onClick={() => setLeaders('losers')}
              className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide rounded-md transition-colors ${
                leaders === 'losers' ? 'bg-mw-raised text-mw-down shadow-sm' : 'text-mw-muted hover:text-slate-200'
              }`}
            >
              Losers
            </button>
          </div>
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="md:hidden px-2.5 py-1.5 rounded-lg text-[12px] font-medium border border-mw-border text-slate-200 hover:bg-white/5"
              >
                Dashboard
              </Link>
              <span className="hidden sm:inline text-[12px] text-mw-muted max-w-[140px] truncate" title={user.email}>
                {user.name}
              </span>
              <button
                type="button"
                onClick={() => {
                  logout()
                  navigate('/')
                }}
                className="px-3 py-1.5 rounded-lg text-[13px] font-medium border border-mw-border text-slate-200 hover:bg-white/5 transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-lg bg-mw-raised text-[13px] font-medium border border-mw-border hover:bg-mw-surface transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1.5 rounded-lg text-[13px] font-medium border border-mw-border text-slate-200 hover:bg-white/5 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
