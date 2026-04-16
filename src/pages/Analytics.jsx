import React, { useState } from "react";
import "../styles/Analytics.css";

function Analytics() {
  const [dateRange, setDateRange] = useState("lastMonth");
  const [startDate, setStartDate] = useState("2026-03-15");
  const [endDate, setEndDate] = useState("2026-04-15");

  // Sample data for charts
  const emrUsageTrendData = [
    { month: "Jan", usage: 45, target: 60 },
    { month: "Feb", usage: 52, target: 65 },
    { month: "Mar", usage: 68, target: 70 },
    { month: "Apr", usage: 72, target: 75 }
  ];

  const hospitalEngagementData = [
    { hospital: "Sunrise Clinic", engagement: 85 },
    { hospital: "Clean Health", engagement: 72 },
    { hospital: "Promise Land", engagement: 88 },
    { hospital: "Wellheit", engagement: 60 },
    { hospital: "Care Medical", engagement: 78 }
  ];

  const featureUsageData = [
    { feature: "Patient Management", usage: 950 },
    { feature: "EMR Records", usage: 1240 },
    { feature: "Appointments", usage: 680 },
    { feature: "Billing System", usage: 520 },
    { feature: "Reports", usage: 450 }
  ];

  // Simple Bar Chart Component
  const BarChart = ({ data, dataKey, valueKey, title }) => {
    const maxValue = Math.max(...data.map((d) => d[valueKey]));

    return (
      <div className="chart-container">
        <h3>{title}</h3>
        <div className="bar-chart">
          {data.map((item, index) => (
            <div key={index} className="bar-item">
              <div className="bar-label">{item[dataKey]}</div>
              <div className="bar-wrapper">
                <div
                  className="bar"
                  style={{ height: `${(item[valueKey] / maxValue) * 200}px` }}
                ></div>
              </div>
              <div className="bar-value">{item[valueKey]}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Line Chart Component for EMR Trend
  const LineChart = ({ data }) => {
    const maxValue = Math.max(...data.map((d) => Math.max(d.usage, d.target)));
    const width = 500;
    const height = 200;
    const padding = 30;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const points = data.map((item, index) => ({
      x:
        padding + (index / (data.length - 1)) * chartWidth,
      usageY: padding + chartHeight - (item.usage / maxValue) * chartHeight,
      targetY: padding + chartHeight - (item.target / maxValue) * chartHeight,
      label: item.month
    }));

    const usagePath = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.usageY}`)
      .join(" ");

    const targetPath = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.targetY}`)
      .join(" ");

    return (
      <div className="chart-container">
        <h3>EMR Usage Trend</h3>
        <svg width={width} height={height} className="line-chart">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={`grid-${i}`}
              x1={padding}
              y1={padding + (chartHeight / 4) * i}
              x2={width - padding}
              y2={padding + (chartHeight / 4) * i}
              stroke="#e0e0e0"
              strokeDasharray="4"
            />
          ))}

          {/* Axes */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke="#999"
            strokeWidth="2"
          />
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="#999"
            strokeWidth="2"
          />

          {/* Target line */}
          <path
            d={targetPath}
            fill="none"
            stroke="#999"
            strokeWidth="2"
            strokeDasharray="5"
            opacity="0.5"
          />

          {/* Usage line */}
          <path d={usagePath} fill="none" stroke="#667eea" strokeWidth="3" />

          {/* Data points for usage */}
          {points.map((p, i) => (
            <circle key={`usage-${i}`} cx={p.x} cy={p.usageY} r="5" fill="#667eea" />
          ))}

          {/* X-axis labels */}
          {points.map((p, i) => (
            <text
              key={`label-${i}`}
              x={p.x}
              y={height - padding + 20}
              textAnchor="middle"
              fontSize="12"
              fill="#666"
            >
              {p.label}
            </text>
          ))}
        </svg>
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: "#667eea" }}></span>
            Actual Usage
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{
                backgroundColor: "transparent",
                border: "2px dashed #999"
              }}
            ></span>
            Target
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>Analytics Dashboard</h1>
        <p className="subtitle">Monitor platform usage and hospital engagement</p>
      </div>

      <div className="analytics-controls">
        <div className="date-filter">
          <label>Date Range</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
            <option value="lastQuarter">Last Quarter</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {dateRange === "custom" && (
          <div className="custom-date-range">
            <div className="date-input-group">
              <label>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="date-input-group">
              <label>End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      <div className="analytics-metrics">
        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <p className="metric-label">Total Hospitals</p>
            <p className="metric-value">5</p>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <p className="metric-label">Active Users</p>
            <p className="metric-value">274</p>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">📝</div>
          <div className="metric-content">
            <p className="metric-label">Total Records</p>
            <p className="metric-value">6,300</p>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">📈</div>
          <div className="metric-content">
            <p className="metric-label">Platform Usage</p>
            <p className="metric-value">72%</p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <LineChart data={emrUsageTrendData} />
        </div>

        <div className="chart-card">
          <BarChart
            data={hospitalEngagementData}
            dataKey="hospital"
            valueKey="engagement"
            title="Hospital Engagement Comparison"
          />
        </div>

        <div className="chart-card">
          <BarChart
            data={featureUsageData}
            dataKey="feature"
            valueKey="usage"
            title="Platform Feature Usage"
          />
        </div>
      </div>
    </div>
  );
}

export default Analytics;
