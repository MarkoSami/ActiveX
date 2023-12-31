import React, { useState } from "react";
import srcQr from "../media/qr-login-34.png"
import { Link } from "react-router-dom";
import {FcGoogle} from 'react-icons/fc';
import {BsFacebook} from 'react-icons/bs';
import ButtonC from "./buttons";
import 'animate.css';
export default function Register() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  function handleData(e) {
   const name = e.target.name
    setLoginData((prev) => ({ ...prev, [name]: e.target.value })) 
  }

  console.log(loginData);

  return (
   <div className="container m-auto h-full">
    <div className="flex w-full bg-abstract h-full justify-between animate__animated animate__fadeIn">
      <div className="flex flex-col justify-between h-[65%] my-auto">
        <h1 className="font-black text-[2rem]">Active<span className="text-[2rem] text-indigo-600">X</span></h1>
        <div>
        <h3 className="text-[1.5rem] max-w-[60%] font-bold">Unlimited parties, Drawing, Chat,and more.</h3>
        <p className="my-[0.5em]">If you don’t have an account You can <Link to="./sign-up">Sign Up</Link></p>
        </div>
        <img src={srcQr} className="w-[150px] h-[150px]" alt="" />
      </div>
      <div className="left-side h-full flex flex-col items-center justify-center w-[50%]  my-auto h-[60%]">
      <form className="flex flex-col w-[50%]">
        <input className = "bg-[#ffffff0f] h-[50px] rounded text-white font-bold px-[10px] my-[0.5em] bg-[#050816] border-[1px]"
          type="text"
          placeholder="Enter Email or Mobile Number"
          name="email"
          value={loginData.email}
          onChange={handleData}
        />
         <input className = "bg-[#ffffff0f] h-[50px] rounded text-white font-bold px-[10px] my-[0.5em] bg-[#050816] border-[1px]"
          type="password"
          name="password"
          placeholder="*********"
          value={loginData.password}
          onChange={handleData}
        />
         <Link className="my-[1em]" to="/resetPassword">Reset Password</Link>
        <button className="bg-indigo-500">Sign in</button>
      </form>
      <div className="continue-with flex w-full my-[2em] justify-center items-center">
        <div className="line bg-white rounded h-[3px] w-[20%]"></div>
        <p className="mx-[0.7em]">Continue With</p>
        <div className="line bg-white rounded h-[3px] w-[20%]"></div>
        </div>
        <div className="buttons flex">
          <ButtonC>{<FcGoogle size={20}/>}</ButtonC>
          <ButtonC>{<BsFacebook className="text-blue-600" size={20}/>}</ButtonC>
        </div> 
      </div>
    </div>
   </div>

  );
}
