# Book Inventory Management System

A modern React + Vite web application for managing a collection of books with full CRUD (Create, Read, Update, Delete) operations.

## Features

✅ **Landing Page/Home Page** - Displays all books in a responsive table format
✅ **Book Details Page** - Click on any book to view complete details
✅ **API Integration** - Dynamically fetches book data from an API
✅ **CRUD Operations** - Create, Read, Update, Delete books with modal form
✅ **Data Validation** - Comprehensive validation for all fields:
   - Email validation
   - Integer validation for pages, year
   - String validation with length checks
   - ISBN validation (10 or 13 digits)
   - Real-time error messages

✅ **Responsive Design** - Works on desktop, tablet, and mobile devices
✅ **Scrollable Pages** - All pages have proper scrolling for content overflow
✅ **Interactive Modal** - Modal form for adding/editing books
✅ **Success/Error Messages** - User-friendly feedback for all operations
✅ **Sticky Header** - Navigation header remains visible while scrolling

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Header.css
│   ├── BookTable.jsx
│   ├── BookTable.css
│   ├── BookForm.jsx
│   └── BookForm.css
├── pages/
│   ├── HomePage.jsx
│   ├── HomePage.css
│   ├── BookDetailsPage.jsx
│   └── BookDetailsPage.css
├── services/
│   └── bookService.js
├── utils/
│   └── validation.js
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## Installation

1. **Navigate to the project directory:**
   ```bash
   cd "Book Inventory Management System"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will open automatically at http://localhost:3000

4. **Build for production:**
   ```bash
   npm run build
   ```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build

## Technologies Used

- **React 18** - UI library
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Styling with responsive design

## API Integration

The application uses a mock API endpoint:
```
https://freetestapi.com/api/v1/books
```

To use your own backend API, update the `API_BASE_URL` in [src/services/bookService.js](src/services/bookService.js).

## Validation Rules

### Title
- Required
- 1-255 characters

### Author
- Required
- 1-255 characters

### Publisher
- Required
- 1-255 characters

### Publication Year
- Optional
- Must be a valid year (1000 to current year)
- Integer value only

### Pages
- Required
- Must be a positive integer

### ISBN
- Optional
- Must be 10 or 13 digits (with or without hyphens)

### Description
- Optional
- Maximum 2000 characters

## Usage

### Adding a Book
1. Click the "+ Add New Book" button on the home page
2. Fill in the required fields
3. Click "Add Book" to save

### Editing a Book
1. Click the "Edit" button in the book's row
2. Modify the details
3. Click "Update Book" to save

### Deleting a Book
1. Click the "Delete" button in the book's row
2. Confirm the deletion

### Viewing Book Details
1. Click on any book title in the table
2. View the complete book information on the details page

## Responsive Breakpoints

- **Desktop** - Full layout with all features visible
- **Tablet** (max-width: 1024px) - Adjusted grid layout
- **Mobile** (max-width: 768px) - Single column layout

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available for use.
