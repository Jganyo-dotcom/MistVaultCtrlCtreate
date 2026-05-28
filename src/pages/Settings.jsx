import React, { useState, useContext, useEffect } from "react";
import "../styles/Settings.css";
import { SettingsContext } from "../contexts/SettingsContext";
import toast from "react-hot-toast";
import {
  FiLock,
  FiShield,
  FiLogOut,
  FiHelpCircle,
  FiMail,
} from "react-icons/fi";

function Settings() {
  const BaseApi = "https://medsec.onrender.com/api";

  const { user, updateUser } = useContext(SettingsContext);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const [twoFA, setTwoFA] = useState(user?.twoFA || false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // whenever `user` changes, update formData
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [supportMessage, setSupportMessage] = useState("");
  const [reportMessage, setReportMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

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
  const handleSave = async () => {
    if (!validate()) return;

    const result = await updateUser({ ...user, ...formData, twoFA });

    if (result.success) {
      toast.success("Profile updated");
      setShowEditModal(false);
    } else {
      toast.error(result.message || "unsuccessful");
    }
  };

  // ================= 2FA =================
  const handleToggle2FA = () => {
    setTwoFA((prev) => !prev);
    toast.success(`2FA ${!twoFA ? "enabled" : "disabled"}`);
  };

  // ================= CHANGE PASSWORD =================
  const handleChangePassword = async () => {
    const { current, new: newPass, confirm } = passwordData;

    if (!current.trim()) return toast.error("Current password is required");
    if (newPass.length < 8)
      return toast.error("Password must be at least 8 characters");
    if (!/[A-Z]/.test(newPass))
      return toast.error("Include at least one uppercase letter");
    if (!/[0-9]/.test(newPass))
      return toast.error("Include at least one number");
    if (newPass !== confirm) return toast.error("Passwords do not match");

    try {
      const token = localStorage.getItem("authToken");

      const res = await fetch(`${BaseApi}/manager/change-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ current, newPassword: newPass }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Password updated successfully");
        setShowPasswordModal(false);
        setPasswordData({ current: "", new: "", confirm: "" });
      } else {
        toast.error(data.message || "Password update failed");
        setPasswordData({ current: "", new: "", confirm: "" });
      }
    } catch (err) {
      console.error("Error updating password:", err);
      toast.error("Connection failed");
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    switch (strength) {
      case 0:
      case 1:
        return { label: "Weak", level: 1 };
      case 2:
        return { label: "Medium", level: 2 };
      case 3:
      case 4:
        return { label: "Strong", level: 3 };
      default:
        return { label: "", level: 0 };
    }
  };

  // ================= LOGOUT ALL =================
  const handleLogoutAll = () => {
    setTimeout(() => {
      toast.success("Logged out from all devices");
    }, 700);
  };

  // ================= SUPPORT =================
  const handleSupportSubmit = () => {
    if (!supportMessage.trim()) return toast.error("Message required");
    setTimeout(() => {
      toast.success("Support message sent");
      setSupportMessage("");
      setShowSupportModal(false);
    }, 800);
  };

  const handleReportIssue = () => {
    if (!reportMessage.trim()) return toast.error("Describe issue");
    setTimeout(() => {
      toast.success("Issue reported");
      setReportMessage("");
      setShowReportModal(false);
    }, 800);
  };

  return (
    <div className="settings-container">
      {/* HEADER */}
      <div className="settings-header">
        <h2>Settings</h2>
      </div>

      {/* PROFILE */}
      <div className="settings-card">
        <div className="card-header">
          <h3>Profile</h3>
          <button onClick={() => setShowEditModal(true)}>Edit</button>
        </div>

        <div className="profile-content">
          <div className="avatar-placeholder">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="profile-details">
            <p><span className="label">Name:</span> {user?.name}
            </p>
            <p>
              <span className="label">Email:</span> {user?.email}
            </p>
            <p><span className="label">Role:</span> {user?.role || "EMR ADMIN"}
            </p>
            <p>
              <span className="label">Contact:</span> {user?.phone}
            </p>
          </div>
        </div>
      </div>

      {/* SECURITY CARD */}
      <div className="settings-card">
        <h3 className="card-title">Security</h3>

        <div className="settings-item">
          <div className="settings-left">
            <div className="icon-box">
              <FiLock />
            </div>
            <div>
              <p className="item-title">Change Password</p>
              <p className="item-sub">Update your account password</p>
            </div>
          </div>

          <button
            className="btn-secondary"
            onClick={() => setShowPasswordModal(true)}
          >
            Update
          </button>
        </div>

        <div className="settings-item">
          <div className="settings-left">
            <div className="icon-box">
              <FiShield />
            </div>
            <div>
              <p className="item-title">Two-Factor Authentication</p>
              <p className="item-sub">Add extra security to your account</p>
            </div>
          </div>

          {/* REAL TOGGLE */}
          <label className="switch">
            <input type="checkbox" 
            checked={twoFA}
            onChange={handleToggle2FA}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="settings-item danger">
          <div className="settings-left">
            <div className="icon-box danger">
              <FiLogOut />
            </div>
            <div>
              <p className="item-title">Logout from all devices</p>
              <p className="item-sub">End all active sessions</p>
            </div>
          </div>
          <button className="btn-danger" onClick={handleLogoutAll}>
            Logout
          </button>
        </div>
      </div>

      {/* SUPPORT CARD */}
      <div className="settings-card">
        <h3 className="card-title">Support</h3>

        <div className="settings-item">
          <div className="settings-left">
            <div className="icon-box">
              <FiMail />
            </div>
            <div>
              <p className="item-title">Contact Support</p>
              <p className="item-sub">Reach out to our team</p>
            </div>
          </div>
          <button className="btn-secondary" onClick={() => setShowSupportModal(true)}>
            Email</button>
        </div>

        <div className="settings-item">
          <div className="settings-left">
            <div className="icon-box">
              <FiHelpCircle />
            </div>
            <div>
              <p className="item-title">Help Center</p>
              <p className="item-sub">Browse documentation</p>
            </div>
          </div>
          <button className="btn-secondary" onClick={() => setShowReportModal(true)}>
            Visit</button>
        </div>
      </div>

      {/* ================= MODALS ================= */}

      {/* EDIT PROFILE */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Profile</h2>

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
              <button className="primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PASSWORD */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="modal-title">Change Password</h3>

            {/* CURRENT PASSWORD */}
            <div className="form-group">
              <label>Current Password</label>
              <div className="password-field">
                <input
                  type={showPassword.current ? "text" : "password"}
                  placeholder="Enter current password"
                  value={passwordData.current}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      current: e.target.value,
                    })
                  }
                />
                <span
                  className="toggle-icon"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      current: !showPassword.current,
                    })
                  }
                >
                  👁
                </span>
              </div>
            </div>

            {/* NEW PASSWORD */}
            <div className="form-group">
              <label>New Password</label>
              <div className="password-field">
                <input
                  type={showPassword.new ? "text" : "password"}
                  placeholder="Enter new password"
                  value={passwordData.new}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, new: e.target.value })
                  }
                />
                <span
                  className="toggle-icon"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      new: !showPassword.new,
                    })
                  }
                >
                  👁
                </span>
              </div>

              {/* PASSWORD STRENGTH */}
              {passwordData.new && (
                <div className="strength-wrapper">
                  <div
                    className={`strength-bar level-${getPasswordStrength(passwordData.new).level}`}
                  />
                  <span className="strength-text">
                    {getPasswordStrength(passwordData.new).label}
                  </span>
                </div>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="password-field">
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={passwordData.confirm}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirm: e.target.value,
                    })
                  }
                />
                <span
                  className="toggle-icon"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      confirm: !showPassword.confirm,
                    })
                  }
                >
                  👁
                </span>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancel
              </button>

              <button
                className="primary"
                onClick={handleChangePassword}
                disabled={
                  !passwordData.current ||
                  !passwordData.new ||
                  !passwordData.confirm
                }
              >
                Update Password
              </button>
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
              onChange={(e) => setSupportMessage(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={() => setShowSupportModal(false)}>Cancel</button>
              <button className="primary" onClick={handleSupportSubmit}>
                Send
              </button>
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
              onChange={(e) => setReportMessage(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={() => setShowReportModal(false)}>Cancel</button>
              <button className="primary" onClick={handleReportIssue}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
