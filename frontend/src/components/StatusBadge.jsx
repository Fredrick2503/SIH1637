import React from "react";

function StatusBadge({status="pending",className}) {
  return (
    <div
      className={`px-1.5 py-1 ${
        status == "accepted" || status == "successful"
          ? "bg-green-200"
          : status == "pending"
          ? "bg-yellow-200"
          : "bg-red-200"
      } rounded-md w-fit h-fit flex justify-center items-center ${className} `}
    >
      <span
        className={`${
          status == "accepted" || status == "successful"
            ? "text-green-900"
            : status == "pending"
            ? "text-yellow-900"
            : "text-red-900"
        } text-xs`}
      >
        {status}
      </span>
    </div>
  );
}

export default StatusBadge;
