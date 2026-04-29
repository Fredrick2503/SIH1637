import React, { useEffect, useState } from "react";
import Stepper from "../components/Stepper";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SellerCard } from "./buyer/ListingDetail";
import backsvg from "../assets/svg/back.svg";
import { Link, useParams, useNavigate } from "react-router";
import StatusBadge from "../components/StatusBadge";
import { BidsApi } from "../api/bids.api";
import { OrdersApi } from "../api/orders.api";
import { useUserStore } from "../store/AuthStore";
import toast from "react-hot-toast";

function BidDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData } = useUserStore();
  const [bid, setBid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const fetchBid = async () => {
      setLoading(true);
      const data = await BidsApi.getBidDetail(id);
      if (data) {
        setBid(data);
      }
      setLoading(false);
    };
    fetchBid();
  }, [id]);

  const handleStatusUpdate = async (newStatus) => {
    try {
      await BidsApi.updateBidStatus(bid.id, newStatus);
      toast.success(`Bid ${newStatus} successfully!`);
      const updatedBid = await BidsApi.getBidDetail(bid.id);
      setBid(updatedBid);
    } catch (error) {
      toast.error("Failed to update bid status.");
    }
  };

  const handlePayment = async () => {
    setPaying(true);
    // Simulate gateway delay
    toast.loading("Connecting to secure gateway...", { id: "pay-toast" });
    
    setTimeout(async () => {
      try {
        await OrdersApi.processPayment(bid.id);
        toast.success("Payment Successful! Transaction recorded.", { id: "pay-toast" });
        // Refresh bid data
        const updatedBid = await BidsApi.getBidDetail(bid.id);
        setBid(updatedBid);
      } catch (error) {
        toast.error("Payment failed. Please try again.", { id: "pay-toast" });
      } finally {
        setPaying(false);
      }
    }, 2000);
  };

  if (loading) return <div className="w-screen h-screen flex items-center justify-center">Loading...</div>;
  if (!bid) return <div className="w-screen h-screen flex items-center justify-center">Bid not found</div>;

  const isFarmer = userData?.role === "producer";
  const isBuyer = userData?.role === "buyer";
  const status = bid.status;

  // Determine stepper index
  const stepIndex = status === "pending" ? 1 : status === "accepted" ? 2 : 3;

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
              <button onClick={() => navigate(-1)} className="cursor-pointer">
                <img src={backsvg} alt="Back" />
              </button>
            </span>
            <h1 className=" w-[80%] md:w-[50%] text-center text-2xl font-medium">
              Bid Detail
            </h1>
          </div>
        </div>

        <div className="w-[95%] shadow-[0_0_5px_rgba(0,0,0,0.25)] rounded-xl mx-3 relative px-4 py-6 pb-8 ">
          <p className=" font-normal text-gray-500 mb-1">Bid ID: {bid.id}</p>
          <p className=" font-normal text-gray-500">Total Amount:</p>
          <p className="text-3xl font-bold text-black ">₹{parseFloat(bid.total_amt).toLocaleString()}</p>
          
          <div className="mt-8 mb-4">
            <Stepper fields={["Pending", "Accepted", "Completed"]} step={stepIndex} />
          </div>

          <div className="absolute right-4 top-6">
            <StatusBadge status={status} className="px-4 py-1.5 text-sm" />
          </div>
        </div>

        <div className="w-[95%] mx-3 grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="shadow-[0_0_5px_rgba(0,0,0,0.25)] rounded-xl relative px-6 py-6 bg-white">
            <h2 className=" font-bold text-xl mb-4 border-b pb-2">
              Bid Information
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className=" font-normal text-gray-500 ">Item</p>
                <p className=" font-semibold ">{bid.produce}</p>
              </div>
              <div className="flex justify-between">
                <p className=" font-normal text-gray-500 ">Bid Price</p>
                <p className=" font-semibold ">₹{bid.bid_price}/{bid.metrics}</p>
              </div>
              <div className="flex justify-between">
                <p className=" font-normal text-gray-500 ">Quantity</p>
                <p className=" font-semibold ">{bid.quantity} {bid.metrics}</p>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <p className=" font-normal text-gray-500 ">Placed On</p>
                <p className=" font-medium text-sm ">{new Date(bid.created_at).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
             <h2 className=" font-bold text-xl px-2">{isFarmer ? "Buyer Details" : "Seller Details"}</h2>
             {isFarmer ? (
                <SellerCard 
                  className="w-full mt-0 bg-white"
                  sellerData={bid.buyer_details}
                />
             ) : (
                <SellerCard 
                  className="w-full mt-0 bg-white"
                  sellerData={bid.listing_details?.seller_details}
                />
             )}

             {/* Action Buttons */}
             <div className="flex flex-col gap-3 mt-4">
                {isFarmer && status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      className="flex-1 bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors"
                      onClick={() => handleStatusUpdate("accepted")}
                    >
                      Accept Bid
                    </button>
                    <button
                      className="flex-1 border-2 border-red-500 text-red-500 font-bold py-3 rounded-xl hover:bg-red-50 transition-colors"
                      onClick={() => handleStatusUpdate("rejected")}
                    >
                      Reject Bid
                    </button>
                  </div>
                )}

                {isBuyer && status === "accepted" && (
                  <button
                    disabled={paying}
                    className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-all shadow-lg hover:shadow-green-200 disabled:bg-gray-400 disabled:shadow-none"
                    onClick={handlePayment}
                  >
                    {paying ? "Processing Payment..." : `Proceed to Payment (₹${parseFloat(bid.total_amt).toLocaleString()})`}
                  </button>
                )}

                {status === "completed" && (
                   <button
                    className="w-full border-2 border-black text-black font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors"
                    onClick={() => window.print()}
                  >
                    Download Invoice
                  </button>
                )}
             </div>
          </div>
        </div>
      </div>
      {paying && (
        <div className="fixed inset-0 z-[200] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="w-20 h-20 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
          <p className="text-xl font-bold text-black animate-pulse">Secure Payment in Progress...</p>
          <p className="text-gray-500 mt-2">Please do not refresh the page</p>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default BidDetail;
