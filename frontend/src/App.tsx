import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import BookList from './pages/Books';
import LoginPage from './pages/LoginPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }


  return (
    <main className="p-8 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto">


        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-red-50 transition border border-red-100"
          >
            Logout
          </button>
        </div>

        <Routes>
          <Route path="/" element={<BookList />} />
        </Routes>

      </div>
    </main>
  );
}

export default App;