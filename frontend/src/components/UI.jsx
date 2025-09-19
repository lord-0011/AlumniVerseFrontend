import React from "react";

// Card Component
export const Card = ({ children, className, dark, ...props }) => {
  return (
    <div
      className={`rounded-xl p-6 shadow-lg flex flex-col justify-between transition duration-300 ${
        dark ? "bg-[#1A1F3B] text-[#E2E8F0]" : "bg-white text-gray-800"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Button Component
export const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium bg-[#0F111A] text-[#E2E8F0] border border-[#2A2F4B] hover:bg-[#1A1F3B] w-full transition duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
