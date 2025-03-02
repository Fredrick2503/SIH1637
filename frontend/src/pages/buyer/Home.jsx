import React, { useEffect, useState } from "react";
import { resource } from "../../utils/services";
import { useUserStore } from "../../store/AuthStore";
import logo from "../../assets/img/Farm2Biz@4x.png";
import bidsvg from "../../assets/svg/bid.svg";
import profilesvg from "../../assets/svg/profile.svg";
import homesvg from "../../assets/svg/home.svg";
import searchsvg from "../../assets/svg/search.svg";
import { useNavigate } from "react-router";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Card from "../../components/Card";
import { Link } from "react-router";

function BuyerHomePage() {
  const [bids, setbids] = useState([]);
  const [transactions, settransactions] = useState([]);

  useEffect(() => {
    setbids(resource.getbids());
    settransactions(resource.gettransactions());
    console.log(bids);
  }, []);
  console.log(bids);
  console.log(resource.getbids());
  return (
    <div className="w-screen h-screen flex flex-col items-center relative overflow-y-auto ">
      <Header />
      <div className="w-full h-[100%] py-[80px] flex flex-col items-center">
        <ProfileCard />

        <div className="w-full h-[82%] flex flex-col md:flex-row items-center ">
          <div className="w-full h-[48%] px-3 py-2 flex flex-col justify-center items-center border-y-1  border-gray-300 mt-3 md:h-[100%] ">
            <div className="w-full flex flex-row justify-between px-3 py-2 ">
              <h1 className="font-medium">Bids</h1>
              <Link to="/dashboard/bids" className="font-medium">Veiw all</Link>
            </div>
            <div className="w-[100%] flex flex-col items-center h-[100%] overflow-y-auto">
              {bids.map((bid) => (
                <Card
                label={bid.listing.produce}
                info_fields={[
                  { key: "Quantity", value: `${bid.quantity} ${bid.listing.metrics}` ,className:"text-sm"},
                  { key: "Bid price", value: bid.bid_price ,className:"text-sm"},
                  { key: null, value: convertime(bid.created_at),className:"text-xs"},
                ]}
                status={bid.status}
              />
              ))}
            </div>
          </div>
          <div className="w-full h-[48%] px-3 py-2 flex flex-col justify-center items-center border-y-1  border-gray-300 md:h-[100%] md:mt-3 ">
            <div className="w-full flex flex-row justify-between px-3 py-2 ">
              <h1 className="font-medium">Transactions</h1>
              <Link to="/dashboard/transactions" className="font-medium">Veiw all</Link>
            </div>
            <div className="w-[100%] flex flex-col items-center h-[100%] overflow-y-auto">
              {transactions.map((transaction) => (
                <Card
                  label={`₹${transaction.amount}`}
                  info_fields={[
                    // { key: "Bid Quantity", value: bid.quantity },
                    { key: "PID", value: transaction.transaction_id ,className:"text-sm"},
                    { key: null, value: convertime(transaction.created_at),className:"text-xs"},
                  ]}
                  status={transaction.status}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BuyerHomePage;

const ProfileCard = () => {
  const navigate = useNavigate();
  const { userData } = useUserStore();
  return (
    <div className="w-[97%] h-fit px-3 py-2 mx-3 rounded-xl mt-3 shadow-[0px_0px_5px_rgba(0,0,0,0.25)]">
      <div className="w-full h-full flex flex-col items-center ">
        <div className="w-full h-full flex flex-row items-center ">
          <img
            src={"https://avatar.iran.liara.run/public/boy"}
            alt=""
            className="w-[15%] max-w-[70px] mr-3"
          />
          <div className="flex flex-col justify-evenly items-start">
            <h1 className="text-xl font-medium">Welcome Back,</h1>
            <p>
              {userData.first_name} {userData.last_name}
            </p>
          </div>
        </div>
        <div className="w-full flex flex-row justify-between items-center ">
          <button
            type="button"
            className="bg-black text-white p-2 rounded-md w-[49%] mt-3.5 cursor-pointer "
            onClick={() => navigate("/marketspace/listings")}
          >
            Browse Listings
          </button>
          <button
            type="button"
            className="bg-transparent border-2 cursor-pointer border-black text-black p-2 rounded-md w-[49%] mt-3.5"
            onClick={() => navigate("/dashboard/bids")}
          >
            View Bids
          </button>
        </div>
      </div>
    </div>
  );
};
export const convertime = (dateString) => {
  const date = new Date(dateString);

  // Format Date (e.g., "February 22, 2025")
  const formattedDate = date.toLocaleDateString("en-UK", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  // Format Time (e.g., "3:30:45 PM")
  const formattedTime = date.toLocaleTimeString("en-UK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use false for 24-hour format
  });

  // Combined Date and Time
  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  return formattedDateTime;
}; // Output: "February 22, 2025 3:30:45 PM"



{
  /* <div className="w-[98%] flex flex-col rounded-xl shadow-[0px_0px_10px_rgba(0,0,0,0.19)]  mt-1.5 mb-1.5 relative">
<div className="px-3 py-2 rounded-xl relative">
  <div className="w-[85%]">
    <h1 className="text-lg font-medium">{bid.listing}</h1>
    <p>Bid Id: {bid.id}</p>
    <p>Bid Price:{bid.bid_price}</p>
    <p>Quantity:{bid.quantity}</p>
  </div>
  <div className="px-1.5 py-1 bg-yellow-200 rounded-md w-fit h-fit absolute right-2 top-2 flex justify-center items-center ">
    <span className="text-yellow-900 text-xs">{bid.status}</span>
  </div>
</div>
</div> */
}
