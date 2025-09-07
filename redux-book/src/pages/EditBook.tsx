import React, { useState } from "react";
import { useParams } from "react-router-dom";

const EditBook: React.FC = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("Sample Book");
  const [author, setAuthor] = useState("Sample Author");
  const [description, setDescription] = useState("Sample description");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Book Updated: ${title} by ${author}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Book - ID: {id}</h1>
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
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save Changes
          </button>
        </form>
      </main>
      
    </div>
  );
};

export default EditBook;
