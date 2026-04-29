import React from 'react'
import logo from "../assets/img/Farm2Biz@4x.png";
import logout from "../assets/img/logout.png";
import Farm2Biz from './Farm2Bizanimate';
import { useUserStore } from '../store/AuthStore';
import { useNavigate } from 'react-router';
function Header() {
  const {setlogout}=useUserStore()
  const navigate=useNavigate();
  return (
    <header className="w-full h-[80px] bg-white flex flex-row justify-ends items-center p-5 shadow-[0_0_10px_rgba(0,0,0,0.5)] fixed  top-0 z-10 ">
        <div className="w-[60%]"><img src={logo} alt="" className=' max-w-[200px]  w-[30%] min-w-[136px] '  /></div>
        <div className='w-[40%] flex flex-row justify-end '  ><button type="button" onClick={()=>{
          navigate("/");
          setlogout()}} className='flex flex-row gap-2 cursor-pointer ' > <p className='text-xs'>Log Out</p> <img src={logout} alt="" srcset="" width={"15px"}  className='object-contain ' /> </button></div>
      </header>
  )
}

export default Header
