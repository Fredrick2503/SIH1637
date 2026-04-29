import React, { useEffect, useState } from "react";
import { MarketplaceApi } from "../../api/marketplace.api";
import { BidsApi } from "../../api/bids.api";
import { useUserStore } from "../../store/AuthStore";
import { useNavigate } from "react-router";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Card from "../../components/Card";
import { Link } from "react-router";

function BuyerHomePage() {
  const [bids, setbids] = useState([]);
  const [transactions, settransactions] = useState([]);

  useEffect(() => {
    (async () => { setbids(await BidsApi.getBids()); })();
    (async () => { settransactions(await MarketplaceApi.getTransactions()); })();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow pt-[100px] pb-20 w-full max-w-7xl mx-auto px-4 md:px-6">
        {/* Profile and Quick Actions */}
        <div className="mb-10">
          <ProfileCard />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Bids Column */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Active Bids</h2>
              <Link to="/dashboard/bids" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                View All &rarr;
              </Link>
            </div>
            <div className="space-y-4">
              {bids && bids.length > 0 ? (
                bids.slice(0, 10).map((bid) => (
                  <Link key={bid.id} to={`/dashboard/bids/${bid.id}`} className="block group">
                    <Card
                      label={bid.listing?.produce || bid.produce}
                      className="group-hover:border-black transition-all bg-white"
                      info_fields={[
                        { key: "Quantity", value: `${bid.quantity} ${bid.listing?.metrics || bid.metrics}`, className: "text-sm" },
                        { key: "Bid price", value: `₹${bid.bid_price}`, className: "text-sm" },
                        { key: null, value: convertime(bid.created_at), className: "text-xs text-gray-400" },
                      ]}
                      status={bid.status}
                    />
                  </Link>
                ))
              ) : (
                <div className="py-16 text-center text-gray-500 bg-white border border-dashed border-gray-300 rounded-2xl">
                  No active bids. <Link to="/marketspace/listings" className="text-black font-bold hover:underline">Browse Market</Link>
                </div>
              )}
            </div>
          </section>

          {/* Transactions Column */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
              <Link to="/dashboard/transactions" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                View All &rarr;
              </Link>
            </div>
            <div className="space-y-4">
              {transactions && transactions.length > 0 ? (
                transactions.slice(0, 10).map((transaction) => (
                  <Link key={transaction.id} to={`/dashboard/transactions/${transaction.id}`} className="block group">
                    <Card
                      label={`Amount: ₹${transaction.amount}`}
                      className="group-hover:border-black transition-all bg-white"
                      info_fields={[
                        { key: "Transaction ID", value: transaction.transaction_id, className: "text-sm" },
                        { key: null, value: convertime(transaction.created_at), className: "text-xs text-gray-400" },
                      ]}
                      status={transaction.status}
                    />
                  </Link>
                ))
              ) : (
                <div className="py-16 text-center text-gray-500 bg-white border border-dashed border-gray-300 rounded-2xl">No transactions found.</div>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const ProfileCard = () => {
  const navigate = useNavigate();
  const { userData } = useUserStore();
  const profileImage = userData?.profileImg 
    ? (userData.profileImg.startsWith('http') ? userData.profileImg : `http://localhost:8000${userData.profileImg}`)
    : "https://avatar.iran.liara.run/public/boy";

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-8">
      <div className="relative">
        <img
          src={profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 shadow-md"
        />
        <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
      </div>
      <div className="flex-grow text-center sm:text-left">
        <h1 className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-1">Buyer Account</h1>
        <p className="text-3xl font-black text-gray-900 leading-tight">
          {userData?.first_name || "Buyer"} {userData?.last_name || ""}
        </p>
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-5">
          <button
            onClick={() => navigate("/marketspace/listings")}
            className="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-lg"
          >
            Explore Marketplace
          </button>
          <button
            onClick={() => navigate("/profile/form")}
            className="bg-white border-2 border-gray-200 text-gray-700 px-6 py-2.5 rounded-xl text-sm font-bold hover:border-black hover:text-black transition-all"
          >
            Manage Profile
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

export default BuyerHomePage;
