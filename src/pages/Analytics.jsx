import React, { useState } from "react";
import "../styles/Analytics.css";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";


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
                <h3>EMR Analytics</h3>
                <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                    <option>Last 6 months</option>
                    <option>Last 3 months</option>
                    <option>Last 12 months</option>
                </select>
            </div>

            {/* Stats Cards */}
            <div className="stats-row">
                <div className="stats-card">
                    <h1>78%</h1>
                    <p>Average Platform Engagement</p>
                </div>
                <div className="stats-card">
                    <h1>Sunrise Clinic ↑</h1>
                    <p>Highest Engagement</p>
                </div>
                <div className="stats-card">
                    <h1>Lifeline Clinic ↓</h1>
                    <p>Lowest Engagement</p>
                </div>
            </div>

            {/* Area Chart */}
            <div className="chart-section">
                <h3>EMR Usage Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
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
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={hospitalData} layout="vertical">
                            <XAxis type="number" hide />
                            <YAxis
                                type="category"
                                dataKey="name"
                                width={120}
                                tick={{ fontSize: 12 }}
                            />
                            <Tooltip />
                            <Bar dataKey="value" fill="#2563eb" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Donut Chart */}
                <div className="chart-card">
                    <h3>Platform Feature Usage</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={featureData}
                                cx="40%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={100}
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
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>

        </div>
    );
};

export default Analytics;