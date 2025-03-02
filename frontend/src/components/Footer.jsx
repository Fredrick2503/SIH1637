import React from 'react'
import bidsvg from "../assets/svg/bid.svg";
import profilesvg from "../assets/svg/profile.svg";
import homesvg from "../assets/svg/home.svg";
import searchsvg from "../assets/svg/search.svg";
import { Link } from "react-router";
export default function Footer() {
  return (
    <footer className="w-screen h-[50px] fixed bottom-0 py-2  shadow-[0_0_10px_rgba(0,0,0,0.5)] bg-white ">
        <ul className="w-full flex flex-row justify-evenly">
          <li className=" flex flex-col justify-center items-center ">
            <Link to="/" className=" flex flex-col justify-center items-center text-sm font-extralight ">
              <img src={homesvg} className=" w-[15px] " />
              Home
            </Link>
          </li>
          <li className=" flex flex-col justify-center items-center ">
            <Link to="/marketspace/listings" className=" flex flex-col justify-center items-center text-sm font-extralight ">
              <img src={searchsvg} className=" w-[15px] " />
              Listings
            </Link>
          </li>
          <li className=" flex flex-col justify-center items-center ">
            <Link to='/dashboard/bids' className=" flex flex-col justify-center items-center text-sm font-extralight ">
              <img src={bidsvg} className=" w-[15px] " />
              Bids
            </Link>
          </li>
          <li className=" flex flex-col justify-center items-center ">
            <Link className=" flex flex-col justify-center items-center text-sm font-extralight ">
              <img src={profilesvg} className=" w-[15px] " />
              Profile
            </Link>
          </li>
        </ul>
      </footer>
  )
}
