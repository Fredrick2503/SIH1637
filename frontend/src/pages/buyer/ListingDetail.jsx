import React, { useEffect, useState } from "react";
import bidsvg from "../../assets/svg/bid.svg";
import profilesvg from "../../assets/svg/profile.svg";
import homesvg from "../../assets/svg/home.svg";
import searchsvg from "../../assets/svg/search.svg";
import backsvg from "../../assets/svg/back.svg";
import crrot from "../../assets/img/IMG@4x.png";
import { resource } from "../../utils/services";
import { Input } from "../../components/Input";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router";
import Header from "../../components/Header";
export default function ListingDetail() {
  const [listing, setlisting] = useState({
    id: "330e0308-f8ff-4255-936c-f9fd92844f59",
    AskPrice: "200.00",
    metrics: "Q",
    Qty_available: "10.00",
    seller: "admin@nhce.edu",
    produce: "Rice-sona masuri",
  });
  const [imgs, setimgs] = useState([]);
  const [formState, setformState] = useState("hidden");
  const openForm = () => {
    setformState("");
  };
  const closeForm = () => {
    setformState("hidden");
  };
  useEffect(() => {
    setlisting({
      id: "330e0308-f8ff-4255-936c-f9fd92844f59",
      AskPrice: "200.00",
      metrics: "Q",
      Qty_available: "10.00",
      seller: "admin@nhce.edu",
      produce: "Rice-sona masuri",
    });
    setimgs([crrot, crrot, crrot, crrot, crrot, crrot, crrot, crrot, crrot,crrot, crrot, crrot]);
  }, []);
  return (
    <>
      <div
        className="w-screen h-screen flex flex-col items-center relative overflow-y-auto "
        style={{ scrollbarWidth: "none" }}
      >
        <Header />
        <div className=" h-[calc(100%-130px)] w-full mt-[80px] mb-[50px] overflow-y-auto ">
          <div className="w-full h-[50px] flex flex-col items-center justify-between mb-3 p-2 sm:flex-row sm:items-start ">
            <div className="w-[95%] flex flex-row justify-start items-center px-2 ">
              <span className=" w-[10%] md:w-[25%] ">
                <Link to={-1}>
                  <img src={backsvg} alt="" />
                </Link>
              </span>
              <h1 className=" w-[80%] md:w-[50%] text-center text-2xl font-medium">
                Listing Detail
              </h1>
            </div>
          </div>

          <div className="w-full h-[calc(100%-90px)] sm:flex sm:flex-row ">
            <div className="w-full  sm:w-[45%]  aspect-square mb-3 shadow-[0_8px_10px_rgba(0,0,0,0.25)] sm:mx-2 overflow-x-auto flex flex-row justify-evenly items-center  ">
                {imgs.map((img) => (
                  <img
                    src={img}
                    className=" h-full aspect-square snap-start"
                  />
                ))}
            </div>
            <div className=" w-full sm:w-[50%] flex flex-col justify-evenly items-center px-5 sm:h-[calc(100%)] shadow-[0_8px_10px_rgba(0,0,0,0.25)] rounded-xl overflow-y-auto">
              <div className=" w-full my-1.5 flex flex-row justify-between ">
                <div className="w-[60%]">
                  <h1 className=" text-2xl font-medium ">{listing.produce}</h1>
                  <p className=" text-lg font-light ">
                    Available: {listing.Qty_available} {listing.metrics}
                  </p>
                </div>
                <div className=" w-[30%] self-start ">
                  <button
                    type="button"
                    className="bg-transparent border-2 border-black cursor-pointer text-black p-2 rounded-md w-full mt-3.5 hover:bg-black hover:text-white ease-in-out duration-200 "
                    onClick={() => openForm()}
                  >
                    Place Bid
                  </button>
                </div>
              </div>
              <div className=" w-full flex flex-row justify-between my-2">
                <div className=" w-[50%] flex flex-col items-start ">
                  <p className=" text-lg font-normal ">Ask Price</p>
                  <h1 className=" text-2xl font-medium ">
                    ₹{listing.AskPrice}/{listing.metrics}
                  </h1>
                </div>
                <div className=" w-[50%] flex flex-col items-end ">
                  <p className=" text-lg font-normal ">Highest Bid</p>
                  <h1 className=" text-2xl font-medium ">
                    ₹{listing.AskPrice}/{listing.metrics}
                  </h1>
                </div>
              </div>
              <div className=" w-full flex flex-col  border-y-2 border-gray-200 py-3 ">
                <h1 className=" text-xl font-medium mt-2">
                  Product Description
                </h1>
                <p className=" text-lg font-normal ">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Debitis veritatis ipsa sit laborum nostrum, illum itaque
                  similique necessitatibus sapiente animi placeat distinctio.
                  Quaerat ullam nemo mollitia sunt quia magni, tempora
                  perferendis vel cum consequuntur ipsam magnam doloribus
                  consequatur voluptas laudantium non ducimus temporibus commodi
                  architecto.
                </p>
              </div>
              <div className=" w-full flex flex-col border-y-2  py-3 border-gray-200 ">
                <Link className="w-full  flex flex-col items-stretch ">
                  <h1 className=" text-xl font-medium mb-2 ">Seller detail</h1>
                  <p className=" text-lg font-normal ">
                    <SellerCard />
                  </p>
                </Link>
              </div>
              <div className=" w-full flex flex-col  border-y-2 border-gray-200 ">
                <h1 className=" text-xl font-medium mt-2">
                  Additional Details
                </h1>
                <ul className="py-2">
                  <li className="mt-1">Harvest Date: 25-03-2025</li>
                  <li className="mt-1">Type: Organic</li>
                  <li className="mt-1">Deilvery Available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <BidForm state={formState} closeForm={closeForm} />
    </>
  );
}

import { useUserStore } from "../../store/AuthStore";
export const SellerCard = ({childern,...params}) => {
  const navigate = useNavigate();
  const { userData } = useUserStore();
  return (
    <div className={"w-[95%]  px-3 py-2 cursor-pointer rounded-xl mt-3 shadow-[0px_0px_5px_rgba(0,0,0,0.25)] "+params.className}>
      <div className="w-full h-full flex flex-col items-center ">
        <div className="w-full h-full flex flex-row items-center ">
          <img
            src={"https://avatar.iran.liara.run/public/boy"}
            alt=""
            className="w-[15%] max-w-[70px] mr-3"
          />
          <div className=" w-[minmax(85%,calc(100%-70px))] flex flex-col justify-evenly items-start ">
            <p className="mx-3" >
              {userData.first_name} {userData.last_name}
            </p>
            {childern}
          </div>
        </div>
      </div>
    </div>
  );
};
import infoicon from "../../assets/img/infoiSVG@1x.png";
import { useForm } from "react-hook-form";
const BidForm = ({ state, closeForm = () => {} }) => {
  const { register, handleSubmit } = useForm();
  const handlesubmisson = (e) => {
    e.preventDefault;
    console.log(e);
  };
  return (
    <div
      className={
        "w-screen h-[100vh] top-0 absolute z-20 flex flex-col bg-black/50 justify-center items-center " +
        state
      }
      onClick={(e) => {
        closeForm();
      }}
    >
      <div
        className="mx-2 w-[90%] sm:w-[60%] lg:w-[40%] aspect-[3/4] xl:w-[20%]  bg-white rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.6)] flex flex-col justify-center items-center z-30 "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <form onSubmit={handleSubmit(handlesubmisson)} className=" w-[90%] py-3.5">
          <div className=" my-3.5">
            <h1 className="text-2xl font-medium">Place Bid</h1>
            <p className="text-lg font-normal text-gray-700">
              Enter your bid details below. Please review before submitting.
            </p>
          </div>
          <h1 className="text-xl font-normal ">Bid Amount</h1>
          <Input
            label="Enter your bid amount"
            type="number"
            min={0}
            name={"amount"}
            register={register}
          />
          <h1 className="text-xl font-normal ">Quantity</h1>
          <Input
            label="Enter your bid amount"
            type="number"
            min={0}
            name={"quantity"}
            register={register}
          />
          <div className=" my-3.5 flex flex-row justify-start">
            <span className="mx-1 my-1 w-[10%]">
              <img src={infoicon} alt="" srcset="" />
            </span>
            <p className="text-sm font-normal text-gray-700 text-center ">
              Tip: Ensure your bid meets the minimum requirement set by the
              seller. Current maximum bid is ₹41,500.00
            </p>
          </div>
          <button
            type="submit"
            className="bg-black border-2 border-black cursor-pointer text-white p-2 rounded-md w-full mt-3.5"
          >
            Place Bid
          </button>
          <button
            type="button"
            className="bg-transparent border-2 border-black cursor-pointer text-black p-2 rounded-md w-full mt-3.5"
            onClick={() => closeForm()}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
