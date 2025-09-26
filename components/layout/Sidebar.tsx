"use client";

import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import {
  MessageCircle,
  Users,
  BarChart3,
  Menu,
  X,
  Bot,
  ChefHat,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const navigation = [
  {
    name: "AI Assistant",
    icon: MessageCircle,
    view: "chat" as const,
    description: "Chat with AI for scheduling",
  },
  {
    name: "Staff Management",
    icon: Users,
    view: "staff" as const,
    description: "Manage your team",
  },
  {
    name: "Analytics",
    icon: BarChart3,
    view: "analytics" as const,
    description: "Performance insights",
  },
];

export function Sidebar() {
  const {
    currentView,
    setCurrentView,
    sidebarOpen,
    setSidebarOpen,
    sidebarCollapsed,
    setSidebarCollapsed,
  } = useStore();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out lg:translate-x-0",
          sidebarCollapsed ? "w-20" : "w-72",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <ChefHat className="h-5 w-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-lg font-semibold text-gray-900">RestyAI</h1>
                <p className="text-xs text-gray-500">Restaurant Management</p>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1">
            {/* Collapse/Expand button for desktop */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:block p-1 rounded-md hover:bg-gray-100 transition-colors"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen className="h-4 w-4 text-gray-600" />
              ) : (
                <PanelLeftClose className="h-4 w-4 text-gray-600" />
              )}
            </button>
            {/* Close button for mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.view;

            return (
              <button
                key={item.name}
                onClick={() => {
                  setCurrentView(item.view);
                  setSidebarOpen(false); // Close on mobile
                }}
                className={cn(
                  "w-full flex items-center rounded-lg transition-colors",
                  sidebarCollapsed
                    ? "p-3 justify-center"
                    : "px-4 py-3 text-left",
                  isActive
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
                title={sidebarCollapsed ? item.name : undefined}
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    sidebarCollapsed ? "" : "mr-3",
                    isActive ? "text-blue-700" : "text-gray-400"
                  )}
                />
                {!sidebarCollapsed && (
                  <div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div
                      className={cn(
                        "text-xs",
                        isActive ? "text-blue-600" : "text-gray-500"
                      )}
                    >
                      {item.description}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* AI Status */}
        <div className="px-3 py-4 border-t border-gray-200">
          <div
            className={cn(
              "flex items-center rounded-lg bg-green-50 p-3",
              sidebarCollapsed ? "justify-center" : "space-x-3"
            )}
            title={
              sidebarCollapsed ? "AI Assistant - Ready to help" : undefined
            }
          >
            <Bot className="h-5 w-5 text-green-600" />
            {!sidebarCollapsed && (
              <>
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-900">
                    AI Assistant
                  </p>
                  <p className="text-xs text-green-700">Ready to help</p>
                </div>
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
              </>
            )}
            {sidebarCollapsed && (
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export function SidebarToggle() {
  const { setSidebarOpen } = useStore();

  return (
    <button
      onClick={() => setSidebarOpen(true)}
      className="lg:hidden p-2 rounded-md hover:bg-gray-100"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}
