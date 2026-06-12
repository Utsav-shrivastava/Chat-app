import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        username,
        email,
        password,
      });

      alert("Registration successful");

      // after signup go to login
      navigate("/");

    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  // Modern, clean UI styling matching the Login page
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f4f7f6",
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      padding: "20px",
    },
    card: {
      backgroundColor: "#ffffff",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
      width: "100%",
      maxWidth: "400px",
      boxSizing: "border-box",
    },
    heading: {
      margin: "0 0 24px 0",
      color: "#333333",
      fontSize: "28px",
      fontWeight: "600",
      textAlign: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      borderRadius: "8px",
      border: "1px solid #dcdcdc",
      fontSize: "15px",
      outline: "none",
      transition: "border-color 0.2s",
      boxSizing: "border-box",
    },
    submitBtn: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#007bff",
      color: "#ffffff",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
      marginTop: "8px",
    },
    divider: {
      margin: "24px 0 16px 0",
      border: "0",
      borderTop: "1px solid #eeeeee",
    },
    footerText: {
      textAlign: "center",
      fontSize: "14px",
      color: "#666666",
    },
    linkBtn: {
      background: "none",
      border: "none",
      color: "#007bff",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      padding: "0",
      textDecoration: "underline",
      marginLeft: "5px",
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Create Account</h2>

        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.submitBtn}>
            Register
          </button>
        </form>

        <hr style={styles.divider} />

        <div style={styles.footerText}>
          Already have an account? 
          <button onClick={() => navigate("/")} style={styles.linkBtn}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;