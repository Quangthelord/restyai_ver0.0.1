import { create } from "zustand";
import { Staff, Shift, ChatMessage, AIInsight, AnalyticsData } from "@/types";

interface StoreState {
  // Staff Management
  staff: Staff[];
  selectedStaff: Staff | null;
  setStaff: (staff: Staff[]) => void;
  addStaff: (staff: Staff) => void;
  updateStaff: (id: string, updates: Partial<Staff>) => void;
  removeStaff: (id: string) => void;
  setSelectedStaff: (staff: Staff | null) => void;

  // Shifts & Scheduling
  shifts: Shift[];
  setShifts: (shifts: Shift[]) => void;
  addShift: (shift: Shift) => void;
  updateShift: (id: string, updates: Partial<Shift>) => void;
  removeShift: (id: string) => void;

  // Chat
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  clearChatMessages: () => void;

  // AI Insights
  insights: AIInsight[];
  setInsights: (insights: AIInsight[]) => void;
  addInsight: (insight: AIInsight) => void;
  removeInsight: (id: string) => void;

  // Analytics
  analytics: AnalyticsData | null;
  setAnalytics: (analytics: AnalyticsData) => void;

  // UI State
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  currentView: "chat" | "staff" | "analytics";
  setCurrentView: (view: "chat" | "staff" | "analytics") => void;
}

export const useStore = create<StoreState>((set, get) => ({
  // Staff Management
  staff: [],
  selectedStaff: null,
  setStaff: (staff) => set({ staff }),
  addStaff: (staff) => set((state) => ({ staff: [...state.staff, staff] })),
  updateStaff: (id, updates) =>
    set((state) => ({
      staff: state.staff.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })),
  removeStaff: (id) =>
    set((state) => ({
      staff: state.staff.filter((s) => s.id !== id),
      selectedStaff:
        state.selectedStaff?.id === id ? null : state.selectedStaff,
    })),
  setSelectedStaff: (staff) => set({ selectedStaff: staff }),

  // Shifts & Scheduling
  shifts: [],
  setShifts: (shifts) => set({ shifts }),
  addShift: (shift) => set((state) => ({ shifts: [...state.shifts, shift] })),
  updateShift: (id, updates) =>
    set((state) => ({
      shifts: state.shifts.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })),
  removeShift: (id) =>
    set((state) => ({
      shifts: state.shifts.filter((s) => s.id !== id),
    })),

  // Chat
  chatMessages: [],
  addChatMessage: (message) =>
    set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  clearChatMessages: () => set({ chatMessages: [] }),

  // AI Insights
  insights: [],
  setInsights: (insights) => set({ insights }),
  addInsight: (insight) =>
    set((state) => ({ insights: [...state.insights, insight] })),
  removeInsight: (id) =>
    set((state) => ({
      insights: state.insights.filter((i) => i.id !== id),
    })),

  // Analytics
  analytics: null,
  setAnalytics: (analytics) => set({ analytics }),

  // UI State
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  sidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  currentView: "chat",
  setCurrentView: (view) => set({ currentView: view }),
}));
