"use client";

import { useStore } from "@/store/useStore";
import { SidebarToggle } from "./Sidebar";
import { Bell, Settings, User } from "lucide-react";

const viewTitles = {
  chat: "AI Assistant",
  staff: "Staff Management",
  analytics: "Analytics Dashboard",
};

const viewDescriptions = {
  chat: "Communicate with AI to manage your restaurant scheduling",
  staff: "Manage your team members and their profiles",
  analytics: "View insights and performance metrics",
};

export function Header() {
  const { currentView, insights } = useStore();

  const unreadInsights = insights.filter(
    (insight) => insight.priority === "high"
  ).length;

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarToggle />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {viewTitles[currentView]}
            </h2>
            <p className="text-sm text-gray-500">
              {viewDescriptions[currentView]}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Bell className="h-5 w-5 text-gray-600" />
            {unreadInsights > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadInsights}
              </span>
            )}
          </button>

          {/* Settings */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Settings className="h-5 w-5 text-gray-600" />
          </button>

          {/* Profile */}
          <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-700">
              Manager
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
