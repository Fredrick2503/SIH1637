import React from "react";
import logo from "../assets/img/Farm2Biz@4x.png";
import profile from "../assets/img/SVG@1x.png";
import passsvg from "../assets/img/SVG@1x (1).png";
import msgsvg from "../assets/img/SVG@1x (2).png";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Link, useNavigate } from "react-router";
import { useUserStore } from "../store/AuthStore";
import { auth } from "../utils/services";


export default function Signup() {
  const { register, handleSubmit } = useForm();
    const {userData,setlogin}=useUserStore()
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault;
    const user = await auth.login(e).then((res) => {
      console.log(res);
      return res.data;
    });
    setlogin(user.user);
    console.log(userData);
    // console.log(data);
    navigate("/profile_setup");
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
          <h1 className="font-bold">Sign Up</h1>
          <div className="mt-5 flex flex-col justify-evenly w-[80%] md:w-[90%]">
            <Input label={"Email"} avtr={msgsvg} {...register("email")} />
            <Input
              label={"Password"}
              avtr={passsvg}
              {...register("password")}
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
            <div className="inline self-center mt-3">
              <span>Already have an account? </span>
              <Link to="/login" className="font-bold cursor-pointer">
                Log In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
