import React, { use } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router';

import Spline from '@splinetool/react-spline';
export default function NotFound() {
  const navigate=useNavigate();
  return (
    <div
    className="w-screen h-screen flex flex-col items-center relative overflow-y-auto "
    style={{ scrollbarWidth: "none" }}
  >
    <Header />
    <div className=" h-[calc(100%-80px)] w-full mt-[80px]  overflow-y-auto bg-gray-300 relative ">
      <p className='text-3xl font-medium text-center mt-20 mx-3' >404 - Page Not Found</p>
      <p className='text-xl font-normal text-center mt-6 mx-3 text-gray-700' >The page you're looking for doesn't exist. It might have been moved or deleted.</p>
    <Spline
        scene="https://prod.spline.design/56BAKuQYEIl73Hji/scene.splinecode" className='absolute top-0 ' />

       <div className=' w-full absolute h-[30%] flex flex-col justify-center items-center bottom-0 ' >
        <button
                   type="button"
                   className="bg-black text-white p-2 rounded-md  w-fit mt-3.5 px-6 "
                   onClick={() => navigate("/")}
                 >
                   Return to Home</button>
        </div> 
      </div></div>
  )
}


