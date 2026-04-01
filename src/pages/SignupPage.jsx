import React, { useMemo, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/AuthContext'
import { CRYPTO_CHOICES, DEFAULT_CRYPTO, DEFAULT_STOCKS, STOCK_CHOICES } from '../features/auth/symbols'

function ToggleChip({ active, onClick, label, sub }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-lg border px-3 py-2 transition-all ${
        active
          ? 'border-mw-up/50 bg-mw-up/10 text-white ring-1 ring-mw-up/25'
          : 'border-mw-border bg-mw-canvas/80 text-mw-muted hover:border-mw-border hover:text-slate-200'
      }`}
    >
      <div className="text-[13px] font-semibold">{label}</div>
      {sub ? <div className="text-[11px] text-mw-muted mt-0.5">{sub}</div> : null}
    </button>
  )
}

export default function SignupPage() {
  const { signup, user, ready } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [stocks, setStocks] = useState(() => new Set(DEFAULT_STOCKS))
  const [cryptos, setCryptos] = useState(() => new Set(DEFAULT_CRYPTO))
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const emailOk = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()), [email])

  if (ready && user) {
    return <Navigate to="/dashboard" replace />
  }

  function toggleSet(prev, key) {
    const next = new Set(prev)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    return next
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }
    if (!emailOk) {
      setError('Enter a valid email address.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (stocks.size === 0) {
      setError('Pick at least one stock to follow.')
      return
    }
    if (cryptos.size === 0) {
      setError('Pick at least one crypto pair.')
      return
    }
    setSubmitting(true)
    const res = signup({
      name: name.trim(),
      email: email.trim(),
      password,
      stockSymbols: Array.from(stocks),
      cryptoSymbols: Array.from(cryptos),
    })
    setSubmitting(false)
    if (!res.ok) {
      setError(res.error)
      return
    }
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 min-h-[calc(100vh-8rem)]">
      <div className="w-full max-w-[520px] mx-auto">
        <div className="rounded-2xl border border-mw-border bg-mw-raised/90 shadow-card backdrop-blur-sm overflow-hidden">
          <div className="px-6 pt-7 pb-1">
            <h1 className="text-xl font-bold tracking-tight text-white">Create account</h1>
            <p className="text-[13px] text-mw-muted mt-1.5 leading-relaxed">
              Choose the stocks and crypto you care about—we&apos;ll personalize your dashboard and charts.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
            {error ? (
              <div
                role="alert"
                className="rounded-lg border border-mw-down/40 bg-mw-down/10 px-3 py-2 text-[13px] text-rose-200"
              >
                {error}
              </div>
            ) : null}

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="su-name" className="block text-[11px] font-semibold uppercase tracking-wider text-mw-muted mb-1.5">
                  Full name
                </label>
                <input
                  id="su-name"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-mw-border bg-mw-canvas px-3 py-2.5 text-[14px] text-white outline-none focus:border-mw-up/50 focus:ring-1 focus:ring-mw-up/30"
                  placeholder="Alex Morgan"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="su-email" className="block text-[11px] font-semibold uppercase tracking-wider text-mw-muted mb-1.5">
                  Email
                </label>
                <input
                  id="su-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-mw-border bg-mw-canvas px-3 py-2.5 text-[14px] text-white outline-none focus:border-mw-up/50 focus:ring-1 focus:ring-mw-up/30"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="su-pass" className="block text-[11px] font-semibold uppercase tracking-wider text-mw-muted mb-1.5">
                  Password
                </label>
                <input
                  id="su-pass"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-mw-border bg-mw-canvas px-3 py-2.5 text-[14px] text-white outline-none focus:border-mw-up/50 focus:ring-1 focus:ring-mw-up/30"
                  placeholder="8+ characters"
                />
              </div>
              <div>
                <label
                  htmlFor="su-confirm"
                  className="block text-[11px] font-semibold uppercase tracking-wider text-mw-muted mb-1.5"
                >
                  Confirm
                </label>
                <input
                  id="su-confirm"
                  name="confirm"
                  type="password"
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full rounded-lg border border-mw-border bg-mw-canvas px-3 py-2.5 text-[14px] text-white outline-none focus:border-mw-up/50 focus:ring-1 focus:ring-mw-up/30"
                  placeholder="Repeat password"
                />
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-mw-muted mb-2">Stocks to track</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {STOCK_CHOICES.map(({ symbol, name: n }) => (
                  <ToggleChip
                    key={symbol}
                    active={stocks.has(symbol)}
                    onClick={() => setStocks((s) => toggleSet(s, symbol))}
                    label={symbol}
                    sub={n}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-mw-muted mb-2">Crypto to track</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CRYPTO_CHOICES.map(({ symbol, name: n }) => (
                  <ToggleChip
                    key={symbol}
                    active={cryptos.has(symbol)}
                    onClick={() => setCryptos((c) => toggleSet(c, symbol))}
                    label={symbol.split(':')[1]?.replace('USDT', '') || symbol}
                    sub={n}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-mw-up text-mw-canvas font-semibold text-[14px] py-2.5 hover:brightness-110 active:brightness-95 disabled:opacity-60 transition-all"
            >
              {submitting ? 'Creating account…' : 'Create account & open dashboard'}
            </button>
          </form>

          <div className="px-6 py-4 border-t border-mw-border bg-mw-surface/40 text-center text-[13px] text-mw-muted">
            Already have an account?{' '}
            <Link to="/login" className="text-mw-up font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
