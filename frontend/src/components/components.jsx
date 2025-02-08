// import React from "react";

// // ✅ Button Component
// export const Button = ({ text, onClick, type = "button", variant = "primary" }) => {
//   const baseStyle = "px-4 py-2 rounded-lg transition-all";
//   const variants = {
//     primary: "bg-blue-600 text-white hover:bg-blue-700",
//     secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
//     danger: "bg-red-500 text-white hover:bg-red-600",
//   };
//   return (
//     <button type={type} className={`${baseStyle} ${variants[variant]}`} onClick={onClick}>
//       {text}
//     </button>
//   );
// };

// // ✅ Input Component
// export const Input = ({ type = "text", placeholder, value, onChange }) => (
//   <input
//     type={type}
//     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//     placeholder={placeholder}
//     value={value}
//     onChange={onChange}
//   />
// );

// // ✅ Card Component
// export const Card = ({ title, description, children }) => (
//   <div className="p-4 bg-white shadow-md rounded-lg">
//     <h3 className="text-lg font-semibold">{title}</h3>
//     <p className="text-gray-600">{description}</p>
//     <div className="mt-2">{children}</div>
//   </div>
// );

// // ✅ Modal Component
// export const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-bold">{title}</h2>
//         <div className="mt-4">{children}</div>
//         <Button text="Close" onClick={onClose} variant="secondary" />
//       </div>
//     </div>
//   );
// };

// // ✅ Navbar Component
// export const Navbar = () => (
//   <nav className="flex items-center justify-between px-6 py-4 bg-green-600 text-white">
//     <h1 className="text-xl font-bold">Farm2Biz</h1>
//     <div className="space-x-4">
//       <a href="/" className="hover:underline">Home</a>
//       <a href="/listings" className="hover:underline">Listings</a>
//       <a href="/messages" className="hover:underline">Messages</a>
//       <a href="/profile" className="hover:underline">Profile</a>
//     </div>
//   </nav>
// );

// // ✅ Footer Component
// export const Footer = () => (
//   <footer className="p-4 bg-gray-800 text-white text-center">
//     <p>© 2024 Farm2Biz. All rights reserved.</p>
//   </footer>
// );

// // ✅ Table Component
// export const Table = ({ headers, data }) => (
//   <table className="w-full border-collapse border border-gray-300">
//     <thead>
//       <tr className="bg-gray-200">
//         {headers.map((header, index) => (
//           <th key={index} className="p-2 border border-gray-300">{header}</th>
//         ))}
//       </tr>
//     </thead>
//     <tbody>
//       {data.length > 0 ? (
//         data.map((row, index) => (
//           <tr key={index} className="text-center odd:bg-gray-100">
//             {row.map((cell, i) => (
//               <td key={i} className="p-2 border border-gray-300">{cell}</td>
//             ))}
//           </tr>
//         ))
//       ) : (
//         <tr>
//           <td colSpan={headers.length} className="p-2 text-center">No Data Available</td>
//         </tr>
//       )}
//     </tbody>
//   </table>
// );

// // ✅ Chat Message Component
// export const ChatMessage = ({ sender, message, timestamp }) => (
//   <div className={`p-2 my-1 max-w-xs rounded-lg ${sender === "me" ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-gray-800 mr-auto"}`}>
//     <p className="text-sm">{message}</p>
//     <span className="text-xs text-gray-400">{timestamp}</span>
//   </div>
// );

// components.js
import React from 'react';

/**
 * Button Component
 * Variants: primary, secondary, danger
 */
export const Button = ({
  children,
  type = 'primary',
  onClick,
  className = '',
  ...props
}) => {
  let baseClasses = 'px-4 py-2 rounded focus:outline-none transition';
  let typeClasses = '';
  switch (type) {
    case 'primary':
      typeClasses = 'bg-blue-600 hover:bg-blue-700 text-white';
      break;
    case 'secondary':
      typeClasses = 'bg-gray-200 hover:bg-gray-300 text-gray-800';
      break;
    case 'danger':
      typeClasses = 'bg-red-600 hover:bg-red-700 text-white';
      break;
    default:
      typeClasses = 'bg-blue-600 hover:bg-blue-700 text-white';
  }
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${typeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * Input Component
 * Renders a labeled text input.
 */
export const Input = ({
  label,
  type = 'text',
  placeholder,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-gray-700 mb-2 font-medium">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        {...props}
      />
    </div>
  );
};

/**
 * Textarea Component
 * Renders a labeled textarea field.
 */
export const Textarea = ({
  label,
  placeholder,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-gray-700 mb-2 font-medium">{label}</label>
      )}
      <textarea
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        {...props}
      />
    </div>
  );
};

/**
 * Dropdown Component
 * Renders a labeled select box.
 */
export const Dropdown = ({
  label,
  options = [],
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-gray-700 mb-2 font-medium">{label}</label>
      )}
      <select
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

/**
 * FileUpload Component
 * Renders a drag & drop file upload area.
 */
export const FileUpload = ({ label, onChange, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-gray-700 mb-2 font-medium">{label}</label>
      )}
      <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center hover:border-blue-500 cursor-pointer">
        <input type="file" className="hidden" onChange={onChange} />
        Drag &amp; drop files here or click to upload
      </div>
    </div>
  );
};

/**
 * Modal Component
 * Renders a modal overlay with a header (title) and content.
 */
export const Modal = ({
  isOpen,
  title,
  children,
  onClose,
  className = '',
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
      <div
        className={`relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg ${className}`}
      >
        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          {title && (
            <p className="text-xl font-bold text-gray-800">{title}</p>
          )}
          <button onClick={onClose} className="text-gray-700 hover:text-gray-900">
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="M14.53 3.47a.75.75 0 00-1.06 0L9 7.94 4.53 3.47a.75.75 0 10-1.06 1.06L7.94 9l-4.47 4.47a.75.75 0 101.06 1.06L9 10.06l4.47 4.47a.75.75 0 001.06-1.06L10.06 9l4.47-4.47a.75.75 0 000-1.06z" />
            </svg>
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

/**
 * Card Component
 * A simple card container with an optional title.
 */
export const Card = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>
      {title && (
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
      )}
      {children}
    </div>
  );
};

/**
 * Header Component
 * Contains logo, navigation links, search, notifications, and user info.
 */
export const Header = ({
  logo,
  navLinks = [],
  onSearch,
  user = {},
  onLogout,
  className = '',
}) => {
  return (
    <header className={`bg-white shadow-md py-4 px-6 flex items-center justify-between ${className}`}>
      <div className="flex items-center">
        {logo && (
          <img src={logo} alt="Logo" className="h-8 w-auto mr-4" />
        )}
        <nav>
          <ul className="flex space-x-4">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          onChange={onSearch}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
        <button className="relative focus:outline-none">
          <svg
            className="h-6 w-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold text-white bg-red-600 rounded-full">
            3
          </span>
        </button>
        <div className="flex items-center space-x-2">
          {user.avatar && (
            <img
              src={user.avatar}
              alt="User Avatar"
              className="h-8 w-8 rounded-full"
            />
          )}
          <button onClick={onLogout} className="text-gray-700 hover:text-blue-600">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

/**
 * Footer Component
 * Contains quick links and copyright info.
 */
export const Footer = ({ links = [], className = '' }) => {
  return (
    <footer className={`bg-gray-100 py-6 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-600">&copy; {new Date().getFullYear()} Farm2Biz. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

/**
 * ChatMessage Component
 * Renders a single chat message bubble.
 */
export const ChatMessage = ({
  message,
  isOwn = false,
  timestamp,
  className = '',
}) => {
  return (
    <div className={`mb-4 flex ${isOwn ? 'justify-end' : 'justify-start'} ${className}`}>
      <div
        className={`p-3 rounded-lg max-w-xs ${
          isOwn ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
        }`}
      >
        <p>{message}</p>
        {timestamp && (
          <span className="text-xs block mt-1 opacity-75">{timestamp}</span>
        )}
      </div>
    </div>
  );
};

/**
 * Table Component
 * Renders a table with headers and data rows.
 * Expects headers to be an array of strings and data to be an array of objects.
 */
export const Table = ({ headers = [], data = [], className = '' }) => {
  return (
    <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
      <thead className="bg-gray-50">
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, colIndex) => (
              <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                {row[header.toLowerCase()]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
