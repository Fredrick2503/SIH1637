import React from "react";
import { Outlet } from "react-router";
import { useUserStore } from "../../store/AuthStore";
import { Navigate } from "react-router";
function AuthLayout({ Authreq = true }) {
  const { IsAuthenticated } = useUserStore();
  console.log(IsAuthenticated);
  
  console.log(
    !((IsAuthenticated && !Authreq) || (!IsAuthenticated && Authreq))
  );

  return !((IsAuthenticated && !Authreq) || (!IsAuthenticated && Authreq)) ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}

export default AuthLayout;
