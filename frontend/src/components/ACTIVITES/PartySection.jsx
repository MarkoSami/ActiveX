import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function PartySection(props) {
  const [partyID, setPartyID] = useState("");
  const navigate = useNavigate();
  function handleRoomOpen() {
    navigate("/party");
  }
  function handleRandomRoomOpen() {
    navigate("/party");
  }
  return (
    <div className="min-h-[100vh] bg-effect flex justify-center items-center">
      <div className="mx-auto container min-h-[100px] flex items-start justify-center">
        <div className="random-party min-h-inherit mx-[1em]">
          <button
            onClick={handleRandomRoomOpen}
            className="min-h-inherit w-full  hover:border hover:border-blue-500 transition duration-300"
          >
            Random Party
          </button>
        </div>
        <div className="private-party flex flex-col">
          <input
            type="number"
            className="bg-[#ffffff0f] h-[40px] mb-[1em] rounded text-white px-[10px] bg-[#050816] border-[1px]"
            placeholder="Room ID"
            value={partyID}
            onChange={(event) => {
              setPartyID(event.target.value);
            }}
          />
          <button
            onClick={handleRoomOpen}
            className="h-full w-full hover:border hover:border-blue-500 transition duration-300"
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}
