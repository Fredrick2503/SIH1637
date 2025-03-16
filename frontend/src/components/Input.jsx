import React from 'react'
import imgs from "../assets/img/SVG@1x (2).png"
export const Input = ({
  label,
  icon = null,
  className = "",
  register,
  ...props
}) => {
  return (
    <div className="flex flex-col w-full relative mt-1.5 mb-1.5 hover:text-black hover:border-black ">
      {icon && (
        <img
          src={icon}
          alt=""
          className="w-fit aspect-square absolute ml-3.5 mt-3.5"
        />
      )}
      <input
        type={"text"}
        className={`border ${
          icon ? "pl-9" : ""
        } border-gray-300 rounded-md p-2 ${className}`}
        placeholder={label}
        {...props}
      />
    </div>
  );
};

