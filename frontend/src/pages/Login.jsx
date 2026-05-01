import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/login", form);
    login(res.data);
    navigate("/dashboard");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <span className="section-label">Welcome back</span>
        <h2>Sign In</h2>
        <p className="auth-sub">Enter your credentials to continue.</p>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit">Login →</button>
        </form>

        <div className="auth-footer">
          <span>No account?</span>
          <Link to="/signup">Create one</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;