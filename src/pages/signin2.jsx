import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import logo from "../assets/mist-icon.png";
import "../styles/SignIn.css";
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

function SignIn2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fromLanding = location.state?.fromLanding === true;

    if (localStorage.getItem("authenticated") === "true" && !fromLanding) {
        const role = localStorage.getItem("role")
        if(role ==='IT ADMIN' ){
            navigate("/iTdashboard", { replace: true });
        }
         if(role ==='staff' ){
            navigate("/iTdashboard", { replace: true });
        }else{
            toast.error("Your first warning has been issued");
            localStorage.removeItem("authToken")
            localStorage.removeItem("authenticated")
            localStorage.removeItem("username")
            localStorage.removeItem("role")
            navigate("/signinStaff")

        }
    }
  }, [navigate, location.state]);

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
      const response = await fetch(`${BaseApi}/accountStaff/login-it-Admin/staffMember`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // ensures cookies/JWT are sent
      });

      const data = await response.json();

      if (response.ok) {
        // Save token or flag
        if(data.person.role === 'IT ADMIN'){
            toast.success("Welcome back! Signing in IT ADMIN 🎉");
        setTimeout(() => {
          navigate("/iTdashboard");
        }, 800);
        }
        if(data.person.role === 'staff'){
            toast.success("Welcome back! Signing in IT ADMIN 🎉");
        setTimeout(() => {
          navigate("/iTdashboard");
        }, 800);
        }
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("authenticated", "true");
        localStorage.setItem("username", data.person?.name);
        localStorage.setItem("role", data.person?.role);
      } else {
        toast.error(data.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Connection failed. Server could be sleeping.");
    }
    finally {
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
        </form >
      </div >    </div >
  );
}

export default SignIn2;

