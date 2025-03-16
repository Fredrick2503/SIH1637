import React, { useEffect, useState } from "react";
import { resource } from "../../utils/services";
import { useUserStore } from "../../store/AuthStore";
import { useNavigate } from "react-router";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Card from "../../components/Card";
import { Link } from "react-router";
import { ListingCard } from "../buyer/Listings";

function FarmerHome() {
  const [bids, setbids] = useState([]);
  const [transactions, settransactions] = useState([]);

  useEffect(() => {
    setbids(resource.getbids());
    settransactions(resource.gettransactions());
    console.log(bids);
  }, []);
  return (
    <div className="w-screen h-screen flex flex-col items-center relative overflow-y-auto ">
      <Header />
      <div className="w-full h-[100%] pt-[80px] pb-[55px] flex flex-col items-center">
        <section className="w-full grid grid-cols-1 md:grid-cols-2 " >
        <ProfileCard />

        <section className="w-full grid grid-cols-3  justify-items-center gap-2 mt-3 px-3">
          <div className="w-full px-5  flex flex-col items-center  justify-center rounded-lg shadow-[0px_0px_5px_rgba(0,0,0,0.19)] py-2">
            <p className=" text-sm text-gray-600 text-center">
              Active Listings
            </p>
            <p className="text-lg font-semibold">1</p>
          </div>
          <div className=" w-full px-5 flex flex-col items-center justify-center rounded-lg shadow-[0px_0px_5px_rgba(0,0,0,0.19)] py-2">
            <p className=" text-sm text-gray-600 text-center">
              Pending Listings
            </p>
            <p className="text-lg font-semibold">2</p>
          </div>
          <div className=" w-full px-5 flex flex-col items-center justify-center rounded-lg shadow-[0px_0px_5px_rgba(0,0,0,0.19)] py-2">
            <p className=" text-sm text-gray-600 text-center">Total Sales</p>
            <p className="text-lg font-semibold">1.25k</p>
          </div>
        </section></section>
        <div className="w-full  grid grid-cols-1 md:grid-cols-2 justify-items-center pb-[50px]">
          <div className="w-full md:col-span-2 px-3 py-2 flex flex-col justify-center items-center border-y-1  border-gray-300 mt-3 md:h-[100%] ">
            <div className="w-full flex flex-row justify-between px-3 py-2 ">
              <h1 className="font-medium">Listings</h1>
              <Link to="/dashboard/bids" className="font-medium">
                Veiw all
              </Link>
            </div>
            <div className="w-screen py-2 grid grid-flow-col auto-cols-[175px] shrink-0 items-center overflow-auto gap-5  snap-x snap-mandatory  ">
              {/* {bids?.map((bid) => (
                    <Card
                    className=" snap-start "
                    label={bid.listing.produce}
                    info_fields={[
                      { key: "Quantity", value: `${bid.quantity} ${bid.listing.metrics}` ,className:"text-sm"},
                      { key: "Bid price", value: bid.bid_price ,className:"text-sm"},
                      { key: null, value: convertime(bid.created_at),className:"text-xs"},
                    ]}
                    status={bid.status}
                  />
                  ))} */}
              <ListingCard
                className={"snap-center "}
                listing={{
                  id: "330e0308-f8ff-4255-936c-f9fd92844f59",
                  AskPrice: "200.00",
                  metrics: "Q",
                  Qty_available: "10.00",
                  seller: "admin@nhce.edu",
                  produce: "Rice-sona masuri",
                }}
              />
              <ListingCard
                className={"snap-center "}
                listing={{
                  id: "330e0308-f8ff-4255-936c-f9fd92844f59",
                  AskPrice: "200.00",
                  metrics: "Q",
                  Qty_available: "10.00",
                  seller: "admin@nhce.edu",
                  produce: "Rice-sona masuri",
                }}
              />
              <ListingCard
                className={"snap-center "}
                listing={{
                  id: "330e0308-f8ff-4255-936c-f9fd92844f59",
                  AskPrice: "200.00",
                  metrics: "Q",
                  Qty_available: "10.00",
                  seller: "admin@nhce.edu",
                  produce: "Rice-sona masuri",
                }}
              />
              <ListingCard
                className={"snap-center "}
                listing={{
                  id: "330e0308-f8ff-4255-936c-f9fd92844f59",
                  AskPrice: "200.00",
                  metrics: "Q",
                  Qty_available: "10.00",
                  seller: "admin@nhce.edu",
                  produce: "Rice-sona masuri",
                }}
              />
              <ListingCard
                className={"snap-center "}
                listing={{
                  id: "330e0308-f8ff-4255-936c-f9fd92844f59",
                  AskPrice: "200.00",
                  metrics: "Q",
                  Qty_available: "10.00",
                  seller: "admin@nhce.edu",
                  produce: "Rice-sona masuri",
                }}
              />
              <ListingCard
                className={"snap-center "}
                listing={{
                  id: "330e0308-f8ff-4255-936c-f9fd92844f59",
                  AskPrice: "200.00",
                  metrics: "Q",
                  Qty_available: "10.00",
                  seller: "admin@nhce.edu",
                  produce: "Rice-sona masuri",
                }}
              />
              <ListingCard
                className={"snap-center "}
                listing={{
                  id: "330e0308-f8ff-4255-936c-f9fd92844f59",
                  AskPrice: "200.00",
                  metrics: "Q",
                  Qty_available: "10.00",
                  seller: "admin@nhce.edu",
                  produce: "Rice-sona masuri",
                }}
              />
            </div>
          </div>
          <div className="w-full  px-3 py-2 flex flex-col justify-center items-center border-y-1  border-gray-300 mt-3 md:h-[100%] ">
            <div className="w-full flex flex-row justify-between px-3 py-2 ">
              <h1 className="font-medium">Bids</h1>
              <Link to="/dashboard/bids" className="font-medium">
                Veiw all
              </Link>
            </div>
            <div className="w-[100%] py-2 flex flex-col px-2 gap-2 items-center h-[300px] overflow-scroll snap-mandatory snap-y scroll-pt-2 overscroll-auto">
              {bids.map((bid) => (
                <Card
                  className=" snap-start "
                  label={bid.listing.produce}
                  info_fields={[
                    {
                      key: "Quantity",
                      value: `${bid.quantity} ${bid.listing.metrics}`,
                      className: "text-sm",
                    },
                    {
                      key: "Bid price",
                      value: bid.bid_price,
                      className: "text-sm",
                    },
                    {
                      key: null,
                      value: convertime(bid.created_at),
                      className: "text-xs",
                    },
                  ]}
                  status={bid.status}
                />
              ))}
            </div>
          </div>
          <div className="w-full  px-3 py-2 flex flex-col  justify-center items-center border-y-1  border-gray-300 md:h-[100%] md:mt-3 ">
            <div className="w-full flex flex-row gap-2 justify-between px-3 py-2 ">
              <h1 className="font-medium">Transactions</h1>
              <Link to="/dashboard/transactions" className="font-medium">
                Veiw all
              </Link>
            </div>
            <div className="w-[100%] py-2 flex flex-col px-2 gap-2 items-center h-[300px] overflow-y-auto snap-y snap-mandatory scroll-pt-2 overscroll-auto">
              {transactions?.map((transaction) => (
                <Card
                  label={`₹${transaction.amount}`}
                  info_fields={[
                    // { key: "Bid Quantity", value: bid.quantity },
                    {
                      key: "PID",
                      value: transaction.transaction_id,
                      className: "text-sm",
                    },
                    {
                      key: null,
                      value: convertime(transaction.created_at),
                      className: "text-xs",
                    },
                  ]}
                  status={transaction.status}
                  className={" snap-start "}
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

export default FarmerHome;

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
            Create New Listing
          </button>
          <button
            type="button"
            className="bg-transparent border-2 cursor-pointer border-black text-black p-2 rounded-md w-[49%] mt-3.5"
            onClick={() => navigate("/dashboard/bids")}
          >
            My Listings
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
