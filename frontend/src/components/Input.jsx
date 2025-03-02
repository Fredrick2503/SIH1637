import React from 'react'
import imgs from "../assets/img/SVG@1x (2).png"
export const Input = ({ label,name, id, avtr=null,register=()=>{},type,...props}) => {
  console.log(props);

    return (
      <div className="flex flex-col w-full relative mt-1.5 mb-1.5">
        {avtr&&<img
          src={avtr}
          alt=""
          className="w-fit aspect-square absolute ml-3.5 mt-3.5"
        />}
        <input
          type={type||"text"}
          id={id}
          className={`border-[1px] ${avtr?"pl-9":""} border-gray-300 rounded-md p-2`}
          placeholder={label}
          {...register(name)}
          {...props}
        />
      </div>
    );
  };

