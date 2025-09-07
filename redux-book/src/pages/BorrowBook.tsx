import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useBorrowBookMutation } from "@/features/borrowsApi";

const BorrowBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [borrowBook] = useBorrowBookMutation();

  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleBorrow = async () => {
    if (!dueDate || !returnDate) {
      alert("Please select both due date and return date");
      return;
    }

    try {
      await borrowBook({
        bookId: id!,        
        quantity,
        dueDate,
        returnDate,
      }).unwrap();

      alert("Book borrowed successfully!");
      navigate("/books"); 
    } catch (error: any) {
      console.error("Borrow failed:", error);
      alert(error?.data?.message || "Borrow failed!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Borrow Book</h1>

      <label className="block mb-2">Quantity</label>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="w-full border p-2 rounded mb-4"
      />

      <label className="block mb-2">Due Date</label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      <label className="block mb-2">Return Date</label>
      <input
        type="date"
        value={returnDate}
        onChange={(e) => setReturnDate(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      <button
        onClick={handleBorrow}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        Confirm Borrow
      </button>
    </div>
  );
};

export default BorrowBook;
