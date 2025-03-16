import React from "react";
import bg from "../assets/img/bg2@1x.png";
import logo from "../assets/img/Farm2Biz@4x.png";
import { motion } from "framer-motion";
import { NavLink,Link } from "react-router";

const AboutPage = () => {
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
      <section className="p-8 flex flex-col-reverse gap-10 md:gap-0 md:flex-row items-center text-center md:text-left">
        <div className="md:w-1/2">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold"
          >
            Empowering Farmers, Connecting Markets
          </motion.h2>
          <p className="mt-4 text-gray-600">
            Transform your farming business with direct market access. Get
            better prices, transparent deals, and efficient logistics—all in one
            platform.
          </p>
          <div className="mt-4 flex flex-col md:flex-row gap-4">
            <button className="px-6 py-2 bg-black text-white rounded-lg">
              Sell Your Produce
            </button>
            <button className="px-6 py-2 border border-black rounded-lg">
              Find Fresh Produce
            </button>
          </div>
        </div>
        <motion.div
          className="md:w-1/2 mt-6 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={bg} alt="Fresh Produce" className="w-full" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="p-8 text-center grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-100">
        <motion.div
          key={0}
          className="p-4 shadow-[0px_0px_5px_rgba(0,0,0,0.19)] rounded-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0 * 0.2 }}
        >
          <h3 className="text-xl font-semibold">Direct Access</h3>
          <p className="text-gray-600">
            Connect directly with buyers, eliminating middlemen and increasing
            your profits.
          </p>
        </motion.div>
        <motion.div
          key={1}
          className="p-4 shadow-[0px_0px_5px_rgba(0,0,0,0.19)] rounded-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 * 0.2 }}
        >
          <h3 className="text-xl font-semibold">Higher Margins</h3>
          <p className="text-gray-600">
            Get better prices for your produce through transparent market
            pricing.
          </p>
        </motion.div>
        <motion.div
          key={3}
          className="p-4 shadow-[0px_0px_5px_rgba(0,0,0,0.19)] rounded-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 3 * 0.2 }}
        >
          <h3 className="text-xl font-semibold">Efficient Logistics</h3>
          <p className="text-gray-600">
            Seamless delivery system ensuring your produce reaches buyers fresh.
          </p>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="p-8 text-center">
        <h3 className="text-3xl font-bold">How It Works</h3>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          {["Sign Up", "List Products", "Get Orders", "Complete Sales"].map(
            (step, index) => (
              <motion.div
                key={index}
                className="p-4 shadow-[0px_0px_5px_rgba(0,0,0,0.19)] rounded-lg bg-white "
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: (4 - index) * 0.2 }}
              >
                <h4 className="text-lg font-semibold">
                  {index + 1}. {step}
                </h4>
                <p className="text-gray-600">
                  Short description of the process.
                </p>
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="p-8 grid grid-cols-1 md:grid-cols-3 text-center bg-gray-100">
        {[
          "10,000+ Farmers Connected",
          "50,000+ Transactions Completed",
          "200+ Product Varieties",
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="p-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h4 className="text-2xl font-bold">{stat.split(" ")[0]}</h4>
            <p className="text-gray-600">
              {stat.split(" ").slice(1).join(" ")}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-black text-white p-6 text-center">
        <p>© 2024 Farm2Biz. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
