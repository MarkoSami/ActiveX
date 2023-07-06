import { Link } from "react-router-dom";
import { GiPartyPopper } from "react-icons/gi";
import { BsFillChatFill } from "react-icons/bs";
import { MdOutlineDraw } from "react-icons/md";
import { useState } from "react";

export default function TypeActive({ type = "Draw" }) {
  const [hoverHandle, setHoverHandle] = useState(false);

  return (
    <Link
      onMouseLeave={() => {
        setHoverHandle(false);
      }}
      onMouseOver={() => {
        setHoverHandle(true);
      }}
      to={type}
      className={`w-[100%] m-[0.5em] ${
        hoverHandle ? "transiton-effect" : "transiton-effect-leave"
      }  bg-[#3d3d3d4f] min-h-[200px] rounded transition hover:bg-blue-500`}
    >
      <div className="py-[2em]">
        {type === "Party" ? (
          <GiPartyPopper className="text-white mx-auto w-[100px] h-[100px]" />
        ) : type === "Chat" ? (
          <BsFillChatFill className="text-white mx-auto w-[100px] h-[100px]" />
        ) : (
          <MdOutlineDraw className="text-white mx-auto w-[100px] h-[100px]" />
        )}
        <h1
          className={`text-[2rem] font-black ${
            !hoverHandle ? "text-blue-400" : "text-white"
          } text-center py-[1em]`}
        >
          {type}
        </h1>
      </div>
    </Link>
  );
}
