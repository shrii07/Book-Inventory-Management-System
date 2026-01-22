import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import bookService from '../services/bookService'

function BookDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBookDetails()
  }, [id])

  const fetchBookDetails = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await bookService.getBookById(id)
      setBook(data)
    } catch (err) {
      setError('Failed to load book details. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-200 border-t-indigo-600"></div>
          </div>
          <p className="text-gray-600 text-2xl font-bold">Loading book details...</p>
        </div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate('/')}
            className="btn-secondary mb-6 flex items-center space-x-2"
          >
            <span>←</span>
            <span>Back to Home</span>
          </button>
          {error && <div className="error-alert"><span>⚠️</span><span>{error}</span></div>}
          {!book && <div className="text-center text-gray-600 text-xl">Book not found.</div>}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="btn-secondary mb-8 flex items-center space-x-2 font-bold text-lg"
        >
          <span>←</span>
          <span>Back to Library</span>
        </button>

        <div className="card overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12">
            {/* Book Cover */}
            <div className="md:col-span-1">
              <div className="sticky top-24 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl p-8 flex items-center justify-center h-96 md:h-[500px] border-4 border-indigo-300 shadow-xl">
                <div className="text-center space-y-4">
                  <div className="text-9xl animate-bounce">📖</div>
                  <p className="text-gray-700 font-bold text-center line-clamp-3">{book.title}</p>
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className="md:col-span-2 space-y-8 max-h-screen overflow-y-auto pr-4">
              <div className="space-y-2">
                <h1 className="text-5xl font-black text-gray-900 drop-shadow-sm">{book.title}</h1>
                <p className="text-indigo-600 font-bold text-lg">A must-read book in your library</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="card p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <label className="block text-sm font-black text-gray-700 mb-2 flex items-center gap-2">
                    <span>✍️</span>
                    AUTHOR
                  </label>
                  <p className="text-2xl font-bold text-gray-900">{book.author}</p>
                </div>

                <div className="card p-6 bg-gradient-to-br from-green-50 to-emerald-50">
                  <label className="block text-sm font-black text-gray-700 mb-2 flex items-center gap-2">
                    <span>🏢</span>
                    PUBLISHER
                  </label>
                  <p className="text-2xl font-bold text-gray-900">{book.publisher}</p>
                </div>

                <div className="card p-6 bg-gradient-to-br from-yellow-50 to-orange-50">
                  <label className="block text-sm font-black text-gray-700 mb-2 flex items-center gap-2">
                    <span>📅</span>
                    PUBLICATION YEAR
                  </label>
                  <p className="text-2xl font-bold text-gray-900">{book.publication_year || 'N/A'}</p>
                </div>

                <div className="card p-6 bg-gradient-to-br from-pink-50 to-rose-50">
                  <label className="block text-sm font-black text-gray-700 mb-2 flex items-center gap-2">
                    <span>📄</span>
                    PAGES
                  </label>
                  <p className="text-2xl font-bold text-gray-900">{book.pages || 'N/A'} pages</p>
                </div>

                {book.isbn && (
                  <div className="card p-6 bg-gradient-to-br from-purple-50 to-pink-50 sm:col-span-2">
                    <label className="block text-sm font-black text-gray-700 mb-2 flex items-center gap-2">
                      <span>🔢</span>
                      ISBN
                    </label>
                    <p className="text-2xl font-bold text-gray-900 font-mono">{book.isbn}</p>
                  </div>
                )}

                {book.language && (
                  <div className="card p-6 bg-gradient-to-br from-cyan-50 to-blue-50">
                    <label className="block text-sm font-black text-gray-700 mb-2 flex items-center gap-2">
                      <span>🌍</span>
                      LANGUAGE
                    </label>
                    <p className="text-2xl font-bold text-gray-900">{book.language}</p>
                  </div>
                )}
              </div>

              {book.description && (
                <div className="card p-8 bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200">
                  <label className="block text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                    <span>💬</span>
                    DESCRIPTION
                  </label>
                  <p className="text-gray-700 leading-relaxed text-lg">{book.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetailsPage
