"use client";

import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { initializeDemoData } from "@/lib/demoData";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { StaffManagement } from "@/components/staff/StaffManagement";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";

export default function Home() {
  const {
    currentView,
    setStaff,
    setInsights,
    setAnalytics,
    sidebarOpen,
    sidebarCollapsed,
  } = useStore();

  // Initialize demo data on component mount
  useEffect(() => {
    const demoData = initializeDemoData();
    setStaff(demoData.staff);
    setInsights(demoData.insights);
    setAnalytics(demoData.analytics);
  }, [setStaff, setInsights, setAnalytics]);

  const renderCurrentView = () => {
    switch (currentView) {
      case "chat":
        return <ChatInterface />;
      case "staff":
        return <StaffManagement />;
      case "analytics":
        return <AnalyticsDashboard />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main content */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          // Desktop: Always push content based on sidebar state
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-72"
          // Mobile: No left margin (sidebar overlays)
        )}
      >
        <Header />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full">{renderCurrentView()}</div>
        </main>
      </div>
    </div>
  );
}
