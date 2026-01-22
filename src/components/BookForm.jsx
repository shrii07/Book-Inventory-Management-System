import React, { useState } from 'react'
import { validateBookForm } from '../utils/validation'

function BookForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    author: '',
    publisher: '',
    publication_year: new Date().getFullYear(),
    pages: '',
    isbn: '',
    description: '',
    language: ''
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const allFields = Object.keys(formData)
    setTouched(allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}))

    const newErrors = validateBookForm(formData)
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData)
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span>📖</span>
          Title <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter book title"
          className={`input-field ${errors.title && touched.title ? 'input-error' : ''}`}
        />
        {errors.title && touched.title && <p className="error-text">❌ {errors.title}</p>}
      </div>

      {/* Author */}
      <div>
        <label className="block text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span>✍️</span>
          Author <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter author name"
          className={`input-field ${errors.author && touched.author ? 'input-error' : ''}`}
        />
        {errors.author && touched.author && <p className="error-text">❌ {errors.author}</p>}
      </div>

      {/* Publisher and Year */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span>🏢</span>
            Publisher <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter publisher name"
            className={`input-field ${errors.publisher && touched.publisher ? 'input-error' : ''}`}
          />
          {errors.publisher && touched.publisher && <p className="error-text">❌ {errors.publisher}</p>}
        </div>

        <div>
          <label className="block text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span>📅</span>
            Publication Year
          </label>
          <input
            type="number"
            name="publication_year"
            value={formData.publication_year}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g., 2024"
            className={`input-field ${errors.publication_year && touched.publication_year ? 'input-error' : ''}`}
          />
          {errors.publication_year && touched.publication_year && <p className="error-text">❌ {errors.publication_year}</p>}
        </div>
      </div>

      {/* Pages and ISBN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span>📄</span>
            Pages <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            name="pages"
            value={formData.pages}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g., 300"
            className={`input-field ${errors.pages && touched.pages ? 'input-error' : ''}`}
          />
          {errors.pages && touched.pages && <p className="error-text">❌ {errors.pages}</p>}
        </div>

        <div>
          <label className="block text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span>🔢</span>
            ISBN
          </label>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g., 978-0-123456-78-9"
            className={`input-field ${errors.isbn && touched.isbn ? 'input-error' : ''}`}
          />
          {errors.isbn && touched.isbn && <p className="error-text">❌ {errors.isbn}</p>}
        </div>
      </div>

      {/* Language */}
      <div>
        <label className="block text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span>🌍</span>
          Language
        </label>
        <input
          type="text"
          name="language"
          value={formData.language}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g., English"
          className="input-field"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span>💬</span>
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter book description"
          rows="5"
          className={`input-field resize-none ${errors.description && touched.description ? 'input-error' : ''}`}
        />
        {errors.description && touched.description && <p className="error-text">❌ {errors.description}</p>}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-6 border-t-2 border-gray-200">
        <button type="submit" className="btn-primary flex-1 text-lg">
          {initialData ? '✅ Update Book' : '➕ Add Book'}
        </button>
        <button type="button" onClick={onCancel} className="btn-cancel flex-1 text-lg">
          ❌ Cancel
        </button>
      </div>
    </form>
  )
}

export default BookForm
