import React, { useState, useEffect } from 'react'
import BookTable from '../components/BookTable'
import BookForm from '../components/BookForm'
import bookService from '../services/bookService'

function HomePage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await bookService.getAllBooks()
      setBooks(Array.isArray(data) ? data : [])
    } catch (err) {
      setError('Failed to load books. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddClick = () => {
    setEditingBook(null)
    setShowForm(true)
    setSuccessMessage('')
  }

  const handleEditClick = (book) => {
    setEditingBook(book)
    setShowForm(true)
    setSuccessMessage('')
  }

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookService.deleteBook(id)
        setBooks(books.filter(book => book.id !== id))
        setSuccessMessage('✓ Book deleted successfully!')
        setTimeout(() => setSuccessMessage(''), 3000)
      } catch (err) {
        setError('Failed to delete book. Please try again.')
        console.error(err)
      }
    }
  }

  const handleFormSubmit = async (formData) => {
    try {
      if (editingBook) {
        await bookService.updateBook(editingBook.id, formData)
        setBooks(books.map(book =>
          book.id === editingBook.id ? { ...formData, id: editingBook.id } : book
        ))
        setSuccessMessage('✓ Book updated successfully!')
      } else {
        const newBook = await bookService.addBook(formData)
        setBooks([...books, newBook])
        setSuccessMessage('✓ Book added successfully!')
      }
      setShowForm(false)
      setEditingBook(null)
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      setError('Failed to save book. Please try again.')
      console.error(err)
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingBook(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
            <div className="space-y-2">
              <h2 className="text-5xl font-black text-gray-900 drop-shadow-sm">📖 Book Inventory</h2>
              <p className="text-gray-600 text-lg font-semibold">Manage and organize your book collection effortlessly</p>
            </div>
            <button
              onClick={handleAddClick}
              className="btn-primary flex items-center space-x-2 whitespace-nowrap text-lg"
            >
              <span className="text-2xl">➕</span>
              <span>Add New Book</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card p-6 text-center">
              <div className="text-4xl font-black text-blue-600">{books.length}</div>
              <p className="text-gray-600 font-semibold mt-2">Total Books</p>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-black text-green-600">✓</div>
              <p className="text-gray-600 font-semibold mt-2">All Managed</p>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-black text-indigo-600">⭐</div>
              <p className="text-gray-600 font-semibold mt-2">Ready to Explore</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="success-alert">
            <span>✅</span>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="error-alert">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Books Table */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
              </div>
              <p className="text-gray-600 text-xl font-bold">Loading your books...</p>
            </div>
          </div>
        ) : books.length === 0 ? (
          <div className="card p-16 text-center">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-500 text-2xl font-bold">No books yet!</p>
            <p className="text-gray-400 mt-2">Click the button above to add your first book</p>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <BookTable
              books={books}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </div>
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-indigo-200">
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-6 border-b-2 border-indigo-300 flex justify-between items-center">
              <h3 className="text-2xl font-black text-white">
                {editingBook ? '✏️ Edit Book' : '📝 Add New Book'}
              </h3>
              <button
                onClick={handleCloseForm}
                className="text-white hover:bg-white hover:text-indigo-600 text-3xl w-10 h-10 flex items-center justify-center rounded-full transition-all"
              >
                ✕
              </button>
            </div>
            <div className="p-8">
              <BookForm
                initialData={editingBook}
                onSubmit={handleFormSubmit}
                onCancel={handleCloseForm}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage
