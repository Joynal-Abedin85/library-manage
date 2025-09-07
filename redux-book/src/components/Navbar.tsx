import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">📚 Library System</h1>
      <div className="flex space-x-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/books" className="hover:underline">Books</Link>
        <Link to="/create-book" className="hover:underline">Add Book</Link>
        <Link to="/borrow-summary" className="hover:underline">Borrow Summary</Link>
      </div>
    </nav>
  );
};

export default Navbar;
