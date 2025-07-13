import React from "react";
import { Link } from "react-router-dom";

function Navbar({ userId, handleLogout }) {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.title}>ServiceConnect</h2>
      <div style={styles.links}>
        {userId && (
          <Link to="/user-dashboard" style={styles.link}>
            User Dashboard
          </Link>
        )}
        <Link to="/admin-dashboard" style={styles.link}>
          Admin Dashboard
        </Link>
        {!userId && (
          <>
            <Link to="/user-login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </>
        )}
        {userId && (
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    padding: "10px 20px",
  },
  title: {
    color: "#fff",
    margin: 0,
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
  },
  logoutButton: {
    padding: "5px 10px",
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default Navbar;
