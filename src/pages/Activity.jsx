import React, { useState } from "react";
import Sidebar from "../components/sidebar.jsx";
import "./Activity.css";

const ACTIVITY_DATA = [
    { status: "Successful", text: "Faith Adewale (Doctor) logged in.", time: "Just now", group: "Today" },
    { status: "Successful", text: "Michael Brown (IT Admin) reset a user's password.", time: "1 minute ago", group: "Today" },
    { status: "Successful", text: "User's account suspended due to inactivity.", time: "Today, 10:22am", group: "Today" },
    { status: "Error", text: "Multiple login attempts detected.", time: "Today, 10:42am", group: "Today" },
    { status: "Error", text: "Result upload failed.", time: "Today, 10:42am", group: "Today" },
    { status: "Successful", text: "Michael Brown (IT Admin) reset a user's password.", time: "Today, 10:42am", group: "Today" },
    { status: "Successful", text: "Michael Brown (IT Admin) reset a user's password.", time: "Today, 10:42am", group: "Today" },
    { status: "Successful", text: "Michael Brown (IT Admin) reset a user's password.", time: "Today, 10:42am", group: "Today" },
    { status: "Error", text: "System backup was interrupted.", time: "Today, 10:42am", group: "Today" },
    { status: "Error", text: "System backup was interrupted.", time: "Today, 09:07am", group: "Today" },
];

const TIME_RANGES = ["Today", "This Week", "This Month", "All Time"];

export default function Activity() {
    const [search, setSearch] = useState("");
    const [range, setRange] = useState("Today");
    const [rangeOpen, setRangeOpen] = useState(false);

    const filtered = ACTIVITY_DATA.filter((a) => {
        const matchesSearch = a.text.toLowerCase().includes(search.toLowerCase());
        const matchesRange = range === "All Time" || a.group === range || range === "Today";
        return matchesSearch && matchesRange;
    });

    return (
        <div className="activity-layout">
            <Sidebar />

            <main className="activity-main">
                <div className="activity-topbar">
                    <div className="activity-topbar-title">
                        <span className="activity-topbar-icon">📋</span>
                        <h2>Activity</h2>
                    </div>

                    <div className="activity-topbar-controls">
                        <input
                            className="activity-search"
                            placeholder="Search by staff name or keyword"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <div className="range-dropdown">
                            <button
                                className="range-btn"
                                onClick={() => setRangeOpen((o) => !o)}
                            >
                                {range} ▾
                            </button>
                            {rangeOpen && (
                                <div className="range-menu">
                                    {TIME_RANGES.map((r) => (
                                        <div
                                            key={r}
                                            className="range-option"
                                            onClick={() => {
                                                setRange(r);
                                                setRangeOpen(false);
                                            }}
                                        >
                                            {r}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="activity-list">
                    {filtered.map((a, i) => (
                        <div className="activity-log-item" key={i}>
                            <div>
                                <p className={`log-status ${a.status === "Error" ? "log-error" : "log-success"}`}>
                                    {a.status}
                                </p>
                                <p className="log-text">{a.text}</p>
                            </div>
                            <span className="log-time">{a.time}</span>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <p className="activity-empty">No activity matches your search.</p>
                    )}
                </div>
            </main>
        </div>
    );
}