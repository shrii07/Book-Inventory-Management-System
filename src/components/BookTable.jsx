import React from 'react'
import { Link } from 'react-router-dom'

function BookTable({ books, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-indigo-600 to-blue-600 border-b-4 border-indigo-800">
          <tr>
            <th className="px-6 py-5 text-left text-sm font-black text-white uppercase tracking-wider">📖 Title</th>
            <th className="px-6 py-5 text-left text-sm font-black text-white uppercase tracking-wider hidden md:table-cell">✍️ Author</th>
            <th className="px-6 py-5 text-left text-sm font-black text-white uppercase tracking-wider hidden lg:table-cell">🏢 Publisher</th>
            <th className="px-6 py-5 text-center text-sm font-black text-white uppercase tracking-wider hidden sm:table-cell">📅 Year</th>
            <th className="px-6 py-5 text-center text-sm font-black text-white uppercase tracking-wider hidden md:table-cell">📄 Pages</th>
            <th className="px-6 py-5 text-center text-sm font-black text-white uppercase tracking-wider">⚙️ Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-gray-200">
          {books.map((book, index) => (
            <tr key={book.id} className="table-row bg-white hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 hover:shadow-md transition-all duration-200">
              <td className="px-6 py-5">
                <Link
                  to={`/book/${book.id}`}
                  className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline text-lg decoration-2 underline-offset-2 flex items-center gap-2"
                >
                  <span className="text-xl">📕</span>
                  <span className="line-clamp-2">{book.title}</span>
                </Link>
              </td>
              <td className="px-6 py-5 text-gray-700 font-semibold hidden md:table-cell">{book.author}</td>
              <td className="px-6 py-5 text-gray-700 font-semibold hidden lg:table-cell">{book.publisher}</td>
              <td className="px-6 py-5 text-center text-gray-700 font-bold hidden sm:table-cell bg-blue-50 rounded">
                <span className="badge bg-blue-100 text-blue-700">{book.publication_year || 'N/A'}</span>
              </td>
              <td className="px-6 py-5 text-center text-gray-700 font-bold hidden md:table-cell bg-green-50 rounded">
                <span className="badge bg-green-100 text-green-700">{book.pages || 'N/A'} pages</span>
              </td>
              <td className="px-6 py-5">
                <div className="flex justify-center gap-3 flex-wrap">
                  <button
                    onClick={() => onEdit(book)}
                    className="btn-secondary px-4 py-2 text-sm rounded-lg hover:scale-105 transition-transform"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => onDelete(book.id)}
                    className="btn-danger px-4 py-2 text-sm rounded-lg hover:scale-105 transition-transform"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BookTable
