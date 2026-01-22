// Validation utilities with proper data type checking

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateInteger = (value) => {
  return Number.isInteger(Number(value)) && value !== ''
}

export const validatePositiveInteger = (value) => {
  const num = Number(value)
  return Number.isInteger(num) && num > 0
}

export const validateString = (value, minLength = 1, maxLength = 255) => {
  return typeof value === 'string' && 
         value.trim().length >= minLength && 
         value.trim().length <= maxLength
}

export const validateYear = (value) => {
  const year = Number(value)
  const currentYear = new Date().getFullYear()
  return Number.isInteger(year) && year >= 1000 && year <= currentYear
}

export const validateISBN = (isbn) => {
  // Remove hyphens and spaces
  const cleanISBN = isbn.replace(/[-\s]/g, '')
  // ISBN-10 or ISBN-13
  return /^(\d{10}|\d{13})$/.test(cleanISBN)
}

export const validateBookForm = (formData) => {
  const errors = {}

  // Title validation
  if (!validateString(formData.title, 1, 255)) {
    errors.title = 'Title is required and must be between 1-255 characters'
  }

  // Author validation
  if (!validateString(formData.author, 1, 255)) {
    errors.author = 'Author is required and must be between 1-255 characters'
  }

  // Published year validation
  if (formData.publication_year && !validateYear(formData.publication_year)) {
    errors.publication_year = 'Publication year must be a valid year (1000-current year)'
  }

  // Publisher validation
  if (!validateString(formData.publisher, 1, 255)) {
    errors.publisher = 'Publisher is required and must be between 1-255 characters'
  }

  // Pages validation
  if (!validatePositiveInteger(formData.pages)) {
    errors.pages = 'Pages must be a positive integer'
  }

  // ISBN validation (optional but if provided, must be valid)
  if (formData.isbn && !validateISBN(formData.isbn)) {
    errors.isbn = 'ISBN must be 10 or 13 digits'
  }

  // Description validation (optional)
  if (formData.description && !validateString(formData.description, 0, 2000)) {
    errors.description = 'Description must not exceed 2000 characters'
  }

  return errors
}
