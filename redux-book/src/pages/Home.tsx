import { BookOpen, Library, Users, ClipboardList } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen  ">
      {/* Banner Section */}
      <section className="w-screen relative h-[600px] bottom-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to the Library Management System 📚
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Easily manage books, track borrowing, and organize your digital
          library in one place.
        </p>
        <div className="mt-10 ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7PaGAlhHgxMpMw11iCWc-kq8ZM4o1Gwsw4w&s"
            alt="Library Illustration"
            className="mx-auto w-[500px]"
          />
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <Library className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Manage Books</h3>
            <p className="text-gray-600">
              Add, edit, and remove books with ease and keep your library
              organized.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <BookOpen className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Borrow & Return</h3>
            <p className="text-gray-600">
              Borrow books and return them seamlessly with real-time updates.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <Users className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">User Friendly</h3>
            <p className="text-gray-600">
              Simple and clean UI for both students and librarians.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <ClipboardList className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Track Records</h3>
            <p className="text-gray-600">
              Keep track of borrowed books, due dates, and availability easily.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
