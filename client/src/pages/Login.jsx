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

      alert("Login successful");

      // move to chat page
      navigate("/chat");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (

    < div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Login</button>

       
      </form>
      <button onClick={() => navigate("/register")}>
  Go to Register
</button>
    </div>
  );
}

export default Login;