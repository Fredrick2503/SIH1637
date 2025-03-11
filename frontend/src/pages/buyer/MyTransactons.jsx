import React, { useEffect, useState } from "react";
import bidsvg from "../../assets/svg/bid.svg";
import profilesvg from "../../assets/svg/profile.svg";
import homesvg from "../../assets/svg/home.svg";
import searchsvg from "../../assets/svg/search.svg";
import backsvg from "../../assets/svg/back.svg";
import crrot from "../../assets/img/IMG@4x.png";
import { resource } from "../../utils/services";
import { Input } from "../../components/Input";
import  Footer  from "../../components/Footer";
import Header from "../../components/Header";
import Card from "../../components/Card";
import { convertime } from "./Home";
import { Link } from "react-router";
import WordTraceAnimation from "../../components/Farm2Bizanimate";
import Loading from "../Loading";
export default function MyTransactons(){
    const [transactions,settransactions]=useState([]);
    useEffect(()=>{
        settransactions(resource.gettransactions())
    },[])
  return (
    <div className="w-screen h-screen flex flex-col items-center relative overflow-y-auto ">
      <Header/>
      <div className=" h-80% w-full my-[95px] ">
        <div className="w-full flex flex-col items-center justify-between mb-3 p-2 md:flex-row " >
          <div className="w-[95%] flex flex-row justify-start items-center px-2 md:w-[70%]">
          <span className=" w-[10%] md:w-[50%] " ><Link to={-1} ><img src={backsvg} alt="" /></Link></span>
            <h1 className=" w-[80%] md:w-[50%] text-center text-2xl font-medium " >Transactions</h1>
          </div>
          <div className="w-[95%] flex flex-col justify-center md:w-[30%]" ><Input label={"Search"} avtr={searchsvg} /></div>
          </div>

        
      <div className=" h-80% w-full px-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  ">
      {transactions.map((transaction) => (
                <Card
                  label={transaction.amount}
                  info_fields={[
                    // { key: "Quantity", value: `${transaction.quantity}/${transaction.listing.metrics}` },
                    { key: "ID", value: transaction.transaction_id },
                    { key: "transaction price", value: transaction.amount },
                    { key: null, value: convertime(transaction.created_at),className:"text-xs font-light "},
                  ]}
                  status={transaction.status}
                />
              ))}
      </div>
      </div>
      <Footer/>
    </div>
  )
}

    
