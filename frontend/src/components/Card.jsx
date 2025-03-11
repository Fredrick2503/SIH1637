import React from 'react'

const Card = ({ label = "", info_fields = [], status }) => {
    return (
      <div className="w-[98%] flex flex-col rounded-xl shadow-[0px_0px_5px_rgba(0,0,0,0.19)]  mt-1.5 mb-1.5 relative">
        <div className="px-3 py-2 rounded-xl relative">
          <div className="w-[85%]">
            <h1 className="text-[15px] font-medium">{label}</h1>
            {info_fields?.map((field) => (
              field.key ?<p className={`${field.className}`} >
                {field.key} : {field.value}
              </p>:
              <p className={`${field.className}`} >
              {field.value}
            </p>
            ))}
          </div>
          {status && (
            <div
              className={`px-1.5 py-1 ${
                status == "accepted" || status == "successful"
                  ? "bg-green-200"
                  : status == "pending"
                  ? "bg-yellow-200"
                  : "bg-red-200"
              } rounded-md w-fit h-fit absolute right-2 top-2 flex justify-center items-center `}
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
          )}
        </div>
      </div>
    );
  };

export default Card
