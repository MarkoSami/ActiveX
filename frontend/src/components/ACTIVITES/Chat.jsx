import { useEffect, useRef, useState } from "react";
import Messages from "./renderMesasge";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import ScrollToBottom from "react-scroll-to-bottom";
import "animate.css";
import { SocketContext } from "../../APIS/sockectContext";
import { useContext } from "react";
export default function Chat({
  isChild = false,
  userName = "",
  roomId = "",
  fullWindow = true,
}) {
  const [messages, setMessages] = useState([]);
  const socket = useContext(SocketContext);

  const handleMessageReceived = (data) => {
    console.log(`message data ${data}`);
    setMessages((prev) => [...prev, data]);
  };

  useEffect(() => {
    // socket.on("userIsConnected", connectedUser);
    socket.on("message_received", handleMessageReceived);

    return () => {
      // socket.off("userIsConnected", connectedUser);
      socket.off("message_received", handleMessageReceived);
      // socket.disconnect();
    };
  }, []);

  function handleSendButton(input) {
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


      socket.emit("send_message", { messageData });
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
      className={`bg-effect p-[1em] min-w-[30%] ${isChild ? "h-full" : "h-[100vh]"
        } h-full min-h-inherit w-full flex items-center justify-center rounded animate__animated animate__zoomIn`}
    >
      <div className={`rounded w-full h-full`}>
        <section className="mb-[1em] h-full rounded flex flex-col">
          <div className="top-side-chat flex justify-between items-center">
            <h3 className="font-black text-xl flex items-center">
              {" "}
              <Link to=".." className="text-white">
                <BiArrowBack className="mr-[1em] cursor-pointer rounded-lg bg-blue-500 hover:bg-transparent tranistion duration-200 hover:border hover:border-blue-600 min-w-[28px] min-h-[28px] p-[0.2em]" />
              </Link>{" "}
              Chat Section
            </h3>
            <h3 className="text-md"></h3>
          </div>
          <ScrollToBottom className="my-[1.5em] h-[80%] scroll">
            {messages.map((message) => {
              return (
                <Messages
                  message={message}
                  username={userName ? userName : socket.id}
                />
              );
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
              className="bg-blue-600 rounded"
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
