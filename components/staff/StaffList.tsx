"use client";

import { useStore } from "@/store/useStore";
import { Staff } from "@/types";
import {
  User,
  Mail,
  DollarSign,
  Clock,
  Star,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const roleColors = {
  MANAGER: "bg-purple-100 text-purple-800",
  WAITER: "bg-blue-100 text-blue-800",
  BARTENDER: "bg-green-100 text-green-800",
  COOK: "bg-orange-100 text-orange-800",
  HOST: "bg-pink-100 text-pink-800",
  CLEANER: "bg-gray-100 text-gray-800",
};

interface StaffCardProps {
  staff: Staff;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

function StaffCard({ staff, onEdit, onDelete, onView }: StaffCardProps) {
  const weeklyHours = Math.round(Math.random() * 30 + 10); // Mock data
  const performance = (Math.random() * 2 + 8).toFixed(1); // Mock performance 8.0-10.0
  const estimatedWage = weeklyHours * staff.wageRate;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="mb-4">
        {/* Role badge and menu */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              roleColors[staff.role]
            }`}
          >
            {staff.role}
          </span>
          <div className="relative">
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreHorizontal className="h-4 w-4" />
            </button>
            {/* Dropdown would go here */}
          </div>
        </div>

        {/* Staff info */}
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {staff.name}
            </h3>
            <p className="text-sm text-gray-500 flex items-center truncate">
              <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="truncate">{staff.email}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-green-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {formatCurrency(staff.wageRate)}/hr
            </p>
            <p className="text-xs text-gray-500">Wage Rate</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">{weeklyHours}h</p>
            <p className="text-xs text-gray-500">This Week</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium text-gray-900">
            {performance}/10
          </span>
          <span className="text-xs text-gray-500">Performance</span>
        </div>

        <div className="text-right">
          <p className="text-sm font-semibold text-gray-900">
            {formatCurrency(estimatedWage)}
          </p>
          <p className="text-xs text-gray-500">Est. Weekly</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-1">Skills</p>
        <div className="flex flex-wrap gap-1">
          {staff.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {skill}
            </span>
          ))}
          {staff.skills.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              +{staff.skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={onView}
          className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center"
        >
          <Eye className="h-3 w-3 mr-1" />
          View
        </button>
        <button
          onClick={onEdit}
          className="flex-1 bg-gray-50 text-gray-600 px-3 py-2 rounded text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
        >
          <Edit className="h-3 w-3 mr-1" />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded transition-colors"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

export function StaffList() {
  const { staff, setSelectedStaff, removeStaff } = useStore();

  const handleView = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
  };

  const handleEdit = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    // Open edit modal/form
  };

  const handleDelete = (staffId: string) => {
    if (confirm("Are you sure you want to remove this staff member?")) {
      removeStaff(staffId);
    }
  };

  if (staff.length === 0) {
    return (
      <div className="text-center py-12">
        <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Staff Members
        </h3>
        <p className="text-gray-600 mb-6">
          Get started by adding your first team member
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Add Staff Member
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {staff.map((staffMember) => (
        <StaffCard
          key={staffMember.id}
          staff={staffMember}
          onView={() => handleView(staffMember)}
          onEdit={() => handleEdit(staffMember)}
          onDelete={() => handleDelete(staffMember.id)}
        />
      ))}
    </div>
  );
}
