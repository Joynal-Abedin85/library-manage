
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Books from './pages/Books';
import CreateBook from './pages/CreateBook';
import EditBook from './pages/EditBook';
import BorrowBook from './pages/BorrowBook';
import BorrowSummary from './pages/BorrowSummary';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto p-4">
          <Routes>
             <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/create-book" element={<CreateBook />} />
            <Route path="/edit/:id" element={<EditBook />} />
            <Route path="/borrow/:bookId" element={<BorrowBook />} />
            <Route path="/borrow-summary" element={<BorrowSummary />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
