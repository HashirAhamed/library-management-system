import { Routes, Route } from 'react-router-dom';
import BookList from './pages/Books';

function App() {
  return (
    <main className="p-8 min-h-screen">
      <div>

        <Routes>
          <Route path="/" element={<BookList />} />
        </Routes>

      </div>
    </main>
  );
}

export default App;
