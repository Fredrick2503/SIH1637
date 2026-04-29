import React, { useEffect, useState } from "react";
import { MarketplaceApi } from "../../api/marketplace.api";
import { BidsApi } from "../../api/bids.api";
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
  const [listings, setlistings] = useState([]);
  const { userData } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bidsData, transData, listData] = await Promise.all([
          BidsApi.getBids(),
          MarketplaceApi.getTransactions(),
          MarketplaceApi.getMyListings(),
        ]);
        setbids(bidsData);
        settransactions(transData);
        setlistings(listData);
      } catch (error) {
        console.error("Error fetching farmer data:", error);
      }
    };
    fetchData();
  }, []);

  const activeListingsCount = listings.length;
  const pendingBidsCount = bids.filter(bid => bid.status === 'pending').length;
  const totalSales = transactions.reduce((acc, trans) => acc + parseFloat(trans.amount || 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-[100px] pb-20 w-full max-w-7xl mx-auto px-4 md:px-6">
        {/* Top Section: Profile and Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ProfileCard />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <StatBox label="Active Listings" value={activeListingsCount} />
            <StatBox label="Pending Bids" value={pendingBidsCount} />
            <StatBox label="Total Sales" value={`₹${totalSales.toLocaleString()}`} />
          </div>
        </div>

        {/* Listings Section */}
        <section className="mb-12">
          <SectionHeader title="My Listings" link="/dashboard/listings" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {listings.length > 0 ? (
              listings.slice(0, 6).map((listing) => (
                <Link key={listing.id} to={`/marketspace/listings/${listing.id}`} className="hover:scale-[1.02] transition-transform">
                  <ListingCard listing={listing} />
                </Link>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-gray-500 bg-white shadow-sm border border-gray-100 rounded-2xl">
                No active listings. <Link to="/marketspace/listings/create" className="text-black font-bold hover:underline">Create one</Link>
              </div>
            )}
          </div>
        </section>

        {/* Two Column Layout for Bids and Orders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Incoming Bids */}
          <section>
            <SectionHeader title="Incoming Bids" link="/dashboard/bids" />
            <div className="space-y-4">
              {bids && bids.length > 0 ? (
                bids.slice(0, 5).map((bid) => (
                  <Link key={bid.id} to={`/dashboard/bids/${bid.id}`} className="block group">
                    <Card
                      label={bid.produce}
                      className="group-hover:border-black transition-colors"
                      info_fields={[
                        { key: "Quantity", value: `${bid.quantity} ${bid.metrics}`, className: "text-sm" },
                        { key: "Bid price", value: `₹${bid.bid_price}`, className: "text-sm" },
                        { key: null, value: convertime(bid.created_at), className: "text-xs text-gray-400" },
                      ]}
                      status={bid.status}
                    />
                  </Link>
                ))
              ) : (
                <div className="py-12 text-center text-gray-500 bg-white shadow-sm border border-gray-100 rounded-2xl">No bids received yet.</div>
              )}
            </div>
          </section>

          {/* Recent Orders */}
          <section>
            <SectionHeader title="Recent Orders" link="/dashboard/transactions" />
            <div className="space-y-4">
              {transactions && transactions.length > 0 ? (
                transactions.slice(0, 5).map((transaction) => (
                  <Link key={transaction.id} to={`/dashboard/transactions/${transaction.id}`} className="block group">
                    <Card
                      label={`Total: ₹${transaction.amount}`}
                      className="group-hover:border-black transition-colors"
                      info_fields={[
                        { key: "Transaction ID", value: transaction.transaction_id, className: "text-sm" },
                        { key: null, value: convertime(transaction.created_at), className: "text-xs text-gray-400" },
                      ]}
                      status={transaction.status}
                    />
                  </Link>
                ))
              ) : (
                <div className="py-12 text-center text-gray-500 bg-white shadow-sm border border-gray-100 rounded-2xl">No recent orders.</div>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const StatBox = ({ label, value }) => (
  <div className="bg-white p-4 flex flex-col items-center justify-center rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
    <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-semibold text-center mb-1">{label}</p>
    <p className="text-sm sm:text-lg font-bold text-gray-900">{value}</p>
  </div>
);

const SectionHeader = ({ title, link }) => (
  <div className="flex justify-between items-end mb-4 px-1">
    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    <Link to={link} className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
      View All &rarr;
    </Link>
  </div>
);

const ProfileCard = () => {
  const navigate = useNavigate();
  const { userData } = useUserStore();
  const profileImage = userData?.profileImg 
    ? (userData.profileImg.startsWith('http') ? userData.profileImg : `http://localhost:8000${userData.profileImg}`)
    : "https://avatar.iran.liara.run/public/boy";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6">
      <div className="relative">
        <img
          src={profileImage}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border-4 border-gray-50 shadow-sm"
        />
        <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
      </div>
      <div className="flex-grow text-center sm:text-left">
        <h1 className="text-sm text-gray-500 font-medium">Welcome back,</h1>
        <p className="text-2xl font-bold text-gray-900 leading-tight">
          {userData?.first_name || "Farmer"} {userData?.last_name || ""}
        </p>
        <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
          <button
            onClick={() => navigate("/marketspace/listings/create")}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-all"
          >
            + Create Listing
          </button>
          <button
            onClick={() => navigate("/profile/form")}
            className="bg-transparent border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition-all"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export const convertime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default FarmerHome;
