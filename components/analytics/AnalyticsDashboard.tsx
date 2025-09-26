"use client";

import { useStore } from "@/store/useStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Clock,
  Target,
  Download,
  Calendar,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const ROLE_COLORS = {
  WAITER: "#3B82F6",
  BARTENDER: "#10B981",
  COOK: "#F59E0B",
  HOST: "#EF4444",
  CLEANER: "#6B7280",
  MANAGER: "#8B5CF6",
};

// Mock data for charts
const weeklyData = [
  { date: "Mon", shifts: 12, cost: 1200, staffCount: 8 },
  { date: "Tue", shifts: 10, cost: 1100, staffCount: 7 },
  { date: "Wed", shifts: 14, cost: 1400, staffCount: 9 },
  { date: "Thu", shifts: 16, cost: 1600, staffCount: 10 },
  { date: "Fri", shifts: 20, cost: 2200, staffCount: 12 },
  { date: "Sat", shifts: 24, cost: 2800, staffCount: 14 },
  { date: "Sun", shifts: 18, cost: 2100, staffCount: 11 },
];

const roleDistribution = [
  { role: "WAITER", count: 5, percentage: 42 },
  { role: "BARTENDER", count: 3, percentage: 25 },
  { role: "COOK", count: 2, percentage: 17 },
  { role: "HOST", count: 1, percentage: 8 },
  { role: "CLEANER", count: 1, percentage: 8 },
];

const performanceData = [
  { month: "Jan", performance: 8.2, fulfillment: 92 },
  { month: "Feb", performance: 8.4, fulfillment: 94 },
  { month: "Mar", performance: 8.1, fulfillment: 89 },
  { month: "Apr", performance: 8.6, fulfillment: 96 },
  { month: "May", performance: 8.5, fulfillment: 94 },
];

export function AnalyticsDashboard() {
  const { staff, insights } = useStore();

  // Mock calculations
  const totalShifts = 104;
  const completedShifts = 98;
  const totalWageCost = 12500;
  const averageHours = 32.5;
  const shiftFulfillmentRate = 94.2;

  const analyticsInsights = insights.filter(
    (i) =>
      i.title.toLowerCase().includes("performance") ||
      i.title.toLowerCase().includes("cost") ||
      i.title.toLowerCase().includes("shift")
  );

  return (
    <div className="p-6 space-y-6 min-h-full">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Shifts</p>
              <p className="text-2xl font-bold text-gray-900">{totalShifts}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600">
                  +12% vs last week
                </span>
              </div>
            </div>
            <Target className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Wage Cost</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalWageCost)}
              </p>
              <div className="flex items-center mt-1">
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-xs text-red-600">+8% vs last week</span>
              </div>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Avg Hours/Staff
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {averageHours}h
              </p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+5% vs last week</span>
              </div>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Fulfillment Rate
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {shiftFulfillmentRate}%
              </p>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+2% vs last week</span>
              </div>
            </div>
            <Users className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* AI Insights */}
      {analyticsInsights.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-900">
              AI Insights & Recommendations
            </h3>
            <button className="text-blue-600 text-sm hover:text-blue-800">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analyticsInsights.slice(0, 4).map((insight) => (
              <div
                key={insight.id}
                className="bg-white rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full mt-1 ${
                      insight.priority === "high"
                        ? "bg-red-500"
                        : insight.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {insight.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {insight.description}
                    </p>
                    {insight.actionable && (
                      <button className="text-blue-600 text-xs mt-2 hover:text-blue-800">
                        Take Action →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trends */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Weekly Shift Trends
            </h3>
            <button className="text-blue-600 text-sm hover:text-blue-800">
              <Download className="h-4 w-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="shifts" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Role Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Staff by Role
            </h3>
            <button className="text-blue-600 text-sm hover:text-blue-800">
              <Download className="h-4 w-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                label={(entry) => `${entry.role} (${entry.count})`}
              >
                {roleDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={ROLE_COLORS[entry.role as keyof typeof ROLE_COLORS]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Cost Analysis */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Weekly Cost Analysis
            </h3>
            <button className="text-blue-600 text-sm hover:text-blue-800">
              <Download className="h-4 w-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Line
                type="monotone"
                dataKey="cost"
                stroke="#10B981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Performance & Fulfillment
            </h3>
            <button className="text-blue-600 text-sm hover:text-blue-800">
              <Download className="h-4 w-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="performance"
                stroke="#8B5CF6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="fulfillment"
                stroke="#F59E0B"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Export Options
        </h3>
        <div className="flex flex-wrap gap-4">
          <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export to Excel</span>
          </button>
          <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export to PDF</span>
          </button>
          <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Schedule Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}
