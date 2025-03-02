import React from "react";
import Stepper from "../components/Stepper";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SellerCard } from "./buyer/ListingDetail";
import backsvg from "../assets/svg/back.svg"
import { Link } from "react-router";


function BidDetail() {
  const status = "completed";
  return (
    <div
      className="w-screen h-screen flex flex-col items-center relative overflow-y-auto "
      style={{ scrollbarWidth: "none" }}
    >
      <Header />
      <div className=" h-[calc(100%-130px)] w-full mt-[calc(80px+3%)] mb-[50px] overflow-y-auto flex flex-col items-center ">
        <div className="w-full h-[50px] flex flex-col items-center justify-between mb-3 p-2 sm:flex-row sm:items-start ">
          <div className="w-[95%] flex flex-row justify-start items-center px-2 ">
            <span className=" w-[10%] md:w-[25%] ">
              <Link to={-1}>
                <img src={backsvg} alt="" />
              </Link>
            </span>
            <h1 className=" w-[80%] md:w-[50%] text-center text-2xl font-medium">
              Bid Detail
            </h1>
          </div>
        </div>
        <div className="w-[95%] shadow-[0_0_5px_rgba(0,0,0,0.25)] rounded-xl mx-3 relative px-4 py-3   pb-6 ">
          <p className=" font-norml text-gray-500">Bid ID: TR#1233456</p>
          <p className=" font-norml text-gray-500">Amount:</p>
          <p className="font-medium ">₹20,000</p>
          <Stepper fields={["Pending", "Accepted", "Completed"]} />
          {status && (
            <div
              className={`px-1.5 py-1 ${
                status == "accepted" || status == "completed"
                  ? "bg-green-200"
                  : status == "pending"
                  ? "bg-yellow-200"
                  : "bg-red-200"
              } rounded-md w-fit h-fit absolute right-3 top-3 flex justify-center items-center `}
            >
              <span
                className={`${
                  status == "accepted" || status == "completed"
                    ? "text-green-900"
                    : status == "pending"
                    ? "text-yellow-900"
                    : "text-red-900"
                } text-xs`}
              >
                {status}
              </span>
            </div>
          )}
        </div>
        <div className="w-[95%] mx-3  grid grid-cols-1 md:grid-cols-2 gap-3  ">
          <div className="shadow-[0_0_5px_rgba(0,0,0,0.25)] rounded-xl relative px-4 py-3 pb-6 grid mt-3 grid-cols-2 gap-2 ">
            <p className=" font-semibold text-xl col-span-2 ">
              Bid Information
            </p>
            <p className=" font-normal text-gray-500 ">Seller</p>
            <p className=" font-semibold text-right">123Seller</p>
            <p className=" font-normal text-gray-500 ">Item</p>
            <p className=" font-semibold text-right">123Item</p>
            <p className=" font-normal text-gray-500 ">Quantity</p>
            <p className=" font-semibold text-right">123Quantity</p>
          </div>
          <Link to="/seller">
          <SellerCard 
            className="w-full  mt-3 "
            // childern={
            //   <div className="mx-3 w-full flex flex-row justify-center items-center  ">
            //     <button
            //       type="button"
            //       className="bg-transparent border-2 border-black text-black p-2 rounded-md w-full mt-3"
            //       onClick={() => navigate("/marketspace/listings")}
            //     >
            //       Veiw Seller
            //     </button>
            //   </div>
            // }
          /></Link>
        </div>
        <button
          type="button"
          className="bg-black text-white p-2 rounded-md  w-fit px-5 mt-3.5"
          onClick={() => navigate("/dashboard/bids")}
        >
          Print Reciept
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default BidDetail;
