import { Routes, Route, Link } from 'react-router-dom';
import BookList from './pages/BookList';

function App(){
  return (
    <div>
      <nav>
        <Link to="/">Books</Link> |{" "}
      </nav>

      <Routes>
        <Route path="/" element={<BookList />} />
      </Routes>
      
    </div>
  );
}

export default App;
