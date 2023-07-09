import "animate.css";
import Input from "../../credentials/Input";
import { AiFillYoutube } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import "animate.css";
import Chat from "./Chat";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { SocketContext } from "../../APIS/sockectContext";
import { useContext } from "react";
import YouTube from "react-youtube";

export default function Party({ host = false }) {
  const [roomId, setRoomId] = useState({});
  let [SearchData, setSearchData] = useState();
  let [mySrcVideo, setSrcVideo] = useState("");
  const playerRef = useRef(null);
  const socket = useContext(SocketContext);

  function handleRoomID(data) {
    console.log(data);
    setRoomId(data);
  }

  const handleSeekTo = (seconds) => {
    if (playerRef.current) {
      playerRef.current.seekTo(seconds);
    }
  };

  function handleData(e) {
    const { value } = e.target;
    setSearchData(value);
  }

  useEffect(() => {
    socket.emit("join_random_room");
    socket.on("joined_random_room", handleRoomID);

    socket.on("video_ready", (URLData) => {
      setSearchData(URLData);
      HandleSearch();
    });

    socket.on("video_started", (Time) => {
      // Handle video started event
      handleSeekTo(Time)
    });

    socket.on("video_paused", () => {
      // Handle video paused event
      playerRef.current.pauseVideo();
    });

    // Clean up the event listeners when the component unmounts
    return () => {
      socket.off("joined_random_room", handleRoomID);
      socket.off("video_started");
      socket.off("video_paused");
      socket.off("video_ready");
    };
  }, []);

  function handleOnPause() {
    socket.emit("video_paused", roomId);
  }

  function handleOnPlay(event) {
    socket.emit("video_started", {
      roomId,
      currentTime: event.target.getCurrentTime(),
    });
  }

  function handleOnReady() { 
    socket.emit("video_ready", {
      roomId,
      video_URL: SearchData,
    });
  }

  function convertToValidKey(str) {
    // Convert the string to lowercase and split it by spaces
    const words = str.toLowerCase().split(" ");

    // Capitalize the first letter of each word except the first one
    const transformedWords = words.map((word, index) => {
      if (index === 0) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Join the transformed words using an empty string as a separator
    const validKey = transformedWords.join("");

    return validKey;
  }

  function getYouTubeVideoId(link) {
    const url = new URL(link);
    const searchParams = new URLSearchParams(url.search);
    return searchParams.get("v");
  }

  function HandleSearch() {
    setSrcVideo(String(getYouTubeVideoId(SearchData)));
  }

  return (
    <>
      <div className="animate__animated animate__fadeIn child bg-effect">
        <main className="grand-child">
          <div className="topside mx-auto flex justify-between px-[3em]">
            <Link
              to=".."
              className="text-white font-black hover:text-white text-left text-[2rem] py-[1em]"
            >
              Activity<span className="text-blue-600">X</span>
            </Link>
            <div className="search-bar w-fit flex items-center py-[2em] relative">
              <div className="iconContainer absolute bottom-[35px] left-[-70px] ">
                <AiFillYoutube className="w-[50px] h-[50px]" />
              </div>
              <input
                className="bg-[#ffffff0f] md:min-w-[600px] h-[40px] rounded text-white px-[10px] my-[0.5em] bg-[#050816] border-[1px]"
                type={"text"}
                placeholder={`Search for Youtube Video`}
                value={SearchData}
                onChange={handleData}
              />
              <button
                onClick={HandleSearch}
                className="border-1 border-blue-600 h-[43px] ml-[1rem] rounded hover:bg-blue-500 transition duration-300"
              >
                Search
              </button>
            </div>
          </div>
          <div className="main-section w-[95%] mx-auto flex h-[80%] min-h-[80%] rounded justify-between">
            {mySrcVideo ? (
              <YouTube
                className="min-w-[70%] h-full"
                videoId={mySrcVideo}
                iframeClassName={"w-full h-full"}
                onPause={handleOnPause}
                onPlay={handleOnPlay}
                onReady={(event) => {
                  // Access the player instance via event.target
                  playerRef.current = event.target;
                  handleOnReady();
                }}
              />
            ) : (
              <div className="h-full w-full min-w-[70%] flex  border rounded font-black text-3xl items-center justify-center my-auto">
                {" "}
                Your Video Should Show here{" "}
              </div>
            )}
            <Chat isChild={true} fullWindow={false} socket={socket} />
          </div>
        </main>
      </div>
    </>
  );
}
