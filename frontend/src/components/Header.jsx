import React from 'react'
import logo from "../assets/img/Farm2Biz@4x.png";
import Farm2Biz from './Farm2Bizanimate';
function Header() {
  return (
    <header className="w-full h-[80px] bg-white flex justify-ends items-center p-5 shadow-[0_0_10px_rgba(0,0,0,0.5)] fixed  top-0 z-10 ">
        <img src={logo} alt="" className=" max-w-[200px]  w-[30%] min-w-[136px] " />
      </header>
  )
}

export default Header
