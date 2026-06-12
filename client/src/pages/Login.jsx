import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // save token in browser
      localStorage.setItem("token", res.data.token);

      // alert("Login successful");

      // move to chat page
      navigate("/chat");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  // Modern, clean UI styling
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
        <h2 style={styles.heading}>Welcome Back</h2>

        <form onSubmit={handleLogin} style={styles.form}>
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
            Sign In
          </button>
        </form>

        <hr style={styles.divider} />

        <div style={styles.footerText}>
          Don't have an account? 
          <button onClick={() => navigate("/register")} style={styles.linkBtn}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;