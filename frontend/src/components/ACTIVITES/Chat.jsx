import { useEffect, useRef, useState } from "react";
import Messages from "./renderMesasge";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import ScrollToBottom from "react-scroll-to-bottom";
import "animate.css";
import { SocketContext } from "../../APIS/sockectContext";
import { useContext } from "react";
export default function Chat({ userName = "", roomId }) {
  const [messages, setMessages] = useState([]);
  const socket = useContext(SocketContext);

  const handleMessageReceived = (data) => {
    setMessages((prev) => [...prev, data]);
  };

  useEffect(() => {
    // socket.on("userIsConnected", connectedUser);
    socket.on("messageReceived", handleMessageReceived);

    return () => {
      // socket.off("userIsConnected", connectedUser);
      socket.off("messageReceived", handleMessageReceived);
    };
  }, [socket]);

  useEffect(() => {
    socket.connect("http://localhost:3000");

    return () => {
      // socket.off("userIsConnected", connectedUser);
      socket.disconnect();
    };
  }, []);



  async function handleSendButton(input) {
    const messageText = input.current.value;

    if (messageText !== "") {
      const messageData = {
        room: roomId,
        author: userName ? userName : socket.id,
        message: messageText,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      if (roomId) {
        await socket.emit("sendMessagePrivate", { messageData });
      } else await socket.emit("sendMessage", { messageData });
      setMessages((prev) => [...prev, messageData]);
      input.current.value = "";
      input.current.focus();
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendButton(myInput);
    }
  };


  const myInput = useRef(null);

  return (
    <div
      className={`child bg-effect h-full min-w-[30%] w-full min-h-[40vh] flex items-center justify-center rounded animate__animated animate__zoomIn`}
    >
      <div className="grand-child p-[1em] mx-auto rounded">
        <section className="h-full mb-[1em] p-[1em] rounded flex flex-col justify-between">
          <div className="top-side-chat flex justify-between items-center">
            <h3 className="font-black text-xl flex items-center">
              {" "}
              <Link to=".." className="text-white">
                <BiArrowBack className="mr-[1em] cursor-pointer rounded-lg bg-indigo-500 hover:bg-transparent tranistion duration-200 hover:border hover:border-indigo-600 min-w-[28px] min-h-[28px] p-[0.2em]" />
              </Link>{" "}
              Chat Section
            </h3>
            <h3 className="text-md"></h3>
          </div>

          <ScrollToBottom className="h-full my-[1.5em] scroll">
            {messages.map((message) => {
              return <Messages message={message} username={userName ? userName : socket.id} />;
            })}
          </ScrollToBottom>

          <div className="bottom-side-chat flex">
            <input
              ref={myInput}
              className="w-full px-[0.5em] bg-white rounded mr-[0.5em] text-black font-bold"
              type="text"
              onKeyDown={handleKeyPress}
            />
            <button
              className="bg-indigo-600 rounded"
              onClick={() => {
                handleSendButton(myInput);
              }}
            >
              Send
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
