import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import locationIcon from "../../assets/svg/location.svg";
import emailIcon from "../../assets/svg/email.svg";
import phoneIcon from "../../assets/svg/phone.svg";
import StatusBadge from "../../components/StatusBadge";
import EditIcon from "../../assets/svg/edit.svg";
import { Link } from "react-router";
import { useUserStore } from "../../store/AuthStore";
import { BidsApi } from "../../api/bids.api";
import { MarketplaceApi } from "../../api/marketplace.api";

function Farmerprofile() {
  const { userData } = useUserStore();
  const [bids, setBids] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [bidsData, transData] = await Promise.all([
        BidsApi.getBids(),
        MarketplaceApi.getTransactions(),
      ]);
      setBids(bidsData);
      setTransactions(transData);
    };
    fetchStats();
  }, []);

  const totalOrders = transactions.length;
  const pendingBids = bids.filter(b => b.status === 'pending').length;
  const acceptedBids = bids.filter(b => b.status === 'accepted').length;

  return (
    <div className="w-screen h-screen">
      <Header />
      <section className="mt-[80px] h-fit pb-[60px] ">
        <Hero userData={userData} />
        <section className=" w-[100%] grid md:grid-cols-3 gap-2 p-3" >
          <article className="w-[100%] shadow-[0px_0px_5px_rgba(0,0,0,0.19)] md:col-span-2 p-4 rounded-xl ">
            <h1 className="text-2xl font-semibold " >
              About Us
            </h1>
            <p>
              {userData.about || "No description provided yet. Tell us about your farm and practices!"}
            </p>
          </article>
          <article className="shadow-[0px_0px_5px_rgba(0,0,0,0.19)] rounded-xl p-4 w-full " >
            <h1 className=" text-xl font-semibold mb-4" >Farmer Stats</h1>

            <table className="w-full text-sm ">
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2">Total Transactions</td>
                  <td className="text-right font-medium">{totalOrders}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2">Pending Bids</td>
                  <td className="text-right font-medium">{pendingBids}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2">Accepted Bids</td>
                  <td className="text-right font-medium">{acceptedBids}</td>
                </tr>
              </tbody>
            </table>
          </article>
          <article className="shadow-[0px_0px_5px_rgba(0,0,0,0.19)] rounded-xl p-4 md:col-span-3 w-full " >
            <h1 className=" text-xl font-semibold mb-2 " >Recent Bids on My Listings</h1>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left">Bid ID</th>
                    <th className="py-2 px-4 text-left">Item</th>
                    <th className="py-2 px-4 text-left">Quantity</th>
                    <th className="py-2 px-4 text-left">Bidder</th>
                    <th className="py-2 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bids.slice(0, 5).map((bid) => (
                    <tr key={bid.id} className="border-b">
                      <td className="py-2 px-4">{bid.id.substring(0, 8)}...</td>
                      <td className="py-2 px-4">{bid.listing?.produce || bid.produce}</td>
                      <td className="py-2 px-4">{bid.quantity} {bid.listing?.metrics || bid.metrics}</td>
                      <td className="py-2 px-4">{bid.buyer_name || "Buyer"}</td>
                      <td className="py-2 px-4">
                        <StatusBadge status={bid.status} />
                      </td>
                    </tr>
                  ))}
                  {bids.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-4 text-center text-gray-500">No bids found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </article>
        </section>
      </section>
      <Footer />
    </div>
  );
}

const Hero = ({ userData }) => {
  const heroImage = userData?.heroImg 
    ? (userData.heroImg.startsWith('http') ? userData.heroImg : `http://localhost:8000${userData.heroImg}`)
    : "https://media.istockphoto.com/id/1927582544/video/drone-shot-of-a-farm.jpg?s=640x640&k=20&c=cC_X2EcdjVf3mTPhYPE7Yo2cTNTbXTPXF71iXVV--ZM=";

  return (
    <section className="w-screen bg-blend-multiply bg-black/25 h-min-fit pt-[200px] relative">
      <img src={heroImage} alt="Hero" className="w-full h-full absolute top-0 -z-10 object-cover" />
      <article className=" w-fit px-6 py-5 flex flex-col gap-1">
        <h1 className=" text-3xl font-medium text-white">
          {userData.organizationName || `${userData.first_name} ${userData.last_name}`}
        </h1>
        <p className="text-sm text-white font-light">
          {userData.tagline || "Providing quality produce to the market"}
        </p>
        <div className="flex flex-row gap-3 h-[12px] items-center mt-2">
          <span className="text-[10px] text-white font-light flex flex-row gap-2 items-center">
            <img src={locationIcon} alt="" className="w-3 h-3" />
            {userData.location || "Location not set"}
          </span>
          <span className="text-[10px] text-white font-light flex flex-row gap-2 items-center">
            <img src={phoneIcon} alt="" className="w-3 h-3" />
            {userData.phone_no || "Phone not set"}
          </span>
          <span className="text-[10px] text-white font-light flex flex-row gap-2 items-center">
            <img src={emailIcon} alt="" className="w-3 h-3" />
            {userData.email}
          </span>
        </div>
      </article>
      <Link to={'/profile/form'} >
        <span className="flex flex-row absolute top-0 right-0 border-2 border-[#dee3ed] px-2.5 py-0.5 my-2 mx-3 rounded-md bg-[#707070]/50 hover:bg-[#4d4d4d]/50 hover:border-[#fff] mix-blend-screen transition-all">
          <img src={EditIcon} alt="" className="h-[10px] aspect-square my-auto" />
          <p className=" text-[#dee3ed] ml-1 text-xs text-center" >Edit</p>
        </span>
      </Link>
    </section>
  );
};

export default Farmerprofile;
