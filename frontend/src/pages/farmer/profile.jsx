import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Herobg from "../../assets/img/Buyerhero@4x.png";
// import email from "../../assets/svg/email.svg";
import location from "../../assets/svg/location.svg";
import email from "../../assets/svg/email.svg";
import phone from "../../assets/svg/phone.svg";
import StatusBadge from "../../components/StatusBadge";
import Edit from "../../assets/svg/edit.svg"
import { Link } from "react-router";
function Farmerprofile() {
  return (
    <div className="w-screen h-screen">
      <Header />
      <section className="mt-[80px] h-fit pb-[60px] ">
        <Hero />
        <section className=" w-[100%] grid md:grid-cols-3 gap-2 p-3" >
          <article className="w-[100%] shadow-[0px_0px_5px_rgba(0,0,0,0.19)] md:col-span-2 p-4 rounded-xl ">
            <h1 className="text-2xl font-semibold " >
              About Us
            </h1>
            <p>
            Sunrise Farms has been serving local communities since 1985. We are committed to sustainable farming practices and 
providing premium quality produce. Our rich history and innovative approach make us a trusted name in the industry. We 
take pride in our commitment to environmental stewardship and community engagement.
            </p>
          </article>
          <article className="shadow-[0px_0px_5px_rgba(0,0,0,0.19)] rounded-xl p-4 w-full " >
            <h1 className=" text-xl font-semibold" >Buyer Stats</h1>

            <table className="w-full text-sm ">
              <tr className="w-full my-2" >
                <td>
                  Total Orders
                </td>
                <td className="text-right" >
                  1234
                </td>
              </tr>
              <tr className="w-full my-2" >
                <td>
                  Total Orders
                </td>
                <td className="text-right" >
                  1234
                </td>
              </tr>
              <tr className="w-full my-2" >
                <td>
                  Total Orders
                </td>
                <td className="text-right" >
                  1234
                </td>
              </tr>
              <tr className="w-full " >
                <td>
                  Total Orders
                </td>
                <td className="text-right" >
                  1234
                </td>
              </tr>
            </table>
          </article>
        <article className="shadow-[0px_0px_5px_rgba(0,0,0,0.19)] rounded-xl p-4 md:col-span-3 w-full " >
            <h1 className=" text-xl font-semibold mb-2 " >Recent Bids</h1>

            <table className="w-full  overflow-hidden rounded-t-xl text-sm ">
              <tr className="w-full my-2 mx-auto border-y-2 border-gray-200 font-normal  bg-gray-200 " >
                <th className="font-medium py-2" >
                  Bid ID
                </th>
                <th className="font-medium ">
                  Item
                </th>
                <th className="font-medium ">
                  Quantity
                </th>
                <th className="font-medium ">
                  Prodcer
                </th>
                <th className="font-medium ">
                  Status
                </th>
              </tr>
              <tr className="w-full mx-auto border-y-2 border-gray-200 text-sm">
                <td className="text-center mx-auto py-2" >
                  12345
                </td>
                <td className="text-center mx-auto" >
                  Rice
                </td>
                <td className="text-center mx-auto" >
                  10Kg
                </td>
                <td className="text-center mx-auto" >
                  GreenFarms
                </td>
                <td className="text-center mx-auto" >
                  <StatusBadge className={'mx-auto'} />
                </td>
              </tr>
              <tr className="w-full mx-auto border-y-2 border-gray-200 text-sm">
                <td className="text-center mx-auto py-2" >
                  12345
                </td>
                <td className="text-center mx-auto" >
                  Rice
                </td>
                <td className="text-center mx-auto" >
                  10Kg
                </td>
                <td className="text-center mx-auto" >
                  GreenFarms
                </td>
                <td className="text-center mx-auto" >
                  <StatusBadge className={'mx-auto'} status="successful" />
                </td>
              </tr>
            </table>
          </article>
        </section>
      </section>
      <Footer />
    </div>
  );
}

export default Farmerprofile;
const Hero = () => {
  return (
    <section
      className={`w-screen bg-blend-multiply bg-black/25  h-min-fit pt-[200px] relative b`}
    >
        <img src="https://media.istockphoto.com/id/1927582544/video/drone-shot-of-a-farm.jpg?s=640x640&k=20&c=cC_X2EcdjVf3mTPhYPE7Yo2cTNTbXTPXF71iXVV--ZM=" alt="" className="w-full h-full absolute top-0  -z-10" />
      <article className=" w-fit px-6 py-5 flex flex-col gap-1">
        <h1 className=" text-3xl font-medium text-white">{"Green Farms"}</h1>
        <p className="text-sm text-white font-light">{"Where Every Dish Tells a Story"}</p>
        <div className="flex flex-row gap-3 h-[12px] items-center ">
          <span
            className={`text-[10px] text-white font-light flex flex-row gap-2 `}
          >
            <img src={location} alt="" />
            location
          </span>
          <span className="text-[10px] text-white font-light flex flex-row gap-2 ">
            <img src={email} alt="" />
            phone
          </span>
          <span className="text-[10px] text-white font-light flex flex-row gap-2">
            <img src={phone} alt="" />
            email
          </span>
        </div>
      </article>
      <Link to={'form'} >
      <span className="flex flex-row absolute top-0 right-0 border-2 border-[#dee3ed] px-2.5 py-0.5 my-2 mx-3 rounded-md bg-[#707070]/50 hover:bg-[#4d4d4d]/50 hover:border-[#fff] mix-blend-screen">
      <img src={Edit} alt=""className="h-[10px] aspect-square my-auto" />
        <p className=" text-[#dee3ed] ml-1 text-xs text-center" >Edit</p>
      </span></Link>
    </section>
  );
};
