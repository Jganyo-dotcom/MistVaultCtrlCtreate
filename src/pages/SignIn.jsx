import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authenticated") === "true") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    localStorage.setItem("authenticated", "true");
    navigate("/dashboard");
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <form onSubmit={handleSubmit}>
          <h2 className="title">Sign In</h2>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p className="forgot-password">Forgot password?</p>

          <button type="submit" className="signin-btn">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;