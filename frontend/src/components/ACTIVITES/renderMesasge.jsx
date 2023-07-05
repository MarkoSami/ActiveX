import "animate.css";
import { useRef, useState } from "react";
export default function Messages({ message, username }) {
  const messageData = message.messageData ? message.messageData : message;
  console.log(messageData);
  console.log(messageData.author + " author");
  console.log(username + " username");
  return (
    <>
      {messageData && (
        <div className="animate__animated mr-[1em] my-[1.5em] animate__zoomInUp">
          <p
            className={`text-[0.6em] mr-[0.6em]  ${
              messageData.author !== username ? "text-left" : "text-right"
            }`}
          >
            {messageData.author}
          </p>

          <div
            className={`py-[0.5em] px-[1em] rounded-lg max-w-[70%] my-[0.5em] w-fit ${
              messageData.author !== username
                ? "mr-auto bg-none border border-indigo-600"
                : "ml-auto bg-indigo-600"
            } text-wrap`}
          >
            {messageData.message}
          </div>
          <p
            className={`text-[0.6em] mr-[0.6em]  ${
              messageData.author !== username ? "text-left" : "text-right"
            }`}
          >
            {messageData.time}
          </p>
        </div>
      )}
    </>
  );
}
