import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboardicon from "../assets/employee.png";
import Sidebar from "../components/sidebar.jsx";
import STAFF_DATA from "../data/staffData.js";
import "./ItStaff.css";

const PAGE_SIZE = 15;

function StatusBadge({ status }) {
    return <span className={`status-badge status-${status.toLowerCase()}`}>{status}</span>;
}

export default function Staff() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [page, setPage] = useState(1);

    const filtered = STAFF_DATA.filter((s) => {
        const matchesSearch =
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.role.toLowerCase().includes(search.toLowerCase()) ||
            s.department.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "All" || s.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="staff-layout">
            <Sidebar />

            <main className="staff-main">
                <div className="staff-topbar">
                    <div className="staff-topbar-title">
                        <span className="staff-topbar-icon">
                            <img src={Dashboardicon} alt="Staff" />
                        </span>
                        <h2>Staff</h2>
                    </div>

                    <input
                        className="staff-search"
                        placeholder="Search by name, role or department"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>

                <section className="staff-card">
                    <div className="staff-controls">
                        <button className="add-staff-btn">+ Add New Staff</button>

                        <div className="staff-filters">
                            <select
                                className="status-select"
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setPage(1);
                                }}
                            >
                                <option value="All">All</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Suspended">Suspended</option>
                            </select>

                            <button className="filter-btn">Filter ☰</button>
                        </div>
                    </div>

                    <table className="staff-table">
                        <thead>
                            <tr>
                                <th>Staff Name</th>
                                <th>Role</th>
                                <th>Department</th>
                                <th>Last Login</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageData.map((s) => (
                                <tr
                                    key={s.id}
                                    className="staff-row"
                                    onClick={() => navigate(`/staff/${s.id}`)}
                                >
                                    <td className="staff-name">{s.name}</td>
                                    <td>{s.role}</td>
                                    <td>{s.department}</td>
                                    <td>{s.lastLogin}</td>
                                    <td>
                                        <StatusBadge status={s.status} />
                                    </td>
                                </tr>
                            ))}
                            {pageData.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="staff-empty">
                                        No staff match your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="staff-pagination">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                        >
                            ‹ Previous
                        </button>
                        <span className="page-indicator">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        >
                            Next ›
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}