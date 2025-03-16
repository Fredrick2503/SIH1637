import React from "react";
import logo from "../assets/img/Farm2Biz@4x.png";
import bgfrom from "../assets/img/bg@1x.png"
import { NavLink,Link } from "react-router";
import { motion } from "framer-motion";
  
const LandingPage = () => {
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
      <section
        className="relative w-full h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: `url('${bgfrom}')` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
        <h2 className="text-4xl font-bold">
            From Farm to Table: Fresh & Local
          </h2>
          <p>
            Connect directly with local farmers and get fresh, organic produce
            delivered.
          </p>
          <Link to={"/product"} className="mt-4 px-6 py-2 bg-white text-black">
            Shop Now
          </Link>
        </motion.div>
      </section>

      {/* Featured Products
      <section className="p-8 text-center">
        <h3 className="text-3xl font-semibold mb-6">Featured Products</h3>
        <div className="grid grid-cols-4 gap-6">
          {["Tomatoes", "Lettuce", "Carrots", "Bell Peppers"].map(
            (item, index) => (
              <div key={index} className="border p-4">
                <img
                  src={`/path-to-${item.toLowerCase()}.jpg`}
                  alt={item}
                  className="mb-2"
                />
                <h4 className="font-bold">{item}</h4>
                <p>₹{(index + 1) * 100}/kg</p>
                <button className="mt-2 px-4 py-2 bg-black text-white">
                  Add to Cart
                </button>
              </div>
            )
          )}
        </div>
      </section> */}
      {/* Our Services */}
      <section className="p-8 text-center bg-gray-100">
        <h3 className="text-3xl font-semibold mb-6">Our Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
                      key={0}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0 * 0.2 }}
                     className="p-4 rounded-xl shadow-[0px_0px_5px_rgba(0,0,0,0.19)] bg-white">
            <h4 className="font-bold">Direct Farm Delivery</h4>
            <p>
              Fresh produce delivered to your doorstep within 24 hours of
              harvest.
            </p>
          </motion.div>
          <motion.div
                      key={1}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1 * 0.2 }}
                    className="p-4 rounded-xl shadow-[0px_0px_5px_rgba(0,0,0,0.19)] bg-white">
            <h4 className="font-bold">Wholesale Supply</h4>
            <p>
              Bulk orders for restaurants, markets, and food service businesses.
            </p>
          </motion.div>
          <motion.div
                      key={22}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2 * 0.2 }}
                     className="p-4 rounded-xl shadow-[0px_0px_5px_rgba(0,0,0,0.19)] bg-white">
            <h4 className="font-bold">Custom Growing Programs</h4>
            <p>Tailored growing programs to meet specific produce needs.</p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="p-8 text-center">
        <h3 className="text-3xl font-semibold mb-6">Why Choose Us</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            key={0}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: (3) * 0.2 }}
           className="p-4 rounded-xl shadow-[0px_0px_5px_rgba(0,0,0,0.19)]">
            <h4 className="font-bold">100% Organic Certified</h4>
            <p>All our produce is grown without harmful pesticides.</p>
          </motion.div>
          <motion.div
            key={1}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2 * 0.2 }}
           className="p-4 rounded-xl shadow-[0px_0px_5px_rgba(0,0,0,0.19)]">
            <h4 className="font-bold">Same-Day Harvest</h4>
            <p>We harvest and deliver on the same day for maximum freshness.</p>
          </motion.div>
         <motion.div
            key={2}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 * 0.2 }}
           className="p-4 rounded-xl shadow-[0px_0px_5px_rgba(0,0,0,0.19)]">
            <h4 className="font-bold">Sustainable Farming</h4>
            <p>
              We use sustainable farming practices to protect the environment.
            </p>
          </motion.div>
          <motion.div
            key={3}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0 * 0.2 }}
           className="p-4 rounded-xl shadow-[0px_0px_5px_rgba(0,0,0,0.19)]">
            <h4 className="font-bold">Community Support</h4>
            <p>Supporting local communities through sustainable agriculture.</p>
          </motion.div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-black text-white p-6 text-center">
        <p>© 2024 Farm2Biz. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
