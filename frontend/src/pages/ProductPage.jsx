import React from "react";
import { motion } from "framer-motion";
import phone from "../assets/img/download.png"
import logo from "../assets/img/Farm2Biz@4x.png";
import { NavLink,Link } from "react-router";

const ProductPage = () => {
  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 shadow-md bg-white">
        <img
          src={logo}
          alt=""
          className=" max-w-[200px]  w-[30%] min-w-[136px] "
        />
        <ul className="hidden md:flex space-x-6">
          <li>
            {" "}
            <NavLink to="/">
              {({ isActive }) => (
                <p className={isActive ? "text-black" : "text-gray-500"}>
                  {" "}
                  Home
                </p>
              )}
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/product">
              {({ isActive }) => (
                <p className={isActive ? "text-black" : "text-gray-500"}>
                  {" "}
                  Products
                </p>
              )}
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/about">
              {({ isActive }) => (
                <p className={isActive ? "text-black" : "text-gray-500"}>
                  {" "}
                  About
                </p>
              )}
            </NavLink>
          </li>
          
        </ul>
        <div>
          <Link className="px-4 py-2" to={"/login"}>Login</Link>
          <Link className="px-4 py-2 bg-black text-white ml-2 rounded-lg " to={"/signup"}>
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="p-8 flex flex-col md:flex-row items-center text-center md:text-left bg-gray-100 ">
        <div className="md:w-1/2">
          <motion.h2 
            className="text-4xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            The Smarter Way to Trade Farm Produce
          </motion.h2>
          <p className="mt-4 text-gray-600">
            Connect directly with farmers and buyers. No middlemen, better profits, and complete transparency in every transaction.
          </p>
          <div className="mt-4 flex flex-col md:flex-row gap-4">
            <Link to={"/signup"} className="px-20 py-2 bg-black text-white rounded-lg">Join Us</Link>
          </div>
        </div>
        <motion.div 
          className="md:w-1/2 mt-6 md:mt-0  "
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={phone} alt="App Preview" className="w-[60%] mx-auto" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="p-8 text-center grid grid-cols-1 md:grid-cols-3 gap-6">
        {["No Middlemen", "Better Profits", "Transparent Pricing"].map((feature, index) => (
          <motion.div
            key={index}
            className="p-4 shadow-[0px_0px_5px_rgba(0,0,0,0.19)] rounded-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className="text-xl font-semibold">{feature}</h3>
            <p className="text-gray-600">Short description of {feature.toLowerCase()}.</p>
          </motion.div>
        ))}
      </section>

      {/* Call to Action Section */}
      <section className="p-8 bg-gray-100 text-black text-center">
        <motion.h3 
          className="text-3xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Ready to start trading?
        </motion.h3>
        <p className="mt-2">Join Farm2Biz today and grow your business.</p>
        <div className="mt-4 flex justify-center gap-4">
          <Link to={"/signup"} className="px-6 py-2 bg-black text-white rounded-lg">Get Started</Link>
          <Link to={"/about"} className="px-6 py-2 border border-black rounded-lg">Learn more</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black p-6 text-center text-white">
        <p>© 2024 Farm2Biz. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProductPage;
