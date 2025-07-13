import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import this

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      alert("Login successful!");
      navigate("/admin-dashboard"); // ✅ Redirect to dashboard
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "100px auto", textAlign: "center" }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default AdminLogin;
