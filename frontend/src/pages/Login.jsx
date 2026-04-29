import React from "react";
import logo from "../assets/img/Farm2Biz@4x.png";
import profile from "../assets/img/SVG@1x.png";
import passsvg from "../assets/img/SVG@1x (1).png";
import msgsvg from "../assets/img/SVG@1x (2).png";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import {useStore} from "zustand"
import { AuthApi } from "../api/auth.api"
import { useUserStore } from "../store/AuthStore";
import { Link, useNavigate } from "react-router";

import toast from "react-hot-toast";

export default function Login() {
  const {userData,setlogin}=useUserStore()
  const { register, handleSubmit } = useForm();
  const navigate=useNavigate();
  const onSubmit = async (data) => {
    try {
      const user = await AuthApi.login({ email: data.email, password: data.password });
      setlogin(user.user, { "access": user.access, "refresh": user.refresh });
      
      toast.success("Login successful!");
      // Redirect based on user role
      if (user.user.role === "producer") {
        navigate("/farmer/home");
      } else {
        navigate("/buyer/home");
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed. Please check your email and password.");
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center md:flex-row">
      <div className="w-full h-[30%] flex justify-center items-center md:w-[50%]">
        <div className="h-[90%] w-[70%] flex flex-col justify-evenly items-center ">
          <img src={logo} alt="" />
          <h1 className="font-bold">Create Your Farm2Biz</h1>
          <h1 className="font-bold">Account</h1>
          <p className="text-center font-light">
            Join our community of forward-thinking farmers and savvy retailers.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center h-[60%] mt-0 md:w-[50%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-full flex flex-col justify-center items-center lg:w-[60%]"
        >
          <h1 className="font-bold">Login</h1>
          <div className="mt-5 flex flex-col justify-evenly w-[80%] md:w-[90%]">
            <Input label={"Email"} avtr={msgsvg} {...register("email")} />
            <Input
              label={"Password"}
              avtr={passsvg}
              {...register("password")}
            />
            <button
              type="submit"
              className="bg-black text-cyan-50 p-2 rounded-md mt-1.5"
            >
            Login
            </button>
            <div className="inline self-center mt-3">
              <span>New to Fram2Biz?</span>
              <Link to="/signup" className="font-bold cursor-pointer"> Sign Up Now</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}


