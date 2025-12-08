import { Routes, Route, Link } from 'react-router-dom';
import BookList from './pages/BookList';

function App() {
  return (
    <main className="p-8 min-h-screen">
      <div>
        <nav className=''>
          <Link to="/">Books</Link> |{" "}
        </nav>

        <Routes>
          <Route path="/" element={<BookList />} />
        </Routes>

      </div>
    </main>
  );
}

export default App;
