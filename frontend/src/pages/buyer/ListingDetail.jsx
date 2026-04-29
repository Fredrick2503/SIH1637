import React, { useEffect, useState } from "react";
import backsvg from "../../assets/svg/back.svg";
import crrot from "../../assets/img/IMG@4x.png";
import infoicon from "../../assets/img/infoiSVG@1x.png";
import { MarketplaceApi } from "../../api/marketplace.api";
import { BidsApi } from "../../api/bids.api";
import { Input } from "../../components/Input";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setlisting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formState, setformState] = useState("hidden");
  
  const openForm = () => setformState("");
  const closeForm = () => setformState("hidden");

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const data = await MarketplaceApi.getListingDetail(id);
        if (data) {
          setlisting(data);
        }
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
      setLoading(false);
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className="w-screen h-screen flex items-center justify-center">Loading...</div>;
  if (!listing) return <div className="w-screen h-screen flex items-center justify-center">Listing not found</div>;

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
                  <img src={backsvg} alt="Back" />
                </Link>
              </span>
              <h1 className=" w-[80%] md:w-[50%] text-center text-2xl font-medium">
                Listing Detail
              </h1>
            </div>
          </div>

          <div className="w-full h-[calc(100%-90px)] sm:flex sm:flex-row ">
            <div className="w-full sm:w-[45%] aspect-square mb-3 shadow-[0_8px_10px_rgba(0,0,0,0.25)] sm:mx-2 overflow-x-auto flex flex-row gap-2 items-center">
              {listing.listing_images && listing.listing_images.length > 0 ? (
                listing.listing_images.map((imgObj) => (
                  <img
                    key={imgObj.id}
                    src={imgObj.Image.startsWith('http') ? imgObj.Image : `http://localhost:8000${imgObj.Image}`}
                    className="h-full aspect-square snap-start object-cover"
                    alt="Listing"
                  />
                ))
              ) : (
                <img src={crrot} className="h-full aspect-square object-cover" alt="Default" />
              )}
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
                  {listing.description || "Freshly harvested produce directly from the farm. Quality guaranteed."}
                </p>
              </div>
              <div className=" w-full flex flex-col border-y-2  py-3 border-gray-200 ">
                <div className="w-full  flex flex-col items-stretch ">
                  <h1 className=" text-xl font-medium mb-2 ">Seller detail</h1>
                  <SellerCard sellerData={listing.seller_details} />
                </div>
              </div>
              <div className=" w-full flex flex-col  border-y-2 border-gray-200 ">
                <h1 className=" text-xl font-medium mt-2">
                  Additional Details
                </h1>
                <ul className="py-2">
                  <li className="mt-1">Location: {listing.seller_details?.location || "Not specified"}</li>
                  <li className="mt-1">Category: {listing.seller_details?.role || "Producer"}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <BidForm state={formState} listing={listing} closeForm={closeForm} />
    </>
  );
}

export const SellerCard = ({ sellerData, children, ...params }) => {
  const navigate = useNavigate();
  const profileImage = sellerData?.profileImg 
    ? (sellerData.profileImg.startsWith('http') ? sellerData.profileImg : `http://localhost:8000${sellerData.profileImg}`)
    : "https://avatar.iran.liara.run/public/boy";

  return (
    <div 
      className={"w-[95%] px-3 py-2 cursor-pointer rounded-xl mt-3 shadow-[0px_0px_5px_rgba(0,0,0,0.25)] " + (params.className || "")}
      onClick={() => sellerData?.email && navigate(`/${sellerData.email}`)}
    >
      <div className="w-full h-full flex flex-col items-center ">
        <div className="w-full h-full flex flex-row items-center ">
          <img
            src={profileImage}
            alt="Seller"
            className="w-[15%] max-w-[70px] aspect-square rounded-full object-cover mr-3"
          />
          <div className=" flex flex-col justify-evenly items-start ">
            <p className="font-semibold" >
              {sellerData?.first_name || sellerData?.organizationName || "Seller Name"} {sellerData?.last_name || ""}
            </p>
            <p className="text-sm text-gray-500">{sellerData?.location || "Location not set"}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const BidForm = ({ state, listing, closeForm = () => {} }) => {
  const { register, handleSubmit, reset } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    if (!listing) return;
    setSubmitting(true);
    try {
      const bidData = {
        listing: listing.id,
        bid_price: data.bid_price,
        quantity: data.quantity,
      };
      await BidsApi.placeBid(bidData);
      toast.success("Bid placed successfully!");
      reset();
      closeForm();
    } catch (error) {
      console.error("Error placing bid:", error);
      toast.error(error.response?.data?.detail || "Failed to place bid. Please check your inputs.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={
        "fixed inset-0 z-[100] flex flex-col bg-black/60 justify-center items-center transition-opacity duration-300 " +
        (state === "hidden" ? "opacity-0 pointer-events-none" : "opacity-100")
      }
      onClick={closeForm}
    >
      <div
        className="mx-2 w-[90%] sm:w-[500px] bg-white rounded-2xl shadow-2xl flex flex-col p-6 z-[110]"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Place Your Bid</h1>
            <p className="text-sm text-gray-500 mt-1">
              You are bidding on <span className="font-semibold text-black">{listing?.produce}</span>
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Asking Price</p>
              <p className="text-lg font-bold">₹{listing?.AskPrice}/{listing?.metrics}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Available Qty</p>
              <p className="text-lg font-bold">{listing?.Qty_available} {listing?.metrics}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Bid Price (per {listing?.metrics}) 
                <span className="text-xs text-blue-600 ml-2 font-normal">Must be &gt; ₹{listing?.AskPrice}</span>
              </label>
              <Input
                type="number"
                step="0.01"
                min={listing ? parseFloat(listing.AskPrice) + 0.01 : 0}
                placeholder={`Min ₹${(parseFloat(listing?.AskPrice || 0) + 0.01).toFixed(2)}`}
                {...register("bid_price", { 
                  required: "Bid price is required", 
                  min: {
                    value: parseFloat(listing?.AskPrice || 0) + 0.01,
                    message: `Bid must be at least ₹${(parseFloat(listing?.AskPrice || 0) + 0.01).toFixed(2)}`
                  }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Quantity ({listing?.metrics})
                <span className="text-xs text-blue-600 ml-2 font-normal">Max available: {listing?.Qty_available}</span>
              </label>
              <Input
                type="number"
                step="0.01"
                min={0.1}
                max={listing?.Qty_available}
                placeholder={`Max ${listing?.Qty_available}`}
                {...register("quantity", { 
                  required: "Quantity is required", 
                  min: { value: 0.1, message: "Quantity must be at least 0.1" },
                  max: { 
                    value: listing?.Qty_available, 
                    message: `Only ${listing?.Qty_available} available`
                  }
                })}
              />
            </div>
          </div>

          <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg border border-blue-100">
            <img src={infoicon} alt="info" className="w-5 h-5 mt-0.5" />
            <p className="text-xs text-blue-700 leading-tight">
              Once submitted, your bid will be visible to the farmer. Ensure you have the funds ready for transaction if accepted.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            >
              {submitting ? "Submitting..." : "Confirm Bid"}
            </button>
            <button
              type="button"
              className="text-gray-500 font-semibold py-2 hover:text-black transition-colors"
              onClick={closeForm}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
