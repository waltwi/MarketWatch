import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen bg-mw-canvas text-slate-100 flex flex-col antialiased">
      <Header />
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-3 sm:px-4 py-4 sm:py-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
