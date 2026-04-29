import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Importing Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import EditProfile from "./pages/farmer/EditProfile";
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
import MyListings from "./pages/farmer/MyListings";
import Loader from "./pages/Loader";
import Test from "./pages/Test";
import BidDetail from "./pages/BidDetail";
import AuthLayout from "./layouts/auth/AuthLayout";
import Farmerprofile from "./pages/farmer/profile";
import LandingPage from "./pages/landing";
import AboutPage from "./pages/About";
import ProductPage from "./pages/ProductPage";
import FarmerHome from "./pages/farmer/Home";
import Form from "./components/Form";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

// Define Base URL
export const BASE_URL = "http://localhost:5174";

const AppRouter = () => {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<Loader />}>
          <Route path={``} element={<LandingPage />} />
          <Route path={`product`} element={<ProductPage />} />
          <Route path={`about`} element={<AboutPage />} />
          <Route element={<AuthLayout Authreq={false} />}>
            <Route path={`login`} element={<Login />} />
            <Route path={`signup`} element={<CreateProfile />} />
          </Route>
          {/* Profile & User Settings */}
          <Route element={<AuthLayout />}>
            <Route path={`profile_setup`} element={<CreateProfile />} />
            <Route path={`dashboard`} element={<Dashboard />} />
            <Route path="buyer">
              <Route path={`home`} element={<BuyerHomePage />} />
              <Route path={`profile`} element={<Profile />} />
            </Route>
            <Route path={`/marketspace/listings`} element={<Listings />} />

            <Route path={`test`} element={<Test />} />
            <Route path={`/:id`} element={<Profile />} />
            <Route path={`farmer/home`} element={<FarmerHome />} />
            <Route path={`profile/form`} element={<EditProfile />} />

            {/* Home & Listings */}
            <Route
              path={`marketspace/listings/create`}
              element={<CreateListing />}
            />
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
            <Route path={`/dashboard/listings`} element={<MyListings />} />
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
