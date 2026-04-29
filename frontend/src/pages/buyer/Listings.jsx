import React, { useEffect, useState } from "react";
import searchsvg from "../../assets/svg/search.svg";
import backsvg from "../../assets/svg/back.svg";
import crrot from "../../assets/img/IMG@4x.png";
import { resource } from "../../utils/services";
import { Input } from "../../components/Input";
import Footer from "../../components/Footer";
import { Link } from "react-router";
import Header from "../../components/Header";
export default function Listings() {
  const [listings, setlistings] = useState(null);
  useEffect(() => {
    // setlistings([]);
    resource.getlistings().then((res) => {
      console.log(res);})
    
    setlistings([]);
  }, []);
  return (
    <div
      className="w-screen h-screen flex flex-col items-center relative overflow-y-auto "
      style={{ scrollbarWidth: "none" }}
    >
      <Header />
      <section className="mt-[80px] h-fit pb-[60px] ">
        <div className="w-full flex flex-col items-center justify-between mb-3 p-2 md:flex-row ">
          <div className="w-[95%] flex flex-row justify-start items-center px-2 md:w-[70%]">
            <span className=" w-[10%] md:w-[50%] ">
              <Link to={-1}>
                <img src={backsvg} alt="" />
              </Link>
            </span>
            <h1 className=" w-[80%] md:w-[50%] text-center text-2xl font-medium ">
              Listings
            </h1>
          </div>
          <div className="w-[95%] flex flex-col justify-center md:w-[30%]">
            <Input label={"Seacrh"} avtr={searchsvg} />
          </div>
        </div>

        <div className="  w-full  grid grid-cols-2 gap-x-1 md:grid-cols-4 lg:grid-cols-8 lg:gap-4 px-3  ">
          {listings ? (
            listings?.map((listing) => <ListingCard listing={listing} />)
          ) : (
            <>No listing Found</>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export const ListingCard = ({ listing, className }) => {
  console.log(listing);

  if (listing != null) {
    return (
      <Link
        to={`/marketspace/listings/${listing.id}`}
        className={"snap-start mt-2 " + className}
      >
        <div className="w-full flex flex-col items-center justify-between rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.3)]  ">
          <img src={crrot} className="rounded-t-xl aspect-square " />
          <div className="w-full h-fit flex flex-col items-start justify-evenly px-3 pb-3 ">
            <h1 className="text-[17px] font-medium">
              {listing.produce.length > 10
                ? listing.produce.substring(0, 10) + " ..."
                : listing.produce}
            </h1>
            <h1 className="text-sm font-medium">
              ₹{listing.AskPrice}/{listing.metrics}
            </h1>
            <p className="text-sm font-light">{`Qty: ${listing.Qty_available}`}</p>
            <button
              type="submit"
              className="bg-black text-cyan-50 px-3 py-2 rounded-md mt-1.5 w-full "
            >
              View Deatils
            </button>
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <div className="w-full flex flex-col items-center justify-between rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.3)]  ">
        <img src={crrot} className="rounded-t-xl aspect-square " />
        <div className="w-full h-fit flex flex-col items-start justify-evenly px-3 pb-3 ">
          <h1 className="text-[17px] font-medium">No Listings Found</h1>
        </div>
      </div>
    );
  }
};
