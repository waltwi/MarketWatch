import React, { useState } from 'react'
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import { useAuth } from '../features/auth/AuthContext'

export default function LoginPage() {
  const { login, user, ready } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (ready && user) {
    return <Navigate to="/dashboard" replace />
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password) {
      setError('Enter your email and password.')
      return
    }
    setSubmitting(true)
    const res = login(email.trim(), password)
    setSubmitting(false)
    if (!res.ok) {
      setError(res.error)
      return
    }
    navigate(from === '/login' ? '/dashboard' : from, { replace: true })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-8">
      <AuthCard
        title="Sign in"
        subtitle="Welcome back. Use the account you created to open your personal dashboard."
        footer={
          <>
            No account?{' '}
            <Link to="/signup" className="text-mw-up font-medium hover:underline">
              Create one
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error ? (
            <div
              role="alert"
              className="rounded-lg border border-mw-down/40 bg-mw-down/10 px-3 py-2 text-[13px] text-rose-200"
            >
              {error}
            </div>
          ) : null}
          <div>
            <label htmlFor="login-email" className="block text-[11px] font-semibold uppercase tracking-wider text-mw-muted mb-1.5">
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-mw-border bg-mw-canvas px-3 py-2.5 text-[14px] text-white placeholder:text-mw-muted/70 outline-none focus:border-mw-up/50 focus:ring-1 focus:ring-mw-up/30 transition-shadow"
              placeholder="you@company.com"
            />
          </div>
          <div>
            <label
              htmlFor="login-password"
              className="block text-[11px] font-semibold uppercase tracking-wider text-mw-muted mb-1.5"
            >
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-mw-border bg-mw-canvas px-3 py-2.5 text-[14px] text-white placeholder:text-mw-muted/70 outline-none focus:border-mw-up/50 focus:ring-1 focus:ring-mw-up/30 transition-shadow"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-mw-up text-mw-canvas font-semibold text-[14px] py-2.5 hover:brightness-110 active:brightness-95 disabled:opacity-60 transition-all"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </AuthCard>
    </div>
  )
}
