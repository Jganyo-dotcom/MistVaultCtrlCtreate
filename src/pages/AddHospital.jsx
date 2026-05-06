import React, { useState, useContext } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HospitalContext } from "../contexts/HospitalContext";
import "../styles/AddHospital.css";

const isValidPhone = (val) => {
  const digits = val.replace(/\D/g, "");
  return digits.length === 10;
};

// Validation rules
const VALIDATIONS = {
  name: (val) => val.trim() !== "" ? "" : "Hospital name is required",
  email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? "" : "Valid email required",
  contact: (val) => val === "" || isValidPhone(val) ? "" : "Valid phone required",
  address: (val) => val.trim() !== "" ? "" : "Address is required",
  city: (val) => val.trim() !== "" ? "" : "City is required",
  state: (val) => val.trim() !== "" ? "" : "State is required",
  postalCode: (val) => val.trim() !== "" ? "" : "Postal code is required",
  representative: (val) => val.trim() !== "" ? "" : "Representative name is required",
  repEmail: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? "" : "Valid email r``````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````equired",
  repContact: (val) => val === "" || isValidPhone(val) ? "" : "Valid phone required"
};

export function AddHospital() {
  const navigate = useNavigate();
  const { addHospital } = useContext(HospitalContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    representative: "",
    repEmail: "",
    repContact: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field if it becomes valid
    if (errors[name]) {
      const error = VALIDATIONS[name]?.(value) || "";
      setErrors((prev) => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(VALIDATIONS).forEach((field) => {
      const error = VALIDATIONS[field](formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      showToast("Please fix errors before submitting");
      return;
    }

    setLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      representative: formData.representative,
      location: `${formData.address}, ${formData.city}, ${formData.state} ${formData.postalCode}`,
      website: "",
      departments: 0,
      staff: 0,
      engagement: 0,
      status: "active"
    };

    try {
      const response = await fetch("/hospitals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Failed to create hospital");

      const createdHospital = await response.json();
      addHospital(createdHospital);
      showToast("Hospital registered successfully!");
      setTimeout(() => navigate(`/hospitals/${createdHospital.id}`), 1500);
    } catch (error) {
      showToast("Failed to register hospital");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-hospital-page">
      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}

      {/* BACK BUTTON */}
      <div className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} />
        <span>BACK</span>
      </div>

      <div className="form-card">
        <h1 className="title">Register New Hospital</h1>

        <form onSubmit={handleSubmit}>

          {/* HOSPITAL INFO */}
          <div className="section">
            <h2>Hospital Information<span>*</span></h2>

            <Input 
              label="Hospital Name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange}
              error={errors.name}
            />

            <div className="grid-2">
              <Input 
                label="Official Email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                error={errors.email}
              />
              <Input 
                label="Official Contact" 
                name="contact" 
                value={formData.contact} 
                onChange={handleChange}
                error={errors.contact}
              />
            </div>

            <Input 
              label="Address" 
              name="address" 
              value={formData.address} 
              onChange={handleChange}
              error={errors.address}
              heading
            />

            <div className="grid-3">
              <Input 
                label="City" 
                name="city" 
                value={formData.city} 
                onChange={handleChange}
                error={errors.city}
              />
              <Input 
                label="State" 
                name="state" 
                value={formData.state} 
                onChange={handleChange}
                error={errors.state}
              />
              <Input 
                label="Postal Code" 
                name="postalCode" 
                value={formData.postalCode} 
                onChange={handleChange}
                error={errors.postalCode}
              />
            </div>
          </div>

          {/* REPRESENTATIVE */}
          <div className="section">
            <h2>Representative Information<span>*</span></h2>

            <Input 
              label="Full Name" 
              name="representative" 
              value={formData.representative} 
              onChange={handleChange}
              error={errors.representative}
            />

            <div className="grid-2">
              <Input 
                label="Email" 
                name="repEmail" 
                value={formData.repEmail} 
                onChange={handleChange}
                error={errors.repEmail}
              />
              <Input 
                label="Contact" 
                name="repContact" 
                value={formData.repContact} 
                onChange={handleChange}
                error={errors.repContact}
              />
            </div>
          </div>

          <div className="submit-wrapper">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

const Input = ({ label, name, value, onChange, error, heading }) => (
  <div className={`input-group ${error ? "has-error" : ""}`}>
    <label htmlFor={name} className={heading ? "field-heading" : undefined}>
      {label}
    </label>
    <input 
      id={name}
      name={name} 
      value={value} 
      onChange={onChange}
      className={error ? "invalid" : ""}
    />
    {error && <span className="error-text">{error}</span>}
  </div>
);