import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = ({ userId }) => {
  const [requests, setRequests] = useState([]);
  const [responses, setResponses] = useState({});
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
       const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/requests/user/${userId}`);
        setRequests(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserRequests();
  }, [userId]);

  const fetchResponses = async (requestId) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/responses/${requestId}`);
      setResponses((prev) => ({ ...prev, [requestId]: res.data.data }));
      setSelectedRequestId(requestId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">User Dashboard</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-600">No service requests found.</p>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {requests.map((req) => (
            <div key={req._id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{req.title}</h3>
              <p className="mb-2"><strong>Status:</strong> {req.status}</p>

              <button
                onClick={() => fetchResponses(req._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                View Responses
              </button>

              {selectedRequestId === req._id && responses[req._id] && responses[req._id].length > 0 && (
                <ul className="mt-4 space-y-2">
                  {responses[req._id].map((response) => (
                    <li key={response._id} className="bg-gray-100 p-2 rounded">
                      <strong>{response.responderId.name}</strong>: {response.message}
                    </li>
                  ))}
                </ul>
              )}

              {selectedRequestId === req._id && responses[req._id] && responses[req._id].length === 0 && (
                <p className="mt-4 text-gray-500">No responses yet.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
