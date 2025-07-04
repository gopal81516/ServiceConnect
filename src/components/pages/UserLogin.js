import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = (props) => {  
  const [formData, setFormData] = useState({ email: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login successful!');
        console.log('User logged in:', data);

        localStorage.setItem('userId', data.userId);
        localStorage.setItem('role', data.role);

        if (props.setUserId) {
          props.setUserId(data.userId);
        }

        if (data.role === 'requester') {
          navigate('/user-dashboard');
        } else {
          navigate('/admin-dashboard');
        }
      } else {
        setMessage(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">User Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
};

export default UserLogin;
