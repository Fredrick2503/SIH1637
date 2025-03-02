import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Listings from "./pages/buyer/Listings";
import ListingDetail from "./pages/buyer/ListingDetail";
import CreateListing from "./pages/CreateListing";
import Transactions from "./pages/Transactions";
import TransactionDetail from "./pages/TransactionDetail";
import Messages from "./pages/Messages";
import Chat from "./pages/Chat";
import Notifications from "./pages/Notifications";
import DashboardFarmer from "./pages/DashboardFarmer";
import DashboardRetailer from "./pages/DashboardRetailer";
import NotFound from "./pages/NotFound";
import ServerError from "./pages/ServerError";
import CreateProfile from "./pages/CreateProfile";
import BuyerHomePage from "./pages/buyer/Home";
import MyBids from "./pages/buyer/MyBids";
import MyTransactons from "./pages/buyer/MyTransactons";
import Loader from "./pages/Loader";
import Test from "./pages/Test";
import BidDetail from "./pages/BidDetail";
import AuthLayout from "./layouts/auth/AuthLayout";

// Define Base URL
export const BASE_URL = "http://localhost:5174";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Authentication */}
        <Route element={<Loader />}>
          <Route path={`login`} element={<Login />} />
          <Route path={`signup`} element={<Signup />} />
          <Route path={`profile_setup`} element={<CreateProfile />} />
          <Route
            path={`${BASE_URL}/forgot-password`}
            element={<ForgotPassword />}
          />
          {/* Profile & User Settings */}
          <Route element={<AuthLayout />}>
            <Route path={`/`} element={<BuyerHomePage />} />
            <Route path={`test`} element={<Test />} />

            {/* Home & Listings */}
            {/* <Route path="/" element={<Home />} /> */}
            <Route path={`marketspace/listings`} element={<Listings />} />
            <Route
              path={`dashboard/transactions`}
              element={<MyTransactons />}
            />
            <Route
              path={`/marketspace/listings/:id`}
              element={<ListingDetail />}
            />

            {/* Transactions */}
            <Route
              path={`${BASE_URL}/transactions`}
              element={<Transactions />}
            />
            <Route
              path={`${BASE_URL}/transactions/:transactionId`}
              element={<TransactionDetail />}
            />

            {/* Messaging & Notifications */}
            <Route path={`${BASE_URL}/messages`} element={<Messages />} />
            <Route path={`${BASE_URL}/messages/:userId`} element={<Chat />} />
            <Route
              path={`${BASE_URL}/notifications`}
              element={<Notifications />}
            />

            {/* Dashboards */}
            <Route
              path={`${BASE_URL}/dashboard/farmer`}
              element={<DashboardFarmer />}
            />
            <Route path={`/dashboard/bids`} element={<MyBids />} />
            <Route path={`dashboard/bids/:id`} element={<BidDetail />} />
          </Route>
          {/* Error Pages */}
          <Route path={`${BASE_URL}/404`} element={<NotFound />} />
          <Route path={`${BASE_URL}/500`} element={<ServerError />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
