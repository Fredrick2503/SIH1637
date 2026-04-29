import React, { useEffect } from 'react'
import { useUserStore } from '../../store/AuthStore'
import { Outlet } from 'react-router'
import { useNavigate } from 'react-router';
function ProtectedLayout(allowedUser="ALL") {
    const {userData}=useUserStore();
    const navigate=useNavigate();
    useEffect(()=>{
        switch(allowedUser){
            case "ALL":
                if(userData==null){
                    window.location.href="/login"
                }
                break;
            case "BUYER":
                if(userData==null || userData.user_type=="BUYER"){
                    navigate("/");
                }
                break;
            case "SELLER":
                if(userData==null || userData.user_type!="FARMER"){
                    window.location.href="/login"
                }
                break;
            default:
                if(userData==null){
                    window.location.href="/login"
        }
    }},[]);
  return (
    <Outlet/>
  )
}

export default ProtectedLayout
