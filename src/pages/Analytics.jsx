import React, { useState } from "react";
import "../styles/Analytics.css";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";
import { FiBarChart2, FiTrendingUp, FiTrendingDown } from "react-icons/fi"


const Analytics = () => {
    const [timeRange, setTimeRange] = useState("Last 6 months");

    const trendData = [
        { month: "SEP", usage: 0 },
        { month: "OCT", usage: 40 },
        { month: "NOV", usage: 20 },
        { month: "DEC", usage: 40 },
        { month: "JAN", usage: 60 },
        { month: "FEB", usage: 100 },
    ];

    const hospitalData = [
        { name: "Sunrise Clinic", value: 90 },
        { name: "Amazing Grace..", value: 75 },
        { name: "Promise Land..", value: 65 },
        { name: "Bloom Private...", value: 60 },
        { name: "RiverLand Hos..", value: 50 },

    ];

    const featureData = [
        { name: "Patient Records", value: 35 },
        { name: "Lab Uploads", value: 20 },
        { name: "Staff Activity", value: 15 },
        { name: "Radiology Uploads", value: 20 },
        { name: "Pharmacy Entries", value: 10 },
    ];

    const COLORS = ["#2563eb", "#22c55e", "#14b8a6", "#f97316", "#a855f7"];

    return (
        <div className="analytics-container">

            {/* Header */}
            <div className="analytics-header">
                <h3><FiBarChart2 size={20} color="#4a6cf7" /> EMR Analytics</h3>
                <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                    <option>Last 6 months</option>
                    <option>Last 3 months</option>
                    <option>Last 12 months</option>
                </select>
            </div>

            {/* Stats Cards */}
            <div className="stats-row">
                <div className="stats-card">
                    <span className="stats-value">78%</span>
                    <span className="stats-label">Average Platform Engagement</span>
                </div>
                <div className="stats-card">
                    <span className="stats-value">
                        Sunrise Clinic <FiTrendingUp size={16} color="blue" />
                    </span>
                    <span className="stats-label badge">Highest Engagement</span>
                </div>
                <div className="stats-card">
                    <span className="stats-value">
                        Lifeline Clinic <FiTrendingDown size={16} color="red" />
                    </span>
                    <span className="stats-label  badge">Lowest Engagement</span>
                </div>
            </div>

            {/* Area Chart */}
            <div className="chart-section">
                <h3>EMR Usage Trend</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={trendData}>
                        <defs>
                            <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                        <Tooltip formatter={(v) => `${v}%`} />
                        <Area
                            type="monotone"
                            dataKey="usage"
                            stroke="#2563eb"
                            strokeWidth={2}
                            fill="url(#colorUsage)"
                            dot={{ fill: "#2563eb", r: 5 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Bottom Row */}
            <div className="bottom-row">

                {/* Bar Chart */}
                <div className="chart-card">
                    <h3>Hospital Engagement Comparison</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={hospitalData} layout="vertical">
                            <XAxis type="number" hide />
                            <YAxis
                                type="category"
                                dataKey="name"
                                width={150}
                                tick={{ fontSize: 13, textAnchor: 'end' }}
                            />
                            <Tooltip />
                            <Bar dataKey="value" fill="#2563eb" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Donut Chart */}
                <div className="chart-card">
                    <h3>Platform Feature Usage</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={featureData}
                                cx="40%"
                                cy="60%"
                                innerRadius={50}
                                outerRadius={70}
                                dataKey="value"
                            >
                                {featureData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Legend
                                layout="vertical"
                                align="right"
                                verticalAlign="middle"
                                iconType="square"
                                iconSize={12}
                                formatter={(value) => (
                                    <span style={{ fontSize: '10px', color: '#444' }}>{value}</span>
                                )}
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>

        </div >
    );
};

export default Analytics;