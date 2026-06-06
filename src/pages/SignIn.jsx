import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react"; // Imported Loader2 for a sleek look
import toast from "react-hot-toast"; // Integrated unified toast messages
import logo from "../assets/logo.jpeg";
import "../styles/SignIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state variable
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authenticated") === "true") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true); // Trigger loading animation immediately

    try {
      //const BaseApi = "http://127.0.0.1:4444/api";
      const BaseApi = "https://medsec.onrender.com/api";
      const response = await fetch(`${BaseApi}/login-manager`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // ensures cookies/JWT are sent
      });

      const data = await response.json();

      if (response.ok) {
        // Save token or flag
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("authenticated", "true");
        localStorage.setItem("username", data.manager?.name || "Manager");

        toast.success("Welcome back! Signing in... 🎉");

        // Brief timeout gives the toast a second to breathe before redirecting
        setTimeout(() => {
          navigate("/dashboard");
        }, 800);
      } else {
        toast.error(data.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Connection failed. Server could be sleeping.");
    } finally {
      setLoading(false); // Stop loader regardless of success or failure
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <form onSubmit={handleSubmit}>
          {/* LOGO */}
          <div className="logo-wrapper">
            <img src={logo} alt="MIST logo" className="logo-img" />
          </div>

          <div className="form-group">
            {/* <label>Email Address</label> */}
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="eye-btn"
                disabled={loading}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <p className="forgot-password">Forgot password?</p>

          <button type="submit" className="signin-btn" disabled={loading}>
            {loading ? (
              <div className="btn-loader-content">
                <Loader2 size={18} className="spinner" />
                <span>Authenticating...</span>
              </div>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
