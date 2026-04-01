/**
 * Demo auth: users and passwords are stored in localStorage only (not for production).
 */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_CRYPTO, DEFAULT_STOCKS } from './symbols'

const USERS_KEY = 'mw_users'
const SESSION_KEY = 'mw_user'

const AuthContext = createContext(null)

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeSession(user) {
  if (!user) localStorage.removeItem(SESSION_KEY)
  else localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setUser(readSession())
    setReady(true)
  }, [])

  const login = useCallback((email, password) => {
    const normalized = email.trim().toLowerCase()
    const users = readUsers()
    const found = users.find((u) => u.email === normalized && u.password === password)
    if (!found) return { ok: false, error: 'Invalid email or password.' }
    const session = {
      email: found.email,
      name: found.name,
      stockSymbols: found.stockSymbols?.length ? found.stockSymbols : [...DEFAULT_STOCKS],
      cryptoSymbols: found.cryptoSymbols?.length ? found.cryptoSymbols : [...DEFAULT_CRYPTO],
    }
    setUser(session)
    writeSession(session)
    return { ok: true }
  }, [])

  const signup = useCallback(
    ({ name, email, password, stockSymbols, cryptoSymbols }) => {
      const normalized = email.trim().toLowerCase()
      const users = readUsers()
      if (users.some((u) => u.email === normalized)) {
        return { ok: false, error: 'That email is already registered.' }
      }
      const stocks =
        stockSymbols?.filter(Boolean).length > 0 ? [...new Set(stockSymbols)] : [...DEFAULT_STOCKS]
      const cryptos =
        cryptoSymbols?.filter(Boolean).length > 0 ? [...new Set(cryptoSymbols)] : [...DEFAULT_CRYPTO]
      const record = {
        id:
          typeof globalThis.crypto !== 'undefined' && globalThis.crypto.randomUUID
            ? globalThis.crypto.randomUUID()
            : String(Date.now()),
        name: name.trim(),
        email: normalized,
        password,
        stockSymbols: stocks,
        cryptoSymbols: cryptos,
      }
      users.push(record)
      writeUsers(users)
      const session = {
        email: record.email,
        name: record.name,
        stockSymbols: record.stockSymbols,
        cryptoSymbols: record.cryptoSymbols,
      }
      setUser(session)
      writeSession(session)
      return { ok: true }
    },
    []
  )

  const logout = useCallback(() => {
    setUser(null)
    writeSession(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      ready,
      login,
      signup,
      logout,
      isAuthenticated: Boolean(user),
    }),
    [user, ready, login, signup, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
