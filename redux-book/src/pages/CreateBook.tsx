import React, { useState } from "react";
import { useAddBookMutation } from "@/features/booksApi";
import Swal from "sweetalert2";

const CreateBook: React.FC = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [copies, setCopies] = useState<number>(1);

  const [addBook, { isLoading, isError, isSuccess }] = useAddBookMutation();



const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await addBook({
      title,
      author,
      description,
      genre: "General",
      isbn: `ISBN-${Date.now()}`,
      copies,
      available: copies > 0,
    }).unwrap();

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Book created successfully!",
      showConfirmButton: false,
      timer: 2000,
    });

    setTitle("");
    setAuthor("");
    setDescription("");
    setCopies(1);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to create book!",
    });
    console.error(error);
  }
};


  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">Create Book</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
        >
          <div className="mb-4">
            <label className="block mb-2 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Copies</label>
            <input
              type="number"
              value={copies}
              onChange={(e) => setCopies(Number(e.target.value))}
              className="w-full border rounded px-3 py-2"
              min={1}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? "Creating..." : "Create Book"}
          </button>

          {isSuccess && <p className="text-green-600 mt-3">Book created successfully!</p>}
          {isError && <p className="text-red-600 mt-3">Error creating book!</p>}
        </form>
      </main>
      
    </div>
  );
};

export default CreateBook;
