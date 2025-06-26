import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EngineerView from './components/EngineerView';
import Header from './components/Header';
import { useState, useEffect } from 'react';
import EngineerSearch from './components/EngineerSearch';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (!user) return <Login onLogin={setUser} />;

  return (
    <Router>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            user.role === 'manager' ? (
              <Dashboard />
            ) : (
              <EngineerView user={user} />
            )
          }
        />
        <Route path="/search-engineers" element={<EngineerSearch />} />
      </Routes>
    </Router>
  );
}
