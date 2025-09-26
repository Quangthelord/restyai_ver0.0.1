"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { StaffList } from "./StaffList";
import {
  Plus,
  Search,
  Filter,
  Users,
  TrendingUp,
  Clock,
  DollarSign,
} from "lucide-react";

export function StaffManagement() {
  const { staff, insights } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");

  // Mock calculations
  const activeStaff = staff.filter((s) => s.isActive).length;
  const totalWageCost = staff.reduce((sum, s) => sum + s.wageRate * 30, 0); // Estimate monthly
  const averagePerformance = 8.5; // Mock average

  const staffInsights = insights.filter(
    (i) =>
      i.title.toLowerCase().includes("staff") ||
      i.description.toLowerCase().includes("staff")
  );

  const filteredStaff = staff.filter((staffMember) => {
    const matchesSearch =
      staffMember.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staffMember.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      selectedRole === "all" || staffMember.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6 space-y-6 min-h-full">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Staff</p>
              <p className="text-2xl font-bold text-gray-900">{staff.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Staff</p>
              <p className="text-2xl font-bold text-gray-900">{activeStaff}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Monthly Cost</p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalWageCost.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Avg Performance
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {averagePerformance}/10
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      {staffInsights.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            AI Recommendations
          </h3>
          <div className="space-y-2">
            {staffInsights.slice(0, 2).map((insight) => (
              <div key={insight.id} className="flex items-start space-x-2">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    insight.priority === "high"
                      ? "bg-red-500"
                      : insight.priority === "medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900">
                    {insight.title}
                  </p>
                  <p className="text-sm text-blue-700">{insight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex flex-1 space-x-4">
          <div className="flex-1 max-w-xs">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search staff..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="WAITER">Waiter</option>
            <option value="BARTENDER">Bartender</option>
            <option value="COOK">Cook</option>
            <option value="HOST">Host</option>
            <option value="CLEANER">Cleaner</option>
            <option value="MANAGER">Manager</option>
          </select>

          <button className="flex items-center space-x-2 border border-gray-300 rounded-lg px-3 py-2 text-sm hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </button>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Staff</span>
        </button>
      </div>

      {/* Staff List */}
      <StaffList />

      {/* Results Summary */}
      <div className="text-center py-4 text-sm text-gray-500">
        Showing {filteredStaff.length} of {staff.length} staff members
      </div>
    </div>
  );
}
