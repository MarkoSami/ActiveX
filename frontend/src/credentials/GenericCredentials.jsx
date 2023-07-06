import React, { useState } from "react";
import srcQr from "../media/qr-login-34.png";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import ButtonC from "./buttons";
import "animate.css";
import Input from "./Input";
export default function Register(props) {
  
  const signLink = props.signStatus ? "sign-up" : "sign-in";
  return (
    <div className="container m-auto child">
      <div className="flex w-full grand-child bg-abstract h-full justify-between animate__animated animate__fadeIn">
        <div className="flex flex-col justify-between h-[65%] my-auto">
          <h1 className="font-black text-[2rem]">
            Active<span className="text-[2rem] text-blue-600">X</span>
          </h1>
          <div>
            <h3 className="text-[1.5rem] max-w-[60%] font-bold">
              Unlimited parties, Drawing, Chat,and more.
            </h3>
            <p className="my-[0.5em]">
              {props.signStatus
                ? "If you don’t have an account You can"
                : "If you have an account You can"}{" "}
              <Link className="text-blue-300 font-bold" to={`/${signLink}`}>
                {props.signStatus ? "Sign Up" : "Sign in"}
              </Link>
            </p>
          </div>
          <img src={srcQr} className="w-[150px] h-[150px]" alt="" />
        </div>
        <div className="left-side h-full flex flex-col items-center justify-center w-[50%]  my-auto h-[60%]">
          <form className="flex flex-col w-[50%]">
          <Input inputs = {props.inputs} className="bg-[#ffffff0f] h-[50px] rounded text-white font-bold px-[10px] my-[0.5em] bg-[#050816] border-[1px]"/>
            {props.signIn && (
              <Link className="my-[1em]" to="/resetPassword">
                Reset Password
              </Link>
            )}
            <button className="bg-blue-500">
              {props.signStatus ? "Sign in" : "Sign Up"}
            </button>
          </form>
          <div className="continue-with flex w-full my-[2em] justify-center items-center">
            <div className="line bg-white rounded h-[3px] w-[20%]"></div>
            <p className="mx-[0.7em]">Continue With</p>
            <div className="line bg-white rounded h-[3px] w-[20%]"></div>
          </div>
          <div className="buttons flex">
            <ButtonC>{<FcGoogle size={20} />}</ButtonC>
            <ButtonC>
              {<BsFacebook className="text-blue-600" size={20} />}
            </ButtonC>
          </div>
        </div>
      </div>
    </div>
  );
}
