import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('');
  const [responseMessages, setResponseMessages] = useState({});

  const role = localStorage.getItem('role'); // ✅ Fetch role from local storage
  const userId = localStorage.getItem('userId'); // ✅ Fetch userId

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/requests`);
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/requests/${id}/status`, { status: newStatus });
      fetchRequests();
      alert('Status updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const handleResponseChange = (requestId, message) => {
    setResponseMessages((prev) => ({ ...prev, [requestId]: message }));
  };

  const submitResponse = async (requestId) => {
    try {
      if (!userId) {
        alert('Responder not logged in!');
        return;
      }

     await axios.post(`${process.env.REACT_APP_API_URL}/api/responses`, {
        requestId,
        responderId: userId,
        message: responseMessages[requestId]
      });

      alert('Response submitted successfully!');
      setResponseMessages((prev) => ({ ...prev, [requestId]: '' }));
    } catch (err) {
      console.error(err);
      alert('Failed to submit response.');
    }
  };

  const filteredRequests = filter
    ? requests.filter(req => req.status === filter)
    : requests;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard - Service Requests</h1>

      <div className="mb-6 text-center">
        <label className="mr-2 font-semibold">Filter by Status:</label>
        <select
          className="border p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {filteredRequests.length === 0 ? (
        <p className="text-center text-gray-600">No service requests found.</p>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {filteredRequests.map((req) => (
            <div key={req._id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">{req.title}</h2>
              <p className="mb-1"><strong>Description:</strong> {req.description}</p>
              <p className="mb-1"><strong>Category:</strong> {req.category}</p>
              <p className="mb-1"><strong>Location:</strong> {req.location}</p>
              <p className="mb-3"><strong>Status:</strong> {req.status}</p>

              {/* Status Update: Visible only for Admin */}
              {role === 'admin' && (
                <div className="mb-4">
                  <label className="mr-2">Update Status:</label>
                  <select
                    className="border p-2 rounded"
                    defaultValue={req.status}
                    onChange={(e) => updateStatus(req._id, e.target.value)}
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              )}

              {/* Response Submission: Visible only for Responder */}
              {role === 'responder' && (
                <div className="flex flex-col md:flex-row gap-2">
                  <input
                    type="text"
                    className="border p-2 flex-1 rounded"
                    placeholder="Enter your response"
                    value={responseMessages[req._id] || ''}
                    onChange={(e) => handleResponseChange(req._id, e.target.value)}
                  />
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    onClick={() => submitResponse(req._id)}
                  >
                    Submit Response
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
