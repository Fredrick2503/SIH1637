import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Herobg from "../../assets/img/Buyerhero@4x.png";
// import email from "../../assets/svg/email.svg";
import location from "../../assets/svg/location.svg";
import email from "../../assets/svg/email.svg";
import phone from "../../assets/svg/phone.svg";
function profile() {
  return (
    <div className="w-screen h-screen">
      <Header />
      <section className="mt-[80px] h-fit ">
        <Hero />
        <section className=" w-[100%] grid grid-cols-2 gap-2 p-3" >
          <article className="w-[100%] shadow-[0px_0px_5px_rgba(0,0,0,0.19)] auto-cols-2 p-4 rounded-xl ">
            <h1 className="text-2xl font-semibold " >
              About Us
            </h1>
            <p>
              Urban Bistro is a renowned restaurant specializing in contemporary cuisine. We are dedicated to creating memorable dining experiences by sourcing the highest-quality, locally grown produce and ingredients. Our passion for innovation and sustainability drives every decision in our kitchen.
            </p>
          </article>
          <article className="shadow-[0px_0px_5px_rgba(0,0,0,0.19)] rounded-xl p-4 auto-cols-1 " >
            <h1 className=" text-2xl font-semibold" >Buyer Stats</h1>

            <table className="w-full">
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
        </section>
        <article className="shadow-[0px_0px_5px_rgba(0,0,0,0.19)] rounded-xl p-4 auto-cols-1 " >
            <h1 className=" text-2xl font-semibold" >Buyer Stats</h1>

            <table className="w-full">
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
      </section>
      <Footer />
    </div>
  );
}

export default profile;

const Hero = () => {
  return (
    <section
      className={`w-screen bg-[linear-gradient(to_top,rgba(0,0,0,0.5),rgba(0,0,0,0.25),rgba(0,0,0,0)),url('https://sugarandcream.co/wp-content/uploads/2020/04/pic6-6.jpg')] bg-blend-soft-light bg-center bg-no-repeat bg-cover  h-min-fit pt-[200px] `}
    >
      <article className=" w-fit px-6 py-5 flex flex-col gap-1">
        <h1 className=" text-3xl font-medium text-white">{"Urban Bistro"}</h1>
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
    </section>
  );
};
