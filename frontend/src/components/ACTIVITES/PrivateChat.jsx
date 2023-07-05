import React, { useContext, useState } from "react";
import { Button } from "react-scroll";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import Chat from "./Chat";
import { SocketContext } from "../../APIS/sockectContext";

const PrivateChat = () => {
  const socket = useContext(SocketContext)
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isConnected, setIsConntected] = useState(false);
  function joinRoom() {
    if (userName !== "" && roomId !== "") {
      socket.emit("join_room", roomId);
      setIsConntected(true);
    }
  }
  return (
    <div className="child">
      <div className="grand-child min-h-[80vh] animate__animated animate__zoomInUp">
        <div className={`${isConnected ? "h-[100%]" : "h-[90%]"}`}>
          {!isConnected && (
            <>
              <Link to=".." className="text-white block m-[2em]">
                <BiArrowBack className="mr-[1em] cursor-pointer rounded-lg bg-indigo-500 hover:bg-transparent tranistion duration-200 hover:border hover:border-indigo-600 min-w-[28px] min-h-[28px] p-[0.2em]" />
              </Link>{" "}
            </>
          )}
          <div className="bottom-side flex flex-col w-[80%] mx-auto items-center h-full">
            <h1 className="text-center text-2xl py-[1em] font-black">
              WARNING! THIS IS BETA VERSION.
            </h1>
            {!isConnected && (
              <>
                <div className="inputs w-[25%] flex flex-col">
                  <input
                    type="text"
                    placeholder="userName"
                    className="bg-[#ffffff0f] h-[50px] rounded text-white font-bold px-[10px] my-[0.5em] bg-[#050816] border-[1px]"
                    value={userName}
                    onChange={(event) => {
                      setUserName(event.target.value);
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Room ID"
                    className="bg-[#ffffff0f] h-[50px] rounded text-white font-bold px-[10px] my-[0.5em] bg-[#050816] border-[1px]"
                    value={roomId}
                    onChange={(event) => {
                      setRoomId(event.target.value);
                    }}
                  />
                </div>
                <div className="buttons-chat-section flex">
                  <button
                    onClick={joinRoom}
                    className="border my-[2em] border-indigo-600 text-white p-[1em] m-0 transition rounded m-[1em] duration-300 hover:bg-white hover:text-indigo-600"
                  >
                    Connect
                  </button>
                </div>{" "}
              </>
            )}

            {isConnected && (
              <Chat userName={userName} roomId={roomId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateChat;
