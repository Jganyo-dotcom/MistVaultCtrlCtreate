import React, { useState, useContext } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { HospitalContext } from "../contexts/HospitalContext";
import "../styles/AddHospital.css";

const COUNTRY_CODES = [
  { code: "+93", flag: "🇦🇫", name: "Afghanistan" },
  { code: "+355", flag: "🇦🇱", name: "Albania" },
  { code: "+213", flag: "🇩🇿", name: "Algeria" },
  { code: "+376", flag: "🇦🇩", name: "Andorra" },
  { code: "+244", flag: "🇦🇴", name: "Angola" },
  { code: "+54", flag: "🇦🇷", name: "Argentina" },
  { code: "+374", flag: "🇦🇲", name: "Armenia" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+43", flag: "🇦🇹", name: "Austria" },
  { code: "+994", flag: "🇦🇿", name: "Azerbaijan" },
  { code: "+973", flag: "🇧🇭", name: "Bahrain" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+375", flag: "🇧🇾", name: "Belarus" },
  { code: "+32", flag: "🇧🇪", name: "Belgium" },
  { code: "+501", flag: "🇧🇿", name: "Belize" },
  { code: "+229", flag: "🇧🇯", name: "Benin" },
  { code: "+975", flag: "🇧🇹", name: "Bhutan" },
  { code: "+591", flag: "🇧🇴", name: "Bolivia" },
  { code: "+387", flag: "🇧🇦", name: "Bosnia & Herzegovina" },
  { code: "+267", flag: "🇧🇼", name: "Botswana" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "+673", flag: "🇧🇳", name: "Brunei" },
  { code: "+359", flag: "🇧🇬", name: "Bulgaria" },
  { code: "+226", flag: "🇧🇫", name: "Burkina Faso" },
  { code: "+257", flag: "🇧🇮", name: "Burundi" },
  { code: "+855", flag: "🇰🇭", name: "Cambodia" },
  { code: "+237", flag: "🇨🇲", name: "Cameroon" },
  { code: "+1-CA", flag: "🇨🇦", name: "Canada" },
  { code: "+238", flag: "🇨🇻", name: "Cape Verde" },
  { code: "+236", flag: "🇨🇫", name: "Central African Republic" },
  { code: "+235", flag: "🇹🇩", name: "Chad" },
  { code: "+56", flag: "🇨🇱", name: "Chile" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+57", flag: "🇨🇴", name: "Colombia" },
  { code: "+269", flag: "🇰🇲", name: "Comoros" },
  { code: "+242", flag: "🇨🇬", name: "Congo" },
  { code: "+506", flag: "🇨🇷", name: "Costa Rica" },
  { code: "+385", flag: "🇭🇷", name: "Croatia" },
  { code: "+53", flag: "🇨🇺", name: "Cuba" },
  { code: "+357", flag: "🇨🇾", name: "Cyprus" },
  { code: "+420", flag: "🇨🇿", name: "Czech Republic" },
  { code: "+45", flag: "🇩🇰", name: "Denmark" },
  { code: "+253", flag: "🇩🇯", name: "Djibouti" },
  { code: "+1-DO", flag: "🇩🇴", name: "Dominican Republic" },
  { code: "+593", flag: "🇪🇨", name: "Ecuador" },
  { code: "+20", flag: "🇪🇬", name: "Egypt" },
  { code: "+503", flag: "🇸🇻", name: "El Salvador" },
  { code: "+240", flag: "🇬🇶", name: "Equatorial Guinea" },
  { code: "+291", flag: "🇪🇷", name: "Eritrea" },
  { code: "+372", flag: "🇪🇪", name: "Estonia" },
  { code: "+268", flag: "🇸🇿", name: "Eswatini" },
  { code: "+251", flag: "🇪🇹", name: "Ethiopia" },
  { code: "+679", flag: "🇫🇯", name: "Fiji" },
  { code: "+358", flag: "🇫🇮", name: "Finland" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+241", flag: "🇬🇦", name: "Gabon" },
  { code: "+220", flag: "🇬🇲", name: "Gambia" },
  { code: "+995", flag: "🇬🇪", name: "Georgia" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+233", flag: "🇬🇭", name: "Ghana" },
  { code: "+30", flag: "🇬🇷", name: "Greece" },
  { code: "+502", flag: "🇬🇹", name: "Guatemala" },
  { code: "+224", flag: "🇬🇳", name: "Guinea" },
  { code: "+245", flag: "🇬🇼", name: "Guinea-Bissau" },
  { code: "+592", flag: "🇬🇾", name: "Guyana" },
  { code: "+509", flag: "🇭🇹", name: "Haiti" },
  { code: "+504", flag: "🇭🇳", name: "Honduras" },
  { code: "+36", flag: "🇭🇺", name: "Hungary" },
  { code: "+354", flag: "🇮🇸", name: "Iceland" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "+98", flag: "🇮🇷", name: "Iran" },
  { code: "+964", flag: "🇮🇶", name: "Iraq" },
  { code: "+353", flag: "🇮🇪", name: "Ireland" },
  { code: "+972", flag: "🇮🇱", name: "Israel" },
  { code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "+225", flag: "🇨🇮", name: "Ivory Coast" },
  { code: "+1-JM", flag: "🇯🇲", name: "Jamaica" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+962", flag: "🇯🇴", name: "Jordan" },
  { code: "+7-KZ", flag: "🇰🇿", name: "Kazakhstan" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+686", flag: "🇰🇮", name: "Kiribati" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+996", flag: "🇰🇬", name: "Kyrgyzstan" },
  { code: "+856", flag: "🇱🇦", name: "Laos" },
  { code: "+371", flag: "🇱🇻", name: "Latvia" },
  { code: "+961", flag: "🇱🇧", name: "Lebanon" },
  { code: "+266", flag: "🇱🇸", name: "Lesotho" },
  { code: "+231", flag: "🇱🇷", name: "Liberia" },
  { code: "+218", flag: "🇱🇾", name: "Libya" },
  { code: "+423", flag: "🇱🇮", name: "Liechtenstein" },
  { code: "+370", flag: "🇱🇹", name: "Lithuania" },
  { code: "+352", flag: "🇱🇺", name: "Luxembourg" },
  { code: "+261", flag: "🇲🇬", name: "Madagascar" },
  { code: "+265", flag: "🇲🇼", name: "Malawi" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+960", flag: "🇲🇻", name: "Maldives" },
  { code: "+223", flag: "🇲🇱", name: "Mali" },
  { code: "+356", flag: "🇲🇹", name: "Malta" },
  { code: "+692", flag: "🇲🇭", name: "Marshall Islands" },
  { code: "+222", flag: "🇲🇷", name: "Mauritania" },
  { code: "+230", flag: "🇲🇺", name: "Mauritius" },
  { code: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "+691", flag: "🇫🇲", name: "Micronesia" },
  { code: "+373", flag: "🇲🇩", name: "Moldova" },
  { code: "+976", flag: "🇲🇳", name: "Mongolia" },
  { code: "+382", flag: "🇲 Montenegro", name: "Montenegro" },
  { code: "+212", flag: "🇲🇦", name: "Morocco" },
  { code: "+258", flag: "🇲🇿", name: "Mozambique" },
  { code: "+95", flag: "🇲🇲", name: "Myanmar" },
  { code: "+264", flag: "🇳🇦", name: "Namibia" },
  { code: "+674", flag: "🇳🇷", name: "Nauru" },
  { code: "+977", flag: "🇳🇵", name: "Nepal" },
  { code: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "+64", flag: "🇳🇿", name: "New Zealand" },
  { code: "+505", flag: "🇳🇮", name: "Nicaragua" },
  { code: "+227", flag: "🇳🇪", name: "Niger" },
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+850", flag: "🇰🇵", name: "North Korea" },
  { code: "+389", flag: "🇲🇰", name: "North Macedonia" },
  { code: "+47", flag: "🇳🇴", name: "Norway" },
  { code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "+680", flag: "🇵🇼", name: "Palau" },
  { code: "+970", flag: "🇵🇸", name: "Palestine" },
  { code: "+507", flag: "🇵🇦", name: "Panama" },
  { code: "+675", flag: "🇵🇬", name: "Papua New Guinea" },
  { code: "+595", flag: "🇵🇾", name: "Paraguay" },
  { code: "+51", flag: "🇵🇪", name: "Peru" },
  { code: "+63", flag: "🇵🇭", name: "Philippines" },
  { code: "+48", flag: "🇵🇱", name: "Poland" },
  { code: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+40", flag: "🇷🇴", name: "Romania" },
  { code: "+7-RU", flag: "🇷🇺", name: "Russia" },
  { code: "+250", flag: "🇷🇼", name: "Rwanda" },
  { code: "+685", flag: "🇼🇸", name: "Samoa" },
  { code: "+239", flag: "🇸🇹", name: "São Tomé & Príncipe" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+221", flag: "🇸🇳", name: "Senegal" },
  { code: "+248", flag: "🇸🇨", name: "Seychelles" },
  { code: "+232", flag: "🇸🇱", name: "Sierra Leone" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+421", flag: "🇸🇰", name: "Slovakia" },
  { code: "+386", flag: "🇸🇮", name: "Slovenia" },
  { code: "+677", flag: "🇸🇧", name: "Solomon Islands" },
  { code: "+252", flag: "🇸🇴", name: "Somalia" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "+211", flag: "🇸🇸", name: "South Sudan" },
  { code: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+249", flag: "🇸🇩", name: "Sudan" },
  { code: "+597", flag: "🇸🇷", name: "Suriname" },
  { code: "+46", flag: "🇸🇪", name: "Sweden" },
  { code: "+41", flag: "🇨🇭", name: "Switzerland" },
  { code: "+963", flag: "🇸🇾", name: "Syria" },
  { code: "+992", flag: "🇹🇯", name: "Tajikistan" },
  { code: "+255", flag: "🇹🇿", name: "Tanzania" },
  { code: "+66", flag: "🇹🇭", name: "Thailand" },
  { code: "+670", flag: "🇹🇱", name: "Timor-Leste" },
  { code: "+228", flag: "🇹🇬", name: "Togo" },
  { code: "+676", flag: "🇹🇴", name: "Tonga" },
  { code: "+1-TT", flag: "🇹🇹", name: "Trinidad & Tobago" },
  { code: "+216", flag: "🇹🇳", name: "Tunisia" },
  { code: "+90", flag: "🇹🇷", name: "Turkey" },
  { code: "+993", flag: "🇹🇲", name: "Turkmenistan" },
  { code: "+688", flag: "🇹🇻", name: "Tuvalu" },
  { code: "+256", flag: "🇺🇬", name: "Uganda" },
  { code: "+380", flag: "🇺🇦", name: "Ukraine" },
  { code: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+1-US", flag: "🇺🇸", name: "United States" },
  { code: "+598", flag: "🇺🇾", name: "Uruguay" },
  { code: "+998", flag: "🇺🇿", name: "Uzbekistan" },
  { code: "+678", flag: "🇻🇺", name: "Vanuatu" },
  { code: "+39", flag: "🇻🇦", name: "Vatican City" },
  { code: "+84", flag: "🇻🇳", name: "Vietnam" },
  { code: "+967", flag: "🇾🇪", name: "Yemen" },
  { code: "+260", flag: "🇿🇲", name: "Zambia" },
  { code: "+263", flag: "🇿🇼", name: "Zimbabwe" },
];

const isValidPhone = (val) => {
  const digits = val.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
};

const VALIDATIONS = {
  name: (val) => (val.trim() !== "" ? "" : "Hospital name is required"),
  email: (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? "" : "Valid email required",
  contact: (val) =>
    val.trim() !== "" && isValidPhone(val) ? "" : "Valid phone required",
  address: (val) => (val.trim() !== "" ? "" : "Address is required"),
  city: (val) => (val.trim() !== "" ? "" : "City is required"),
  state: (val) => (val.trim() !== "" ? "" : "State is required"),
  postalCode: (val) => (val.trim() !== "" ? "" : "Postal code is required"),
  representative: (val) =>
    val.trim() !== "" ? "" : "Representative name is required",
  repEmail: (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? "" : "Valid email required",
  repContact: (val) =>
    val.trim() !== "" && isValidPhone(val) ? "" : "Valid phone required",
  password: (val) =>
    val.length >= 6 ? "" : "Password must be at least 6 characters",
  confirmPassword: (val, allValues) =>
    val === allValues.password ? "" : "Passwords do not match",
};

const extractPhoneCode = (codeValue) => codeValue.split("-")[0];

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
    repContact: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    if (VALIDATIONS[name]) {
      const error = VALIDATIONS[name](value, updatedFormData);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }

    // Retrigger confirmation check if base password alters
    if (name === "password" && formData.confirmPassword) {
      const confirmError = VALIDATIONS.confirmPassword(
        formData.confirmPassword,
        updatedFormData,
      );
      setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(VALIDATIONS).forEach((field) => {
      const error = VALIDATIONS[field](formData[field] || "", formData);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix errors before submitting");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      const completePhone = `${extractPhoneCode(formData.contactCode)}${formData.contact}`;
      const completeRepPhone = `${extractPhoneCode(formData.repContactCode)}${formData.repContact}`;

      // Construct flat payload required by backend
      const flatPayload = {
        h_name: formData.name,
        addresse: `${formData.address}, ${formData.city}, ${formData.state} ${formData.postalCode}`,
        h_phone: completePhone,
        h_email: formData.email,
        r_name: formData.representative,
        r_phone: completeRepPhone,
        r_email: formData.repEmail,
        r_password: formData.password,
        r_confirm_password: formData.confirmPassword,
      };
      const BASE_URL = "https://medsec.onrender.com/api";
      //const BaseApi = "http://127.0.0.1:4444/api"
      const res = await fetch(`${BASE_URL}/register-hospital`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(flatPayload),
      });

      const data = await res.json();

      if (res.ok) {
        if (addHospital) {
          addHospital({
            id: data.hospital?._id || `hosp_${Date.now()}`,
            name: formData.name,
            email: formData.email,
            contact: completePhone,
            location: `${formData.address}, ${formData.city}`,
            status: "active",
          });
        }

        toast.success("Hospital registered successfully");
        navigate("/hospitals");
      } else {
        toast.error(
          data.error || data.message || "Failed to register hospital",
        );
      }
    } catch (err) {
      console.error("Error creating hospital:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-hospital-page">
      <div className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} />
        <span>BACK</span>
      </div>

      <div className="form-card">
        <h1 className="title">Register New Hospital</h1>

        <form onSubmit={handleSubmit}>
          {/* HOSPITAL INFO */}
          <div className="section">
            <h2>
              Hospital Information<span>*</span>
            </h2>

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
            <h2>
              Representative Information<span>*</span>
            </h2>

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

            <div className="grid-2">
              <Input
                label="Representative Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />
            </div>
          </div>

          <div className="submit-wrapper">
            <button type="submit" className="submit-btn" disabled={loading}>
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
  error,
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
        {COUNTRY_CODES.map((c, idx) => (
          <option key={`${idx}-${c.code}`} value={c.code}>
            {c.flag} {extractPhoneCode(c.code)} - {c.name}
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

const Input = ({
  label,
  name,
  value,
  onChange,
  error,
  heading,
  type = "text",
}) => (
  <div className={`input-group ${error ? "has-error" : ""}`}>
    <label htmlFor={name} className={heading ? "field-heading" : undefined}>
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={error ? "invalid" : ""}
    />
    {error && <span className="error-text">{error}</span>}
  </div>
);
