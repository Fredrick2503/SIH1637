import React, { use, useEffect, useId, useRef, useState } from "react";
import logo from "../assets/img/Farm2Biz@4x.png";
import passsvg from "../assets/img/SVG@1x (1).png";
import msgsvg from "../assets/img/SVG@1x (2).png";
import { Input } from "../components/Input";
import buyersvg from "../assets/img/I@4x.png";
import farmersvg from "../assets/img/SVG@4xa.png";
import indisvg from "../assets/img/indi@4x.png";
import orgsvg from "../assets/img/org@4x.png";
import { set, useForm, useWatch } from "react-hook-form";
import { auth } from "../utils/services";
import { Link, useNavigate } from "react-router";
import { useUserStore } from "../store/AuthStore";

function CreateProfile() {
  const {setlogin}=useUserStore()
  const fields = {
    producer: {
      individual: 
        [{key:"first_name",label:"First Name",type:"text"},
        {key:"last_name",label:"Last Name",type:"text"},
        {key:"phone_no",
          label:"Phone",type:"phone"
        },
        {key:"about",
          label:"About",
          type:"text"
        },
        {key:"tagline",
          label:"Tagline",
          type:"text"
        },
        {key:"farmArea",
          label:"Farm Area",
          type:"text"
        },
        {key:"location",
          label:"Location",
          type:"text"
        }]
      ,
      organisation: [
        {key:"farmName",label:"Farm Name",type:"text"},
        {key:"phone_no",
          label:"Phone",type:"phone"
        },
        {key:"about",
          label:"About",
          type:"text"
        },
        {key:"tagline",
          label:"Tagline",
          type:"text"
        },
        {key:"farmArea",
          label:"Farm Area",
          type:"text"
        },
        {key:"location",
          label:"Location",
          type:"text"
        }
      ]
    },
    buyer: {
      individual: 
      [{key:"first_name",label:"First Name",type:"text"},
      {key:"last_name",label:"Last Name",type:"text"},
      {key:"phone_no",
        label:"Phone",type:"phone"
      },
      {key:"about",
        label:"About",
        type:"text"
      },
      {key:"tagline",
        label:"Tagline",
        type:"text"
      },
      {key:"location",
        label:"Location",
        type:"text"
      }]
    ,
    organisation: [
      {key:"organisationName",label:"Organisation Name",type:"text"},
      {key:"phone_no",
        label:"Phone",type:"phone"
      },
      {key:"about",
        label:"About",
        type:"text"
      },
      {key:"tagline",
        label:"Tagline",
        type:"text"
      },
      {key:"location",
        label:"Location",
        type:"text"
      }
    ]
    },
  };
  const [step, setstep] = useState(1);
  const navigate = useNavigate();
  const toatl_steps = 4;
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
  } = useForm();
  const [user_type, user_category] = watch(["user_type", "user_category"]);
  const nextstep = () => {
    console.log(step);
    step < toatl_steps ? setstep(step + 1) : "";
  };
  const prevstep = () => {
    step > 1 ? setstep(step - 1) : "";
  };
  const onSubmit = async (e) => {
    console.log(e);
    
    const data = await auth.signup(e);
    if (data){
      console.log(data);
      setlogin(data.user)
      navigate("/dashboard");
    }
  };
  return (
    <div className="w-screen  flex flex-col items-center md:flex-row">
      <header className="w-full h-[10%] flex justify-ends items-center p-5 md:justify-center">
        <img src={logo} alt="" className="w-[30%]" />
      </header>
      <section className="w-full flex flex-col justify-center h-fit pb-5">
        <div className="w-full h-fit flex flex-col justify-center items-center mt-6">
          <div className="h-fit w-[70%] flex flex-col justify-evenly items-center">
            <h1 className="font-bold text-3xl text-center">
              Welcome to
            </h1>
            <img src={logo} alt="" width={"200px"} />
            <p className="text-center font-light">
              Setup Your Farm2Biz Profile
            </p>
          </div>
          <Stepsprogress toatl_steps={toatl_steps} curr_step={step} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1 */}
          <section className={`w-full h-full ${step == 1 ? "" : "hidden"}`}>
            <div className="w-full flex flex-col justify-evenly items-center h-[90%] mt-5">
              <h1 className="font-bold ">Select Your Role:</h1>
              <div className=" w-[80%] h-full flex flex-col justify-evenly items-center  lg:w-[60%]">
                <p className="text-center text-xs h-fit mt-3">
                  At Farm2Biz, we unite those who grow with those who buy,
                  creating a vibrant marketplace for farm-fresh produce. Whether
                  you're looking to purchase premium produce or showcase your
                  own harvest, our platform is designed to meet your needs.
                  Please choose 'Buyer' if you’re shopping, or 'Seller' if
                  you’re listing products.
                </p>
                <div className="w-full flex flex-col justify-evenly items-center ">
                  <RadioCard
                    label="Farmer"
                    desc="List and sell your agricultural products"
                    img={farmersvg}
                    name={"user_type"}
                    value={"producer"}
                    {...register("user_type", { required: true })}
                  />
                  <RadioCard
                    label="Buyer"
                    desc="Purchase fresh produce directly from farmers"
                    img={buyersvg}
                    name={"user_type"}
                    value={"buyer"}
                    {...register("user_type", { required: true })}
                  />
                  {errors.user_type && (
                    <span className="text-sm text-red-500 mt-3 ">
                      Role is required please select one
                    </span>
                  )}
                </div>
                <div className="w-[100%] h-fit flex flex-col justify-center items-center">
                  <button
                    type="button"
                    className="bg-black text-cyan-50 p-2 rounded-md w-full mt-3.5"
                    onClick={async () => {
                      const res = await trigger("user_type", {
                        shouldFocus: true,
                      });
                      res ? nextstep() : "";
                    }}
                    // todo erro msg
                  >
                    Select and Continue
                  </button>
                </div>
              </div>
            </div>
          </section>
          {/* Step 2 */}
          <section
            className={`w-full h-full flex flex-col justify-evenly items-center ${
              step == 2 ? "" : "hidden"
            }`}
          >
            <div className="w-full flex flex-col justify-evenly items-center h-[90%] mt-5 lg:w-[60%]">
              <h1 className="font-bold ">Choose Your Profile Type</h1>
              <div className=" w-[80%] h-full flex flex-col justify-evenly items-center">
                <p className="text-center text-xs h-fit mt-3">
                  Almost there! Are you signing up as an individual, or are you
                  representing an organization? Choose the option that best fits
                  your situation.
                </p>
                <RadioCard
                  label={"Individual"}
                  desc={
                    "Perfect for farmers, small-scale producers, or individual buyers looking to connect directly with the agricultural community."
                  }
                  img={indisvg}
                  name={"user_category"}
                  value="individual"
                  {...register("user_category", { required: true })}
                />
                <RadioCard
                  label={"Organisation"}
                  desc={
                    "Ideal for businesses, cooperatives, distributors, or any organization involved in agricultural trade and commerce."
                  }
                  img={orgsvg}
                  name={"user_category"}
                  value="organisation"
                  {...register("user_category", { required: true })}
                />
                {errors.user_category && (
                  <span className="text-sm text-red-500 mt-3 ">
                    Type is required please select one
                  </span>
                )}
                <button
                  type="button"
                  className="bg-black text-cyan-50 p-2 rounded-md w-full mt-3.5"
                  onClick={async () => {
                    const res = await trigger("user_category", {
                      shouldFocus: true,
                    });
                    res ? nextstep() : "";
                  }}
                >
                  Select and Continue
                </button>
                <button
                  type="button"
                  className="bg-transparent border-2 border-black text-black p-2 rounded-md w-full mt-3.5"
                  onClick={() => prevstep()}
                >
                  Back
                </button>
              </div>
            </div>
          </section>
          {/* Step 3 */}
          <section
            action=""
            className={`w-full h-full flex flex-col justify-evenly items-center ${
              step == 3 ? "" : "hidden"
            }`}
          >
            <div className="w-full flex flex-col justify-evenly items-center h-[90%] mt-5 lg:w-[60%]">
              <h1 className="font-bold ">Choose Your Profile Type</h1>
              <div className=" w-[80%] h-full flex flex-col justify-evenly items-center">
                <p className="text-center text-xs h-fit mt-3">
                  Almost there! Are you signing up as an individual, or are you
                  representing an organization? Choose the option that best fits
                  your situation.
                </p>
                <div className="w-full flex flex-col justify-evenly items-center ">
                  {user_type &&
                    user_category &&
                    fields[user_type][user_category]?.map((field) => {
                      console.log(user_type, user_category);

                      return (
                        <Input
                          className="w-full"
                          label={field["label"]}
                          {...register(field["key"])}
                        />
                      );
                    })}
                </div>
                
                {/* <input
                  type="submit"
                  className="bg-black text-cyan-50 p-2 rounded-md w-full mt-3.5"
                  value={"Submit"}
                /> */}
                <button
                  type="button"
                  className="bg-black text-cyan-50 p-2 rounded-md w-full mt-3.5"
                  onClick={async () => {
                    const res = await trigger("user_category", {
                      shouldFocus: true,
                    });
                    res ? nextstep() : "";
                  }}
                >
                  Submit
                </button>

                <button
                  type="button"
                  className="bg-transparent border-2 border-black text-black p-2 rounded-md w-full mt-3.5"
                  onClick={() => prevstep()}
                >
                  Back
                </button>
              </div>
            </div>
          </section>
          <div
            className={`w-screen flex flex-col items-center justify-center mt-5 md:flex-row ${
              step == 4 ? "" : "hidden"
            }`}
          >
            <div className="w-full flex flex-col justify-center items-center  mt-0 md:w-[50%]">
              <div
                className="w-full flex flex-col justify-center items-center lg:w-[60%]"
              >
                <h1 className="font-bold">Sign Up</h1>
                <div className="mt-5 flex flex-col justify-evenly w-[80%] md:w-[90%]">
                  <Input label={"Email"} avtr={msgsvg} {...register("email")} />
                  <Input
                    label={"Password"}
                    avtr={passsvg}
                    {...register("password1")}
                  />
                  <Input
                    label={"Confirm Password"}
                    avtr={passsvg}
                    {...register("password2")}
                  />
                  <button
                    type="submit"
                    className="bg-black text-cyan-50 p-2 rounded-md mt-1.5"
                  >
                    Sign Up
                  </button>
                  <button
                    type="button"
                    className="bg-transparent border-2 border-black text-black p-2 rounded-md w-full mt-3.5"
                    onClick={() => prevstep()}
                  >
                    Back
                  </button>
                  <div className="inline self-center mt-3">
                    <span>Already have an account? </span>
                    <Link to="/login" className="font-bold cursor-pointer">
                      Log In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default CreateProfile;

const RadioCard = ({ label, desc, img, name, value, ...props }) => {
  const [checked, setchecked] = useState(false);
  const ref = useRef();
  const id = useId();
  // useEffect(() => {
  // console.log(ref.current.checked);
  // }, [checked]);
  return (
    <>
      <label htmlFor={id} className="w-full">
        <input
          type="radio"
          name={name}
          id={id}
          ref={ref}
          value={value}
          className="peer hidden "
          {...props}
        />
        <div
          className={`border-2 w-full  border-gray-300 peer-checked:border-black flex flex-row h-fit  rounded-lg cursor-pointer mt-3`}
        >
          <div className="w-[20%] p-3 bg-gray-200 flex justify-center  items-center rounded-full m-3 aspect-square lg:w-[60px]">
            <img src={img} className="w-[70%] " />
          </div>
          <div className="w-[70%] flex flex-col justify-center items-start">
            <h1 className="font-bold">{label}</h1>
            <p className="text-gray-500 text-xs">{desc}</p>
          </div>
        </div>
      </label>
    </>
  );
};

const Stepsprogress = ({ toatl_steps, curr_step }) => {
  let i = 0;
  const steps = Array(toatl_steps)
    .fill(0, 0, toatl_steps)
    .map(() => {
      return ++i;
    });
  // console.log(steps);

  return (
    <div className="h-fit w-[50%] flex flex-row justify-evenly items-center mt-3">
      {steps.map((i) => (
        <span
          className={`w-[20px] h-[5px] ${
            curr_step == i ? "bg-gray-600" : "bg-gray-300"
          } rounded-full`}
        ></span>
      ))}
    </div>
  );
};
