import React, { useState } from 'react';
const API_URL = process.env.REACT_APP_API_URL;
const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'requester'
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Registration successful!');
        console.log('User Registered:', data);
      } else {
        setMessage(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">User Registration</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            name="role"
            onChange={handleChange}
            required
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="requester">Requester</option>
            <option value="responder">Responder</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-green-600">{message}</p>
      </div>
    </div>
  );
};

export default UserRegister;
