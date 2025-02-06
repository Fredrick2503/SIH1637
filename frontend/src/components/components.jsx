import React from "react";

// ✅ Button Component
export const Button = ({ text, onClick, type = "button", variant = "primary" }) => {
  const baseStyle = "px-4 py-2 rounded-lg transition-all";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };
  return (
    <button type={type} className={`${baseStyle} ${variants[variant]}`} onClick={onClick}>
      {text}
    </button>
  );
};

// ✅ Input Component
export const Input = ({ type = "text", placeholder, value, onChange }) => (
  <input
    type={type}
    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

// ✅ Card Component
export const Card = ({ title, description, children }) => (
  <div className="p-4 bg-white shadow-md rounded-lg">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-gray-600">{description}</p>
    <div className="mt-2">{children}</div>
  </div>
);

// ✅ Modal Component
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="mt-4">{children}</div>
        <Button text="Close" onClick={onClose} variant="secondary" />
      </div>
    </div>
  );
};

// ✅ Navbar Component
export const Navbar = () => (
  <nav className="flex items-center justify-between px-6 py-4 bg-green-600 text-white">
    <h1 className="text-xl font-bold">Farm2Biz</h1>
    <div className="space-x-4">
      <a href="/" className="hover:underline">Home</a>
      <a href="/listings" className="hover:underline">Listings</a>
      <a href="/messages" className="hover:underline">Messages</a>
      <a href="/profile" className="hover:underline">Profile</a>
    </div>
  </nav>
);

// ✅ Footer Component
export const Footer = () => (
  <footer className="p-4 bg-gray-800 text-white text-center">
    <p>© 2024 Farm2Biz. All rights reserved.</p>
  </footer>
);

// ✅ Table Component
export const Table = ({ headers, data }) => (
  <table className="w-full border-collapse border border-gray-300">
    <thead>
      <tr className="bg-gray-200">
        {headers.map((header, index) => (
          <th key={index} className="p-2 border border-gray-300">{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.length > 0 ? (
        data.map((row, index) => (
          <tr key={index} className="text-center odd:bg-gray-100">
            {row.map((cell, i) => (
              <td key={i} className="p-2 border border-gray-300">{cell}</td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={headers.length} className="p-2 text-center">No Data Available</td>
        </tr>
      )}
    </tbody>
  </table>
);

// ✅ Chat Message Component
export const ChatMessage = ({ sender, message, timestamp }) => (
  <div className={`p-2 my-1 max-w-xs rounded-lg ${sender === "me" ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-gray-800 mr-auto"}`}>
    <p className="text-sm">{message}</p>
    <span className="text-xs text-gray-400">{timestamp}</span>
  </div>
);
