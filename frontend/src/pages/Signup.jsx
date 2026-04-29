import React from "react";
import logo from "../assets/img/Farm2Biz@4x.png";
import profile from "../assets/img/SVG@1x.png";
import passsvg from "../assets/img/SVG@1x (1).png";
import msgsvg from "../assets/img/SVG@1x (2).png";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Link, useNavigate } from "react-router";
import { useUserStore } from "../store/AuthStore";
import { AuthApi } from "../api/auth.api";

import toast from "react-hot-toast";

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const { userData, setlogin } = useUserStore();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    if (data.password1 !== data.password2) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const res = await AuthApi.signup(data);
      if (res) {
        setlogin(res.user, { access: res.access, refresh: res.refresh });
        toast.success("Signup successful!");
        navigate("/profile_setup");
      }
    } catch (error) {
      console.error("Signup failed", error);
      toast.error("Signup failed. Please check your details.");
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center md:flex-row overflow-y-auto py-10">
      <div className="w-full h-[20%] flex justify-center items-center md:w-[40%] md:h-full">
        <div className="h-full w-[70%] flex flex-col justify-center items-center ">
          <img src={logo} alt="Farm2Biz" className="mb-4" />
          <h1 className="font-bold text-xl">Create Your Farm2Biz</h1>
          <h1 className="font-bold text-xl">Account</h1>
          <p className="text-center font-light mt-2">
            Join our community of forward-thinking farmers and savvy retailers.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center md:w-[60%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[90%] md:w-[80%] lg:w-[60%] flex flex-col gap-4 py-8"
        >
          <h1 className="font-bold text-2xl text-center">Sign Up</h1>
          
          <Input label={"Email"} avtr={msgsvg} {...register("email", { required: true })} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">I am a:</label>
              <select 
                {...register("user_type", { required: true })}
                className="p-2 border rounded-md bg-white"
              >
                <option value="producer">Producer (Farmer)</option>
                <option value="buyer">Buyer (Retailer/Wholesaler)</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Registering as:</label>
              <select 
                {...register("user_category", { required: true })}
                className="p-2 border rounded-md bg-white"
              >
                <option value="individual">Individual</option>
                <option value="organisation">Organisation/Company</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={"Password"}
              avtr={passsvg}
              type="password"
              {...register("password1", { required: true })}
            />
            <Input
              label={"Confirm Password"}
              avtr={passsvg}
              type="password"
              {...register("password2", { required: true })}
            />
          </div>

          <button
            type="submit"
            className="bg-black text-cyan-50 p-3 rounded-md font-bold hover:bg-gray-800 transition-colors mt-4"
          >
            Sign Up
          </button>
          
          <div className="inline self-center mt-3">
            <span>Already have an account? </span>
            <Link to="/login" className="font-bold cursor-pointer hover:underline">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
