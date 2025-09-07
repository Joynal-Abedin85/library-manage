import React from "react";
import {
  useGetBooksQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useAddBookMutation,
} from "@/features/apiSlice";
import BookTable from "@/components/BookTable";
import { useBorrowBookMutation } from "@/features/borrowsApi";
import Swal from "sweetalert2";

const Books: React.FC = () => {
  const { data: books = [], isLoading, isError } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [borrowBook] = useBorrowBookMutation();
  const [addBook] = useAddBookMutation();

  // Add Book
 const handleAdd = async () => {
  const { value: title } = await Swal.fire({
    title: "Enter book title",
    input: "text",
    showCancelButton: true,
  });

  if (!title) return;

  const { value: author } = await Swal.fire({
    title: "Enter book author",
    input: "text",
    showCancelButton: true,
  });

  if (!author) return;

  const { value: copies } = await Swal.fire({
    title: "Enter number of copies",
    input: "number",
    inputAttributes: {
      min: "1",
    },
    inputValue: 1,
    showCancelButton: true,
  });

  if (!copies) return;

  try {
    await addBook({
      title,
      author,
      description: "No description",
      copies: Number(copies), // ✅ manual input থেকে convert করে number
      genre: "General",
      isbn: `ISBN-${Date.now()}`,
      available: true,
    }).unwrap();

    Swal.fire("Success!", "Book added successfully!", "success");
  } catch (error) {
    Swal.fire("Error!", "Error adding book.", "error");
  }
};


  // Edit Book
const handleEdit = async (id: string) => {
  const { value: newTitle } = await Swal.fire({
    title: "Enter new book title",
    input: "text",
    showCancelButton: true,
  });

  if (!newTitle) return;

  const { value: newAuthor } = await Swal.fire({
    title: "Enter new book author",
    input: "text",
    showCancelButton: true,
  });

  if (!newAuthor) return;

  const { value: newCopies } = await Swal.fire({
    title: "Enter number of copies",
    input: "number",
    inputAttributes: {
      min: "1",
    },
    showCancelButton: true,
  });

  if (!newCopies) return;

  try {
    await updateBook({
      id,
      data: {
        title: newTitle,
        author: newAuthor,
        copies: Number(newCopies),
      },
    }).unwrap();

    Swal.fire("Updated!", "Book updated successfully!", "success");
  } catch (error) {
    Swal.fire("Error!", "Error updating book.", "error");
  }
};


  // Delete Book
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This book will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteBook(id).unwrap();
        Swal.fire("Deleted!", "Book deleted successfully!", "success");
      } catch (error) {
        Swal.fire("Error!", "Error deleting book.", "error");
      }
    }
  };

  // Borrow Book
  const handleBorrow = async (bookId: string, returnDate: string) => {
    try {
      await borrowBook({
        bookId,
        quantity: 1,
        dueDate: new Date().toISOString(),
        returnDate: new Date(returnDate).toISOString(),
      }).unwrap();

      Swal.fire("Success!", "Book borrowed successfully!", "success");
    } catch (error: any) {
      console.error("Borrow failed:", error);
      Swal.fire("Error!", error?.data?.message || "Borrow failed!", "error");
    }
  };

  if (isLoading) return <p>Loading books...</p>;
  if (isError) return <p>Error fetching books.</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">All Books</h1>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Book
          </button>
        </div>

        <BookTable
          books={books}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onBorrow={handleBorrow}
        />
      </main>
    </div>
  );
};

export default Books;
