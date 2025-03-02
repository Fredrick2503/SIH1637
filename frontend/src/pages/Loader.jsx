import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import { Outlet } from 'react-router';

function Loader() {
    const [loading,setloading]=useState(true);
    useEffect(()=>{
        setTimeout(() => {
            setloading(false)
        }, 2000);
    })
  return (
    loading?<Loading/>:<Outlet/>
  )
}

export default Loader
