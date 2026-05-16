import React, { useState, useContext } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HospitalContext } from "../contexts/HospitalContext";
import "../styles/AddHospital.css";

const COUNTRY_CODES = [
  { code: "+93",  flag: "🇦🇫", name: "" },
  { code: "+355", flag: "🇦🇱", name: "" },
  { code: "+213", flag: "🇩🇿", name: "" },
  { code: "+376", flag: "🇦🇩", name: "" },
  { code: "+244", flag: "🇦🇴", name: "" },
  { code: "+54",  flag: "🇦🇷", name: "" },
  { code: "+374", flag: "🇦🇲", name: "" },
  { code: "+61",  flag: "🇦🇺", name: "" },
  { code: "+43",  flag: "🇦🇹", name: "" },
  { code: "+994", flag: "🇦🇿", name: "" },
  { code: "+973", flag: "🇧🇭", name: "" },
  { code: "+880", flag: "🇧🇩", name: "" },
  { code: "+375", flag: "🇧🇾", name: "" },
  { code: "+32",  flag: "🇧🇪", name: "" },
  { code: "+501", flag: "🇧🇿", name: "" },
  { code: "+229", flag: "🇧🇯", name: "" },
  { code: "+975", flag: "🇧🇹", name: "" },
  { code: "+591", flag: "🇧🇴", name: "" },
  { code: "+387", flag: "🇧🇦", name: "" },
  { code: "+267", flag: "🇧🇼", name: "" },
  { code: "+55",  flag: "🇧🇷", name: "" },
  { code: "+673", flag: "🇧🇳", name: "" },
  { code: "+359", flag: "🇧🇬", name: "" },
  { code: "+226", flag: "🇧🇫", name: "" },
  { code: "+257", flag: "🇧🇮", name: "" },
  { code: "+855", flag: "🇰🇭", name: "" },
  { code: "+237", flag: "🇨🇲", name: "" },
  { code: "+1",   flag: "🇨🇦", name: "" },
  { code: "+238", flag: "🇨🇻", name: "" },
  { code: "+236", flag: "🇨🇫", name: "" },
  { code: "+235", flag: "🇹🇩", name: "" },
  { code: "+56",  flag: "🇨🇱", name: "" },
  { code: "+86",  flag: "🇨🇳", name: "" },
  { code: "+57",  flag: "🇨🇴", name: "" },
  { code: "+269", flag: "🇰🇲", name: "" },
  { code: "+242", flag: "🇨🇬", name: "" },
  { code: "+506", flag: "🇨🇷", name: "" },
  { code: "+385", flag: "🇭🇷", name: "" },
  { code: "+53",  flag: "🇨🇺", name: "" },
  { code: "+357", flag: "🇨🇾", name: "" },
  { code: "+420", flag: "🇨🇿", name: "" },
  { code: "+45",  flag: "🇩🇰", name: "" },
  { code: "+253", flag: "🇩🇯", name: "" },
  { code: "+1",   flag: "🇩🇴", name: "" },
  { code: "+593", flag: "🇪🇨", name: "" },
  { code: "+20",  flag: "🇪🇬", name: "" },
  { code: "+503", flag: "🇸🇻", name: "" },
  { code: "+240", flag: "🇬🇶", name: "" },
  { code: "+291", flag: "🇪🇷", name: "" },
  { code: "+372", flag: "🇪🇪", name: "" },
  { code: "+268", flag: "🇸🇿", name: "" },
  { code: "+251", flag: "🇪🇹", name: "" },
  { code: "+679", flag: "🇫🇯", name: "" },
  { code: "+358", flag: "🇫🇮", name: "" },
  { code: "+33",  flag: "🇫🇷", name: "" },
  { code: "+241", flag: "🇬🇦", name: "" },
  { code: "+220", flag: "🇬🇲", name: "" },
  { code: "+995", flag: "🇬🇪", name: "" },
  { code: "+49",  flag: "🇩🇪", name: "" },
  { code: "+233", flag: "🇬🇭", name: "" },
  { code: "+30",  flag: "🇬🇷", name: "" },
  { code: "+502", flag: "🇬🇹", name: "" },
  { code: "+224", flag: "🇬🇳", name: "" },
  { code: "+245", flag: "🇬🇼", name: "" },
  { code: "+592", flag: "🇬🇾", name: "" },
  { code: "+509", flag: "🇭🇹", name: "" },
  { code: "+504", flag: "🇭🇳", name: "" },
  { code: "+36",  flag: "🇭🇺", name: "" },
  { code: "+354", flag: "🇮🇸", name: "" },
  { code: "+91",  flag: "🇮🇳", name: "" },
  { code: "+62",  flag: "🇮🇩", name: "" },
  { code: "+98",  flag: "🇮🇷", name: "" },
  { code: "+964", flag: "🇮🇶", name: "" },
  { code: "+353", flag: "🇮🇪", name: "" },
  { code: "+972", flag: "🇮🇱", name: "" },
  { code: "+39",  flag: "🇮🇹", name: "" },
  { code: "+225", flag: "🇨🇮", name: " " },
  { code: "+1",   flag: "🇯🇲", name: "" },
  { code: "+81",  flag: "🇯🇵", name: "" },
  { code: "+962", flag: "🇯🇴", name: "" },
  { code: "+7",   flag: "🇰🇿", name: "" },
  { code: "+254", flag: "🇰🇪", name: "" },
  { code: "+686", flag: "🇰🇮", name: "" },
  { code: "+965", flag: "🇰🇼", name: "" },
  { code: "+996", flag: "🇰🇬", name: "" },
  { code: "+856", flag: "🇱🇦", name: "" },
  { code: "+371", flag: "🇱🇻", name: "" },
  { code: "+961", flag: "🇱🇧", name: "" },
  { code: "+266", flag: "🇱🇸", name: "" },
  { code: "+231", flag: "🇱🇷", name: "" },
  { code: "+218", flag: "🇱🇾", name: "" },
  { code: "+423", flag: "🇱🇮", name: "" },
  { code: "+370", flag: "🇱🇹", name: "" },
  { code: "+352", flag: "🇱🇺", name: "" },
  { code: "+261", flag: "🇲🇬", name: "" },
  { code: "+265", flag: "🇲🇼", name: "" },
  { code: "+60",  flag: "🇲🇾", name: "" },
  { code: "+960", flag: "🇲🇻", name: "" },
  { code: "+223", flag: "🇲🇱", name: "" },
  { code: "+356", flag: "🇲🇹", name: "" },
  { code: "+692", flag: "🇲🇭", name: " " },
  { code: "+222", flag: "🇲🇷", name: "" },
  { code: "+230", flag: "🇲🇺", name: "" },
  { code: "+52",  flag: "🇲🇽", name: "" },
  { code: "+691", flag: "🇫🇲", name: "" },
  { code: "+373", flag: "🇲🇩", name: "" },
  { code: "+976", flag: "🇲🇳", name: "" },
  { code: "+382", flag: "🇲🇪", name: "" },
  { code: "+212", flag: "🇲🇦", name: "" },
  { code: "+258", flag: "🇲🇿", name: "" },
  { code: "+95",  flag: "🇲🇲", name: "" },
  { code: "+264", flag: "🇳🇦", name: "" },
  { code: "+674", flag: "🇳🇷", name: "" },
  { code: "+977", flag: "🇳🇵", name: ""},
  { code: "+31",  flag: "🇳🇱", name: "" },
  { code: "+64",  flag: "🇳🇿", name: "" },
  { code: "+505", flag: "🇳🇮", name: "" },
  { code: "+227", flag: "🇳🇪", name: "" },
  { code: "+234", flag: "🇳🇬", name: "" },
  { code: "+850", flag: "🇰🇵", name: "" },
  { code: "+389", flag: "🇲🇰", name: "" },
  { code: "+47",  flag: "🇳🇴", name: "" },
  { code: "+968", flag: "🇴🇲", name: "" },
  { code: "+92",  flag: "🇵🇰", name: "" },
  { code: "+680", flag: "🇵🇼", name: "" },
  { code: "+970", flag: "🇵🇸", name: "" },
  { code: "+507", flag: "🇵🇦", name: "" },
  { code: "+675", flag: "🇵🇬", name: " " },
  { code: "+595", flag: "🇵🇾", name: "" },
  { code: "+51",  flag: "🇵🇪", name: "" },
  { code: "+63",  flag: "🇵🇭", name: "" },
  { code: "+48",  flag: "🇵🇱", name: "" },
  { code: "+351", flag: "🇵🇹", name: "" },
  { code: "+974", flag: "🇶🇦", name: "" },
  { code: "+40",  flag: "🇷🇴", name: "" },
  { code: "+7",   flag: "🇷🇺", name: "" },
  { code: "+250", flag: "🇷🇼", name: "" },
  { code: "+685", flag: "🇼🇸", name: "" },
  { code: "+239", flag: "🇸🇹", name: "" },
  { code: "+966", flag: "🇸🇦", name: "" },
  { code: "+221", flag: "🇸🇳", name: "" },
  { code: "+248", flag: "🇸🇨", name: "" },
  { code: "+232", flag: "🇸🇱", name: " "},
  { code: "+65",  flag: "🇸🇬", name: "" },
  { code: "+421", flag: "🇸🇰", name: "" },
  { code: "+386", flag: "🇸🇮", name: "" },
  { code: "+677", flag: "🇸🇧", name: "" },
  { code: "+252", flag: "🇸🇴", name: "" },
  { code: "+27",  flag: "🇿🇦", name: "" },
  { code: "+82",  flag: "🇰🇷", name: "" },
  { code: "+211", flag: "🇸🇸", name: "" },
  { code: "+34",  flag: "🇪🇸", name: "" },
  { code: "+94",  flag: "🇱🇰", name: "" },
  { code: "+249", flag: "🇸🇩", name: "" },
  { code: "+597", flag: "🇸🇷", name: "" },
  { code: "+46",  flag: "🇸🇪", name: "" },
  { code: "+41",  flag: "🇨🇭", name: "" },
  { code: "+963", flag: "🇸🇾", name: "" },
  { code: "+992", flag: "🇹🇯", name: "" },
  { code: "+255", flag: "🇹🇿", name: "" },
  { code: "+66",  flag: "🇹🇭", name: "" },
  { code: "+670", flag: "🇹🇱", name: "" },
  { code: "+228", flag: "🇹🇬", name: "" },
  { code: "+676", flag: "🇹🇴", name: "" },
  { code: "+1",   flag: "🇹🇹", name: "" },
  { code: "+216", flag: "🇹🇳", name: "" },
  { code: "+90",  flag: "🇹🇷", name: ""},
  { code: "+993", flag: "🇹🇲", name: "" },
  { code: "+688", flag: "🇹🇻", name: "" },
  { code: "+256", flag: "🇺🇬", name: "" },
  { code: "+380", flag: "🇺🇦", name: "" },
  { code: "+971", flag: "🇦🇪", name: "" },
  { code: "+44",  flag: "🇬🇧", name: "" },
  { code: "+1",   flag: "🇺🇸", name: "" },
  { code: "+598", flag: "🇺🇾", name: "" },
  { code: "+678", flag: "🇻🇺", name: "" },
  { code: "+84",  flag: "🇻🇳", name: "" },
  { code: "+967", flag: "🇾🇪", name: "" },
  { code: "+260", flag: "🇿🇲", name: "" },
  { code: "+263", flag: "🇿🇼", name: "" },
];

const isValidPhone = (val) => {
  const digits = val.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
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

const generateId = () =>
  `hosp_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export function AddHospital() {
  const navigate = useNavigate();
  const { addHospital } = useContext(HospitalContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactCode: "+234",
    contact: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    representative: "",
    repEmail: "",
    repContactCode: "+234",
    repContact: ""
  });

  const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ message: "", type: "" });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setFormData((prev) => {
        const updated = { ...prev, [name]: value };
        // Auto-sync rep contact code when official contact code changes
        if (name === "contactCode") {
          updated.repContactCode = value;
        }
        return updated;
      });
  
      if (errors[name]) {
        const error = VALIDATIONS[name]?.(value) || "";
        setErrors((prev) => ({ ...prev, [name]: error }));
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

   const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
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
        {toast.message && (
          <div className={`toast toast--${toast.type}`}>{toast.message}</div>
        )}
  
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
                <PhoneInput
                  label="Official Contact"
                  codeName="contactCode"
                  codeValue={formData.contactCode}
                  phoneName="contact"
                  phoneValue={formData.contact}
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
                <PhoneInput
                  label="Contact"
                  codeName="repContactCode"
                  codeValue={formData.repContactCode}
                  phoneName="repContact"
                  phoneValue={formData.repContact}
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
  

const PhoneInput = ({
  label,
  codeName,
  codeValue,
  phoneName,
  phoneValue,
  onChange,
  error
}) => (
  <div className={`input-group ${error ? "has-error" : ""}`}>
    <label>{label}</label>
    <div className="phone-input-wrapper">
      <select
        name={codeName}
        value={codeValue}
        onChange={onChange}
        className="country-code"
      >
        {COUNTRY_CODES.map((c) => (
          <option key={`${c.name}-${c.code}`} value={c.code}>
            {c.flag} {c.code} {c.name}
          </option>
        ))}
      </select>
      <input
        type="tel"
        name={phoneName}
        value={phoneValue}
        onChange={onChange}
        placeholder="Enter phone number"
        className={error ? "invalid" : ""}
      />
    </div>
    {error && <span className="error-text">{error}</span>}
  </div>
);

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