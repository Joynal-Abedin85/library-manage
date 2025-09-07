import React, { useEffect, useState } from "react";
import axios from "axios";

interface BorrowedBook {
  _id: string;
  title: string;
  borrower: string;
  returnDate: string;
}

const BorrowSummary: React.FC = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/borrows"); 
        setBorrowedBooks(response.data);
      } catch (err) {
        setError("Failed to fetch borrowed books");
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowedBooks();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">Borrow Summary</h1>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          {loading ? (
            <p>Loading borrowed books...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : borrowedBooks.length === 0 ? (
            <p>No borrowed books yet.</p>
          ) : (
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Borrower</th>
                  <th className="border p-2">Return Date</th>
                </tr>
              </thead>
              <tbody>
                {borrowedBooks.map((books) => (
                  <tr key={books._id}>
                    <td className="border p-2">{books?.book?.isbn}</td>
                    <td className="border text-green-700 p-2">{books?.book?.title}</td>
                    <td className="border p-2">{books?.book?.author}</td>
                    <td className="border p-2">{books?.returnDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
      
    </div>
  );
};

export default BorrowSummary;
