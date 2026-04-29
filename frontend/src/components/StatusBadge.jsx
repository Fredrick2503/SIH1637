import React from "react";

function StatusBadge({ status = "pending", className = "" }) {
  const getStatusStyles = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case "accepted":
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
      case "delivered":
      case "successful":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
      case "shipped":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
      case "failed":
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div
      className={`px-3 py-1 rounded-full border text-xs font-semibold capitalize w-fit flex items-center justify-center ${getStatusStyles(status)} ${className}`}
    >
      {status}
    </div>
  );
}

export default StatusBadge;
