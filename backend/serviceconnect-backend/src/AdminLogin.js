import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        email,
        password,
      });

      if (response.data.success) {
        alert('Login successful!');
        localStorage.setItem('adminEmail', email); // Optional session tracking
        navigate('/admin-dashboard'); // ✅ Redirect to dashboard
      } else {
        alert('Invalid credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
