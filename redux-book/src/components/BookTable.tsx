import type { Book } from "@/types/book";
import React, { useState } from "react";

interface BookTableProps {
  books: Book[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onBorrow: (bookId: string, returnDate: string) => void; 
}

const BookTable: React.FC<BookTableProps> = ({ books, onEdit, onDelete, onBorrow }) => {
  const [selectedDates, setSelectedDates] = useState<{ [key: string]: string }>({});

  const handleDateChange = (bookId: string, date: string) => {
    setSelectedDates((prev) => ({ ...prev, [bookId]: date }));
  };

  console.log(books)

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 mt-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Author</th>
            <th className="px-4 py-2 border">Available</th>
            <th className="px-4 py-2 border">copies</th>
            <th className="px-4 py-2 border">Actions</th>

          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{book.title}</td>
                <td className="px-4 py-2 border">{book.author}</td>
                <td className="px-4 py-2 border">{book.available ? "Yes" : "No"}</td>
                <td className="px-4 py-2 border">{book.copies}</td>
                <td className="px-4 py-2 border space-x-2 flex items-center">
                  <button
                    onClick={() => onEdit(book._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(book._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>

                  <input
                    type="date"
                    value={selectedDates[book._id] || ""}
                    onChange={(e) => handleDateChange(book._id, e.target.value)}
                    className="border px-2 py-1 rounded"
                  />

                  <button
                    onClick={() => {
                      const returnDate = selectedDates[book._id];
                      if (!returnDate) {
                        alert("Please select a return date first!");
                        return;
                      }
                      onBorrow(book._id, returnDate);
                    }}
                    className={`${
                      book.isBorrowed
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white px-3 py-1 rounded`}
                    disabled={book.isBorrowed}
                  >
                    {book.isBorrowed ? "Borrowed" : "Borrow"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No books found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
