import React, { useContext } from "react";
import Chat from "./Chat";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const ChatSection = () => {
  return (
    <div className="child">
      <div className="grand-child min-h-[80vh] animate__animated animate__zoomInUp">
        <div className="container h-[70%] mx-auto ">
        <Link to=".." className="text-white block m-[2em]">
       <BiArrowBack className="mr-[1em] cursor-pointer rounded-lg bg-indigo-500 hover:bg-transparent tranistion duration-200 hover:border hover:border-indigo-600 min-w-[28px] min-h-[28px] p-[0.2em]" />
      </Link>{" "}
      <div className="bottom-side flex flex-col items-center justify-center h-full">
      <h1 className="text-center text-2xl w-[70%] py-[2em] font-black">
            WARNING! THIS IS BETA VERSION.
          </h1>
          <div className="buttons-chat-section flex">
          <Link to="random-chat" className="bg-indigo-600 text-white p-[2em] rounded m-[1em] transition duration-300 hover:bg-indigo-400">Random Chat</Link>
          <Link to="private-chat" className="border border-indigo-600 text-white p-[2em] rounded m-[1em] duration-300 hover:bg-white hover:text-indigo-600">Private room</Link>
          </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
