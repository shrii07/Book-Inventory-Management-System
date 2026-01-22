import axios from 'axios'

// API endpoint for fetching books
const API_BASE_URL = 'https://freetestapi.com/api/v1/books'
const STORAGE_KEY = 'bookInventory'

// Helper to get local books from localStorage
const getLocalBooks = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error reading localStorage:', error)
    return []
  }
}

// Helper to save local books to localStorage
const saveLocalBooks = (books) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

// Helper to generate unique ID
const generateId = () => {
  return '_' + Math.random().toString(36).substr(2, 9) + Date.now()
}

const bookService = {
  // Fetch all books (API + localStorage)
  getAllBooks: async () => {
    try {
      const response = await axios.get(API_BASE_URL)
      let apiBooks = Array.isArray(response.data) ? response.data : []
      const localBooks = getLocalBooks()
      
      // Combine API books with locally added books
      return [...apiBooks, ...localBooks]
    } catch (error) {
      console.error('Error fetching books from API:', error)
      // If API fails, return only local books
      return getLocalBooks()
    }
  },

  // Fetch a single book by ID
  getBookById: async (id) => {
    try {
      // First check local storage
      const localBooks = getLocalBooks()
      const localBook = localBooks.find(b => b.id === id)
      if (localBook) return localBook

      // If not in local, try API
      const response = await axios.get(`${API_BASE_URL}/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching book:', error)
      throw error
    }
  },

  // Add a new book (saves to localStorage)
  addBook: async (bookData) => {
    try {
      const newBook = {
        ...bookData,
        id: generateId()
      }
      const localBooks = getLocalBooks()
      localBooks.push(newBook)
      saveLocalBooks(localBooks)
      return newBook
    } catch (error) {
      console.error('Error adding book:', error)
      throw error
    }
  },

  // Update a book (updates in localStorage)
  updateBook: async (id, bookData) => {
    try {
      const localBooks = getLocalBooks()
      const bookIndex = localBooks.findIndex(b => b.id === id)
      
      if (bookIndex !== -1) {
        localBooks[bookIndex] = { ...bookData, id }
        saveLocalBooks(localBooks)
        return localBooks[bookIndex]
      }
      
      throw new Error('Book not found')
    } catch (error) {
      console.error('Error updating book:', error)
      throw error
    }
  },

  // Delete a book (removes from localStorage)
  deleteBook: async (id) => {
    try {
      const localBooks = getLocalBooks()
      const filteredBooks = localBooks.filter(b => b.id !== id)
      saveLocalBooks(filteredBooks)
      return { success: true }
    } catch (error) {
      console.error('Error deleting book:', error)
      throw error
    }
  }
}

export default bookService
