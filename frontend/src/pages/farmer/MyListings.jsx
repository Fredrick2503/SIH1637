import React, { useEffect, useState } from "react";
import backsvg from "../../assets/svg/back.svg";
import searchsvg from "../../assets/svg/search.svg";
import { MarketplaceApi } from "../../api/marketplace.api";
import { Input } from "../../components/Input";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { ListingCard } from "../buyer/Listings";
import { Link } from "react-router";

export default function MyListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      const data = await MarketplaceApi.getMyListings();
      setListings(data);
      setLoading(false);
    };
    fetchListings();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center relative overflow-y-auto " style={{ scrollbarWidth: "none" }}>
      <Header />
      <div className="h-fit w-full my-[95px] pb-[60px]">
        <div className="w-full flex flex-col items-center justify-between mb-3 p-2 md:flex-row ">
          <div className="w-[95%] flex flex-row justify-start items-center px-2 md:w-[70%]">
            <span className=" w-[10%] md:w-[50%] ">
              <Link to={-1}>
                <img src={backsvg} alt="Back" />
              </Link>
            </span>
            <h1 className=" w-[80%] md:w-[50%] text-center text-2xl font-medium ">
              My Listings
            </h1>
          </div>
          <div className="w-[95%] flex flex-col justify-center md:w-[30%]">
            <Input label={"Search"} avtr={searchsvg} />
          </div>
        </div>

        {loading ? (
          <div className="w-full text-center py-10 text-gray-500">Loading your listings...</div>
        ) : (
          <div className="w-full px-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {listings.length > 0 ? (
              listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-500 flex flex-col items-center">
                <p className="text-xl mb-4">You haven't created any listings yet.</p>
                <Link to="/marketspace/listings/create" className="bg-black text-white px-6 py-2 rounded-md">
                   Create First Listing
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
