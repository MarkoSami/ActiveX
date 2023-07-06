import React, { useContext } from "react";
import Chat from "./Chat";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const ChatSection = () => {
  return (
    <div className="child">
      <div className="grand-child min-h-[80vh] animate__animated animate__zoomInUp">
        <div className="container h-[70%] mx-auto ">
          <div className="bottom-side flex flex-col items-center justify-center h-full">
            <h1 className="text-center text-2xl w-[70%] py-[2em] font-black">
              WARNING! THIS IS BETA VERSION.
            </h1>
            <div className="buttons-chat-section items-center flex">
              <Link to=".." className="text-white block p-[1em] bg-blue-500 rounded-lg m-[1em] hover:bg-transparent hover:border hover:border-blue-500 transition duration-500">
                <BiArrowBack className="mr-[1em] w-full h-full cursor-pointer  tranistion duration-200  min-w-[28px] min-h-[28px] p-[0.2em]" />
              </Link>{" "}
              <Link
                to="random-chat"
                className="bg-blue-600 text-white p-[1em] text-xl font-black  rounded m-[1em] transition duration-300 hover:bg-blue-400"
              >
                Random Chat
              </Link>
              <Link
                to="private-chat"
                className="border border-blue-600 text-white font-black p-[1em] text-xl  rounded m-[1em] duration-300 hover:bg-white hover:text-blue-600"
              >
                Private room
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
