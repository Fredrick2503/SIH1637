import React, { useEffect } from 'react'
import { useUserStore } from '../store/AuthStore'
import DashboardFarmer from './DashboardFarmer';
import FarmerHome from './farmer/Home';
import BuyerHomePage from './buyer/Home';
function Dashboard() {
const {userData}=useUserStore();
console.log(userData.role);

  return (<>
    {userData.role==="producer"?<FarmerHome/>:<BuyerHomePage/> }</>
  )
}

export default Dashboard
