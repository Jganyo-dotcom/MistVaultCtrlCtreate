import React, { useState, useContext } from "react";
import "../styles/Settings.css";
import { SettingsContext } from "../contexts/SettingsContext";
import toast from "react-hot-toast";

function Settings() {
  const { user, updateUser } = useContext(SettingsContext);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const [twoFA, setTwoFA] = useState(user?.twoFA || false);
  const [darkMode, setDarkMode] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    avatar: user?.avatar || ""
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [supportMessage, setSupportMessage] = useState("");
  const [reportMessage, setReportMessage] = useState("");

  const [errors, setErrors] = useState({});

  // ================= VALIDATION =================
  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (formData.phone.length < 10) newErrors.phone = "Invalid phone";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= SAVE PROFILE =================
  const handleSave = () => {
    if (!validate()) return;

    updateUser({ ...user, ...formData, twoFA });
    toast.success("Profile updated 🚀");
    setShowEditModal(false);
  };

  // ================= 2FA =================
  const handleToggle2FA = () => {
    setTwoFA(prev => !prev);
    toast.success(`2FA ${!twoFA ? "enabled 🔐" : "disabled"}`);
  };

  // ================= AVATAR =================
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        avatar: URL.createObjectURL(file)
      });
    }
  };

  // ================= CHANGE PASSWORD =================
  const handleChangePassword = () => {
    const { current, new: newPass, confirm } = passwordData;

    if (!current || !newPass || !confirm) {
      return toast.error("All fields required");
    }

    if (newPass.length < 6) {
      return toast.error("Min 6 characters required");
    }

    if (newPass !== confirm) {
      return toast.error("Passwords do not match");
    }

    setTimeout(() => {
      toast.success("Password changed 🔐");
      setShowPasswordModal(false);
      setPasswordData({ current: "", new: "", confirm: "" });
    }, 800);
  };

  // ================= LOGOUT ALL =================
  const handleLogoutAll = () => {
    setTimeout(() => {
      toast.success("Logged out from all devices 🚪");
    }, 700);
  };

  // ================= SUPPORT =================
  const handleSupportSubmit = () => {
    if (!supportMessage.trim()) return toast.error("Message required");

    setTimeout(() => {
      toast.success("Support message sent 🎉");
      setSupportMessage("");
      setShowSupportModal(false);
    }, 800);
  };

  const handleReportIssue = () => {
    if (!reportMessage.trim()) return toast.error("Describe issue");

    setTimeout(() => {
      toast.success("Issue reported 🚀");
      setReportMessage("");
      setShowReportModal(false);
    }, 800);
  };

  return (
    <div className={`settings-container ${darkMode ? "dark" : ""}`}>

      {/* HEADER */}
      <div className="settings-header">
        <h2>Settings</h2>
        <button onClick={() => setDarkMode(!darkMode)} className="toggle-dark">
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* PROFILE */}
      {/* <div className="settings-card">
        <div className="card-header">
          <h3>Profile</h3>
          <button onClick={() => setShowEditModal(true)}>Edit</button>
        </div>

        <div className="profile-content">
          <img
            src={formData.avatar || "https://via.placeholder.com/80"}
            alt=""
            className="avatar"
          />

          <div>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
            <p>{user?.phone}</p>
          </div>
        </div>
      </div> */}

      {/* PROFILE */}
<div className="settings-card">
  <div className="card-header">
    <h3>Profile</h3>
    <button onClick={() => setShowEditModal(true)}>Edit</button>
  </div>

  <div className="profile-content">
    <img
      src={formData.avatar || "https://via.placeholder.com/80"}
      alt=""
      className="avatar"
    />

    <div className="profile-details">

      {/* ROLE */}
      <div className="profile-role">
        {user?.role || "EMR ADMIN"}
      </div>

      {/* NAME */}
      <p>
        <span className="label">Name:</span> {user?.name}
      </p>

      {/* EMAIL */}
      <p>
        <span className="label">Email:</span> {user?.email}
      </p>

      {/* CONTACT */}
      <p>
        <span className="label">Contact:</span> {user?.phone}
      </p>

    </div>
  </div>
</div>

      {/* SECURITY */}
      <div className="settings-card">
        <h3>Security</h3>

        <div className="settings-item">
          <span>Two-Factor Authentication</span>
          <div
            className={`switch ${twoFA ? "active" : ""}`}
            onClick={handleToggle2FA}
          />
        </div>

        <div className="settings-item">
          <span>Change Password</span>
          <button onClick={() => setShowPasswordModal(true)}>Update</button>
        </div>

        <div className="settings-item">
          <span>Logout from all devices</span>
          <button onClick={handleLogoutAll}>Logout</button>
        </div>
      </div>

      {/* SUPPORT */}
      <div className="settings-card">
        <h3>Support</h3>

        <div className="settings-item">
          <span>Contact Support</span>
          <button onClick={() => setShowSupportModal(true)}>Open</button>
        </div>

        <div className="settings-item">
          <span>Support Email</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText("support@yourapp.com");
              toast.success("Email copied 📧");
            }}
          >
            Copy
          </button>
        </div>

        <div className="settings-item">
          <span>Report Issue</span>
          <button onClick={() => setShowReportModal(true)}>Report</button>
        </div>
      </div>

      {/* ================= MODALS ================= */}

      {/* EDIT PROFILE */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Profile</h2>

            <input type="file" onChange={handleAvatar} />

            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {errors.name && <span className="error">{errors.name}</span>}

            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && <span className="error">{errors.email}</span>}

            <input
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            {errors.phone && <span className="error">{errors.phone}</span>}

            <div className="modal-actions">
              <button onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className="primary" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* PASSWORD */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Change Password</h3>

            <input type="password" placeholder="Current Password"
              onChange={(e)=>setPasswordData({...passwordData,current:e.target.value})}/>

            <input type="password" placeholder="New Password"
              onChange={(e)=>setPasswordData({...passwordData,new:e.target.value})}/>

            <input type="password" placeholder="Confirm Password"
              onChange={(e)=>setPasswordData({...passwordData,confirm:e.target.value})}/>

            <div className="modal-actions">
              <button onClick={()=>setShowPasswordModal(false)}>Cancel</button>
              <button className="primary" onClick={handleChangePassword}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* SUPPORT */}
      {showSupportModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Contact Support</h3>

            <textarea
              className="textarea"
              placeholder="Describe your issue..."
              value={supportMessage}
              onChange={(e)=>setSupportMessage(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={()=>setShowSupportModal(false)}>Cancel</button>
              <button className="primary" onClick={handleSupportSubmit}>Send</button>
            </div>
          </div>
        </div>
      )}

      {/* REPORT */}
      {showReportModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Report Issue</h3>

            <textarea
              className="textarea"
              placeholder="Explain the issue..."
              value={reportMessage}
              onChange={(e)=>setReportMessage(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={()=>setShowReportModal(false)}>Cancel</button>
              <button className="primary" onClick={handleReportIssue}>Submit</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Settings;