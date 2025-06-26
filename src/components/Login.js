import { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      const user = await res.json();
      localStorage.setItem('user', JSON.stringify(user));
      onLogin(user);
    } else {
      alert('User not found');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full p-2 border rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}
