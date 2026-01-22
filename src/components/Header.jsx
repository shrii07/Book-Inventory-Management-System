import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-600 shadow-2xl border-b-4 border-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="text-2xl group-hover:scale-110 transition-transform">📚</div>
            <div>
              <h1 className="text-xl font-bold text-white drop-shadow-lg">Book Inventory</h1>
              <p className="text-blue-100 text-xs font-semibold hidden sm:block">Manage Your Collection</p>
            </div>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-blue-100 font-semibold transition-colors text-sm flex items-center gap-1">
              <span>🏠</span>
              <span>Home</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
