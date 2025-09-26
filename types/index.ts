export interface Staff {
  id: string;
  name: string;
  email: string;
  role: Role;
  skills: string[];
  wageRate: number;
  maxHours: number;
  availability: WeeklyAvailability;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Shift {
  id: string;
  staffId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  role: Role;
  status: ShiftStatus;
  notes?: string;
  staff?: Staff;
}

export interface PerformanceMetric {
  id: string;
  staffId: string;
  date: Date;
  hoursWorked: number;
  tasksCompleted: number;
  attendanceRate: number;
  qualityScore?: number;
  staff?: Staff;
}

export interface WeeklyAvailability {
  monday: DayAvailability;
  tuesday: DayAvailability;
  wednesday: DayAvailability;
  thursday: DayAvailability;
  friday: DayAvailability;
  saturday: DayAvailability;
  sunday: DayAvailability;
}

export interface DayAvailability {
  available: boolean;
  startTime?: string; // "09:00"
  endTime?: string; // "17:00"
  preferredShifts?: ("morning" | "afternoon" | "evening")[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  metadata?: {
    type?: "schedule" | "staff" | "analytics" | "general";
    data?: any;
  };
}

export interface ScheduleRequest {
  period: {
    startDate: Date;
    endDate: Date;
  };
  requirements: ShiftRequirement[];
  constraints?: ScheduleConstraint[];
}

export interface ShiftRequirement {
  role: Role;
  date: Date;
  startTime: string;
  endTime: string;
  minStaff: number;
  maxStaff?: number;
  requiredSkills?: string[];
}

export interface ScheduleConstraint {
  type:
    | "max_hours_per_staff"
    | "min_rest_between_shifts"
    | "preferred_staff"
    | "avoid_staff";
  value: any;
}

export type Role =
  | "MANAGER"
  | "WAITER"
  | "BARTENDER"
  | "COOK"
  | "HOST"
  | "CLEANER";

export type ShiftStatus =
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export interface AIInsight {
  id: string;
  type: "warning" | "suggestion" | "info" | "success";
  title: string;
  description: string;
  actionable: boolean;
  action?: {
    label: string;
    type: "navigate" | "create" | "update";
    target?: string;
  };
  priority: "low" | "medium" | "high";
  createdAt: Date;
}

export interface AnalyticsData {
  totalStaff: number;
  activeStaff: number;
  totalShifts: number;
  completedShifts: number;
  totalWageCost: number;
  averageHoursPerStaff: number;
  shiftFulfillmentRate: number;
  roleDistribution: Record<Role, number>;
  weeklyTrends: {
    date: string;
    shifts: number;
    cost: number;
    staffCount: number;
  }[];
}
