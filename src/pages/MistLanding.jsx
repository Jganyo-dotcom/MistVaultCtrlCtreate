import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MistLanding.css";
import doctor from "../assets/doctor.png";
import doctorDesk from "../assets/doct-desk.png";
import misticon from "../assets/mist-icon.png";

/* ── Google Fonts ── */
if (!document.querySelector("#mist-fonts")) {
  const link = document.createElement("link");
  link.id = "mist-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap";
  document.head.appendChild(link);
}

/* ── Smooth scroll ── */
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ── Footer wave path ── */
const WAVE_D =
  "M0,100 L0,45.0 L10.6,44.8 L21.1,44.4 L31.7,43.6 L42.2,42.5 L52.8,41.2 L63.4,39.6 " +
  "L73.9,37.7 L84.5,35.7 L95.0,33.5 L105.6,31.2 L116.2,28.7 L126.7,26.3 L137.3,23.7 " +
  "L147.8,21.3 L158.4,18.8 L169.0,16.5 L179.5,14.3 L190.1,12.3 L200.6,10.4 L211.2,8.8 " +
  "L221.8,7.5 L232.3,6.4 L242.9,5.6 L253.4,5.2 L264.0,5.0 L284.6,5.3 L305.3,6.1 " +
  "L325.9,7.6 L346.6,9.5 L367.2,12.0 L387.8,14.9 L408.5,18.2 L429.1,21.9 L449.8,26.0 " +
  "L470.4,30.2 L491.0,34.7 L511.7,39.2 L532.3,43.8 L553.0,48.3 L573.6,52.8 L594.2,57.0 " +
  "L614.9,61.1 L635.5,64.8 L656.2,68.1 L676.8,71.0 L697.4,73.5 L718.1,75.4 L738.7,76.9 " +
  "L759.4,77.7 L780.0,78.0 L796.8,77.9 L813.6,77.5 L830.4,76.8 L847.2,76.0 L864.0,74.8 " +
  "L880.8,73.5 L897.6,72.0 L914.4,70.3 L931.2,68.5 L948.0,66.6 L964.8,64.6 L981.6,62.5 " +
  "L998.4,60.5 L1015.2,58.4 L1032.0,56.4 L1048.8,54.5 L1065.6,52.7 L1082.4,51.0 " +
  "L1099.2,49.5 L1116.0,48.2 L1132.8,47.0 L1149.6,46.2 L1166.4,45.5 L1183.2,45.1 " +
  "L1200.0,45 L1200,100 Z";

/* ══════════════════════════════════════════════════
   NAV
══════════════════════════════════════════════════ */
function Nav() {
  const [active, setActive] = useState(null);

  return (
    <nav className="mist-nav">
      <div className="nav-logo">
        <img src={misticon} alt="MIST logo" className="nav-logo-img" />
        <div className="nav-logo-text">
          <span className="nav-wordmark">MIST</span>
          <span className="nav-tagline">Medical Information Storage Technology</span>
        </div>
      </div>

      <ul className="nav-links">
        {[
          { id: "what-we-do", label: "What We Do" },
          { id: "features",   label: "Features"   },
        ].map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={active === id ? "active" : ""}
              onClick={e => { e.preventDefault(); scrollTo(id); }}
              onMouseEnter={() => setActive(id)}
              onMouseLeave={() => setActive(null)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        <Link to="/signin" state={{ fromLanding: true }} className="btn-primary nav-cta">
          Go to Dashboard
        </Link>
        <a
          href="#contact"
          className="btn-primary nav-cta"
          onClick={e => { e.preventDefault(); scrollTo("contact"); }}
        >
          Contact Us
        </a>
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="mist-hero">
      <div className="hero-text-wrap">
        <div className="hero-text">
          <h1>EMR Management System for Hospitals</h1>
          <p>
            A centralized platform for managing hospital records, monitoring
            activity and maintaining secure system control.
          </p>
          <div className="hero-buttons">
            <a
              href="#contact"
              className="btn-primary btn-blue"
              onClick={e => { e.preventDefault(); scrollTo("contact"); }}
            >
              Contact Us
            </a>
            <a
              href="#features"
              className="btn-outline"
              onClick={e => { e.preventDefault(); scrollTo("features"); }}
            >
              View Demo
            </a>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <img src={doctor} alt="Doctor illustration" className="hero-doctor-img" />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   WHAT WE DO
══════════════════════════════════════════════════ */
function WhatWeDo() {
  return (
    <section className="mist-what-we-do" id="what-we-do">
      <h2 className="section-title">What We Do</h2>
      <p className="section-subtitle">A centralized EMR system for managing hospital operations.</p>
      <div className="wwd-grid">
        <div className="wwd-illustration">
          <img src={doctorDesk} alt="Doctor at desk" className="wwd-img" />
        </div>
        <div className="wwd-text">
          <p>
            MIST is designed to support efficient hospital management by providing a platform
            to oversee accounts, track system activity and maintain secure access.
          </p>
          <p>
            It enables healthcare administrators to streamline, improve oversight and manage
            multiple facilities with ease.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FEATURES
══════════════════════════════════════════════════ */
const FEATURES = [
  { icon: "🗂️", title: "Patient Records Management",    variant: "",
    desc: "A digital system where all patient information (history, diagnoses, prescriptions, lab results and visits) is stored securely and accessed in seconds." },
  { icon: "📋", title: "Clinical Documentation Tools",  variant: "accent",
    desc: "Fast documentation for consultations, procedures and medical notes with templates to save time." },
  { icon: "💊", title: "Electronic Prescriptions",      variant: "accent",
    desc: "Enables doctors to create and send prescriptions digitally, reducing handwriting errors and improving pharmacy workflow." },
  { icon: "🔒", title: "Secure Access & Data Protection", variant: "dark",
    desc: "Role-based access control with encrypted data to ensure only authorized staff can view or edit patient information." },
];

function Features() {
  return (
    <section className="mist-features" id="features">
      <h2 className="section-title">Features</h2>
      <div className="features-grid">
        <div className="features-blob" aria-hidden="true" />
        {FEATURES.map(f => (
          <div key={f.title} className={`feature-card ${f.variant}`}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   WHO IT'S FOR
══════════════════════════════════════════════════ */
function WhoItsFor() {
  return (
    <section className="mist-who">
      <h2 className="section-title">Who It's For</h2>
      <div className="audience-cards">
        {["Hospital Medical Staff", "Hospital IT Teams", "Medical System Managers"].map(a => (
          <div key={a} className="audience-card">
            <span aria-hidden="true" style={{ color: "#1a73e8", fontSize: 18 }}>•</span>
            {a}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════ */
const CONTACTS = [
  { icon: "📞", color: "green", title: "Call Us",            lines: ["+2340123456789", "+2330123456789"] },
  { icon: "💬", color: "blue",  title: "Send Us a Message",  lines: ["+2340123456789", "+2330123456789"] },
  { icon: "✉️", color: "red",   title: "Send Us an E-mail",  lines: ["mistemr@gmail.com"] },
];

function Contact() {
  return (
    <section className="mist-contact" id="contact">
      <h2 className="section-title">Contact Us</h2>
      <div className="contact-grid">
        {CONTACTS.map(c => (
          <div key={c.title} className="contact-card">
            <div className={`contact-icon ${c.color}`}>{c.icon}</div>
            <h4>{c.title}</h4>
            <p>
              {c.lines.map((line, i) => (
                <span key={i}>{line}{i < c.lines.length - 1 && <br />}</span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════════════ */
const TESTIMONIALS = [
  { name: "Ajayi Adebisi",   role: "Doctor",    roleKey: "doctor", icon: "🧑‍⚕️",
    quote: "Everything I need is right there. It saves time during consultations." },
  { name: "Folakemi Hassan", role: "Nurse",      roleKey: "nurse",  icon: "👩‍⚕️",
    quote: "Documentation is faster and less stressful with this system." },
  { name: "Isaiah Devonte",  role: "Pharmacist", roleKey: "pharma", icon: "💊",
    quote: "It helps keep medications record clear and easy to track." },
  { name: "Tobi Kolade",     role: "IT",         roleKey: "it",     icon: "💻",
    quote: "Monitoring and managing the system is more smoother now." },
];

function Testimonials() {
  return (
    <section className="mist-testimonials">
      <h2 className="section-title">What People are Saying</h2>
      <div className="testimonials-grid">
        {TESTIMONIALS.map(t => (
          <div key={t.name} className="testimonial-card">
            <div className="testimonial-author">
              <div className={`testimonial-avatar ${t.roleKey}`}>{t.icon}</div>
              <div>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-role">{t.role}</div>
              </div>
            </div>
            <blockquote>"{t.quote}"</blockquote>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════ */
const QUICK_LINKS = [
  { id: "what-we-do", label: "What We Do" },
  { id: "features",   label: "Features"   },
  { id: "contact",    label: "Contact Us" },
];

function Footer() {
  return (
    <footer className="mist-footer">
      <svg
        className="footer-wave"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={WAVE_D} fill="#0d1b2a" />
      </svg>

      <div className="footer-grid">
        <div>
          <div className="footer-logo">
            <img src={misticon} alt="MIST" className="footer-logo-img" />
            <span className="footer-logo-wordmark">MIST</span>
          </div>
          <p className="footer-brand-p">Simplifying hospital management and system oversight.</p>
        </div>

        <div className="footer-col">
          <h5>Quick Links</h5>
          <ul>
            {QUICK_LINKS.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h5>Contact</h5>
          <ul>
            {["+2340123456789", "+2330123456789", "mistemr@gmail.com"].map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">© 2026 Ctrl + Create Labs · All rights reserved.</div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════ */
export default function MistLanding() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authenticated") === "true") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <div>
      <Nav />
      <Hero />
      <WhatWeDo />
      <Features />
      <WhoItsFor />
      <Contact />
      <Testimonials />
      <Footer />
    </div>
  );
}