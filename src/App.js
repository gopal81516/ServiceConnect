import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserLogin from "./components/pages/UserLogin";
import UserRegister from "./components/pages/UserRegister";
import AdminLogin from "./components/pages/AdminLogin";
import UserDashboard from "./components/pages/UserDashboard";
import AdminDashboard from "./components/pages/AdminDashboard";
import Navbar from "./components/pages/Navbar"; // ✅ Import Navbar

function App() {
  const [userId, setUserId] = useState(null);

  const handleLogout = () => {
    setUserId(null);
    window.location.href = "/user-login"; // Redirect to login page
  };

  return (
    <Router>
      <Navbar userId={userId} handleLogout={handleLogout} /> {/* ✅ Show Navbar on all pages */}
      <Routes>
        <Route path="/" element={<UserLogin setUserId={setUserId} />} />
        <Route path="/user-login" element={<UserLogin setUserId={setUserId} />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/user-dashboard" element={<UserDashboard userId={userId} />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
