import React from 'react'
import { Outlet } from 'react-router'
import { useUserStore } from '../../store/AuthStore'
import { Navigate } from 'react-router';
function AuthLayout() {
    const {userData}=useUserStore();
  return (
    userData?<div>
      <Outlet/>
    </div>:<Navigate to="/login"/>
  )
}

export default AuthLayout
