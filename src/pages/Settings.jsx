import React, { useState } from "react";
import "../styles/Settings.css";

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Akpan Samuel",
    email: "akpan.samuel@example.com",
    phone: "+234 (0) 812 345 6789",
    department: "System Administrator",
    role: "Admin",
    joinDate: "2024-01-15",
    avatar: "👤"
  });

  const [formData, setFormData] = useState(profileData);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: "30",
    loginAlerts: true,
    ipRestriction: false
  });

  const handleProfileEdit = () => {
    setEditMode(!editMode);
    if (editMode) {
      setFormData(profileData);
    }
  };

  const handleProfileUpdate = () => {
    setProfileData(formData);
    setEditMode(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword === passwordData.confirmPassword) {
      alert("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } else {
      alert("New passwords do not match!");
    }
  };

  const handleSecurityChange = (setting) => {
    setSecuritySettings({
      ...securitySettings,
      [setting]: !securitySettings[setting]
    });
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <p className="subtitle">Manage your account and preferences</p>
      </div>

      <div className="settings-tabs">
        <button
          className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          👤 Profile
        </button>
        <button
          className={`tab-button ${activeTab === "security" ? "active" : ""}`}
          onClick={() => setActiveTab("security")}
        >
          🔒 Security
        </button>
        <button
          className={`tab-button ${activeTab === "support" ? "active" : ""}`}
          onClick={() => setActiveTab("support")}
        >
          💬 Support
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="settings-content">
          <div className="settings-card">
            <div className="card-header">
              <h2>Profile Information</h2>
              <button
                className={`edit-btn ${editMode ? "cancel" : ""}`}
                onClick={handleProfileEdit}
              >
                {editMode ? "Cancel" : "✏️ Edit"}
              </button>
            </div>

            <div className="profile-section">
              <div className="avatar-section">
                <div className="avatar">{profileData.avatar}</div>
                {editMode && (
                  <button className="change-avatar-btn">Change Avatar</button>
                )}
              </div>

              <div className="profile-fields">
                <div className="form-group">
                  <label>Full Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  ) : (
                    <p className="field-value">{profileData.fullName}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Email</label>
                  {editMode ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  ) : (
                    <p className="field-value">{profileData.email}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  {editMode ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  ) : (
                    <p className="field-value">{profileData.phone}</p>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Department</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            department: e.target.value
                          })
                        }
                      />
                    ) : (
                      <p className="field-value">{profileData.department}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Role</label>
                    <p className="field-value">{profileData.role}</p>
                  </div>
                </div>

                <div className="form-group">
                  <label>Member Since</label>
                  <p className="field-value">{profileData.joinDate}</p>
                </div>
              </div>
            </div>

            {editMode && (
              <div className="card-actions">
                <button className="btn-cancel" onClick={handleProfileEdit}>
                  Discard
                </button>
                <button className="btn-save" onClick={handleProfileUpdate}>
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="settings-content">
          <div className="settings-card">
            <h2>Security Settings</h2>

            <div className="security-section">
              <div className="security-item">
                <div className="security-info">
                  <h3>Two-Factor Authentication</h3>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={securitySettings.twoFactorAuth}
                    onChange={() => handleSecurityChange("twoFactorAuth")}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="security-item">
                <div className="security-info">
                  <h3>Login Alerts</h3>
                  <p>Get notified of new login attempts</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={securitySettings.loginAlerts}
                    onChange={() => handleSecurityChange("loginAlerts")}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="security-item">
                <div className="security-info">
                  <h3>IP Restriction</h3>
                  <p>Restrict login to specific IP addresses</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={securitySettings.ipRestriction}
                    onChange={() => handleSecurityChange("ipRestriction")}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="security-item">
                <div className="security-info">
                  <h3>Session Timeout</h3>
                  <p>Automatically log out after inactivity</p>
                </div>
                <select
                  value={securitySettings.sessionTimeout}
                  onChange={(e) =>
                    setSecuritySettings({
                      ...securitySettings,
                      sessionTimeout: e.target.value
                    })
                  }
                  className="timeout-select"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="never">Never</option>
                </select>
              </div>
            </div>
          </div>

          <div className="settings-card">
            <h2>Change Password</h2>

            <form onSubmit={handlePasswordChange} className="password-form">
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value
                    })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value
                    })
                  }
                  required
                />
              </div>

              <button type="submit" className="btn-change-password">
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Support Tab */}
      {activeTab === "support" && (
        <div className="settings-content">
          <div className="settings-card">
            <h2>Help & Support</h2>

            <div className="support-section">
              <div className="support-item">
                <div className="support-icon">📖</div>
                <div className="support-content">
                  <h3>Documentation</h3>
                  <p>
                    Access our comprehensive guides and documentation for
                    platform features
                  </p>
                  <a href="#" className="support-link">
                    View Documentation →
                  </a>
                </div>
              </div>

              <div className="support-item">
                <div className="support-icon">❓</div>
                <div className="support-content">
                  <h3>FAQ</h3>
                  <p>
                    Find answers to frequently asked questions about the
                    platform
                  </p>
                  <a href="#" className="support-link">
                    Browse FAQ →
                  </a>
                </div>
              </div>

              <div className="support-item">
                <div className="support-icon">💬</div>
                <div className="support-content">
                  <h3>Contact Support</h3>
                  <p>Get in touch with our support team for assistance</p>
                  <a href="mailto:support@mistvault.com" className="support-link">
                    Email Support →
                  </a>
                </div>
              </div>

              <div className="support-item">
                <div className="support-icon">🐛</div>
                <div className="support-content">
                  <h3>Report a Bug</h3>
                  <p>Help us improve by reporting any issues you encounter</p>
                  <a href="#" className="support-link">
                    Submit Bug Report →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="settings-card">
            <h2>System Information</h2>
            <div className="info-section">
              <div className="info-item">
                <span className="info-label">Platform Version:</span>
                <span className="info-value">1.0.0</span>
              </div>
              <div className="info-item">
                <span className="info-label">Last Updated:</span>
                <span className="info-value">2026-04-10</span>
              </div>
              <div className="info-item">
                <span className="info-label">API Status:</span>
                <span className="info-value status-ok">✓ Operational</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
