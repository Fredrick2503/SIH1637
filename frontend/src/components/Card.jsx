import React from 'react'
import StatusBadge from './StatusBadge';

const Card = ({ label = "", info_fields = [], status, className = "" }) => {
    return (
      <div className={`w-[100%] flex flex-col rounded-xl shadow-[0px_0px_5px_rgba(0,0,0,0.19)] relative px-3 py-2 bg-white ${className}`}>
          <div className="w-[85%]">
            <h1 className="text-[15px] font-medium mb-1">{label}</h1>
            {info_fields?.map((field, idx) => (
              field.key ? (
                <p key={idx} className={`${field.className} text-gray-600`}>
                  {field.key} : {field.value}
                </p>
              ) : (
                <p key={idx} className={`${field.className} text-gray-600`}>
                  {field.value}
                </p>
              )
            ))}
          </div>
          {status && (
            <div className="absolute right-2 top-2">
              <StatusBadge status={status} />
            </div>
          )}
        </div>
    );
  };

export default Card
