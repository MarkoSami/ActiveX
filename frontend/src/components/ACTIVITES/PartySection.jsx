import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../APIS/sockectContext";

export default function PartySection(props) {
  const socket = useContext(SocketContext);
  const [partyID, setPartyID] = useState("");
  const navigate = useNavigate();
  function handleRoomOpen() {
    navigate("/party?private=true");
  }
  console.log(`room id ->>>>>${partyID}`);
  function connectRoom() {
    navigate(`/party?private=true&roomId=${partyID}`);
    socket.emit('join_room', partyID);
  }
  function handleRandomRoomOpen() {
    navigate("/party");
  }
  return (
    <div className="min-h-[100vh] bg-effect flex justify-center items-center">
      <div className="mx-auto container min-h-[100px] flex items-start justify-center mx-auto">
        <div className="random-party mx-[4em] min-h-inherit mx-[1em max-w-[300px] w-[30%]">
          <button
            onClick={handleRandomRoomOpen}
            className="min-h-inherit hover:border hover:border-blue-500 w-full transition duration-300"
          >
            Random Party
          </button>
        </div>
        <div className="private-party flex w-[40%] justify-between">
          <div className="join-room max-w-[300px] mx-[2em]">
            <input
              type="text"
              className="bg-[#ffffff0f] w-full h-[40px] mb-[1em] rounded text-white px-[10px] bg-[#050816] border-[1px]"
              placeholder="Room ID"
              value={partyID}
              onChange={(event) => {
                setPartyID(event.target.value);
              }}
            />
            <div className="buttons-party-sec">
              <button
                onClick={connectRoom}
                className="h-full w-full hover:border hover:border-blue-500 transition duration-300"
              >
                Connect
              </button>
            </div>
          </div>
          <div className="create-room  w-full max-w-[300px] ">
            <button
              onClick={() => { handleRoomOpen(); socket.emit('create_room') }}
              className="h-full w-full inline-block hover:border hover:border-blue-500 transition duration-300"
            >
              Create Room
            </button>
          </div>
        </div>
      </div >
    </div >
  );
}
