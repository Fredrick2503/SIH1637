import React from 'react'
import logo from "../assets/img/Farm2Biz@4x.png";
import Farm2Biz from './Farm2Bizanimate';
import { useUserStore } from '../store/AuthStore';
function Header() {
  const {setlogout}=useUserStore()
  return (
    <header className="w-full h-[80px] bg-white flex flex-row justify-ends items-center p-5 shadow-[0_0_10px_rgba(0,0,0,0.5)] fixed  top-0 z-10 ">
        <div className="w-[90%]"><img src={logo} alt="" className=' max-w-[200px]  w-[30%] min-w-[136px] '  /></div>
        <div className='w-[10%]'  ><button type="button" onClick={()=>setlogout()}> Log Out </button></div>
      </header>
  )
}

export default Header
