import React, { useState, useEffect } from "react";
import "../styles/deleteModal.css";

export default function DeleteModal({ open, onClose, onConfirm, loading }) {
  const [reason, setReason] = useState("");
  const [otherText, setOtherText] = useState("");
  const [confirmText, setConfirmText] = useState("");

  const reasons = [
    "Hospital is no longer using the EMR system",
    "Duplicate hospital account created",
    "Hospital requested account removal",
    "Incorrect hospital information provided",
    "Hospital merged with another facility",
    "Other"
  ];

  // ✅ RESET STATE WHEN MODAL CLOSES
  useEffect(() => {
    if (!open) {
      setReason("");
      setOtherText("");
      setConfirmText("");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = () => {
    const finalReason = reason === "Other" ? otherText : reason;

    if (!finalReason) return;

    onConfirm({
      reason: finalReason,
      confirmText
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card large">

        <h2>Delete Hospital Account</h2>
        <p className="subtitle">
          Please tell us why you are deleting this hospital account
        </p>

        {/* ✅ RADIO OPTIONS */}
        <div className="radio-group">
          {reasons.map((item) => (
            <label key={item} className="radio-item">
              <input
                type="radio"
                name="reason"
                value={item}
                checked={reason === item}
                onChange={(e) => setReason(e.target.value)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>

        {/* ✅ OTHER INPUT */}
        {reason === "Other" && (
          <textarea
            className="textarea"
            placeholder="Please specify..."
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
          />
        )}

        {/* 🔥 CONFIRM DELETE INPUT */}
        <div className="confirm-box">
          <p>Type <strong>DELETE</strong> to confirm</p>
          <input
            type="text"
            className="input"
            placeholder="DELETE"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
        </div>

        {/* ✅ ACTIONS */}
        <div className="modal-actions">
          <button className="btn ghost" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn danger"
            onClick={handleSubmit}
            disabled={
              loading ||
              !reason ||
              (reason === "Other" && !otherText) ||
              confirmText !== "DELETE"
            }
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>

      </div>
    </div>
  );
}