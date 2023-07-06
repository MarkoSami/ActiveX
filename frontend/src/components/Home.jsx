import React, { useEffect } from "react";
import Scroll from "react-scroll";
const { Element, scroller } = Scroll;
import TypeActiveButton from "./TypeActive";
import { BsFilm } from "react-icons/bs";
import { BsFillChatFill } from "react-icons/bs";
import { MdOutlineDraw } from "react-icons/md";
import { CgScrollV } from "react-icons/cg";
import { BsPersonHeart } from "react-icons/bs";
import "animate.css";
import music from "../media/audio/music.mp3"
export default function Home() {

  return (
    <div className="home bg-effect child">
      <div className="container mx-auto animate__animated animate__zoomIn py-[2em]">
        <div className="section-1">
          <h1 className="text-left text-[2rem] py-[1em] font-black w-[40%]">
            Activity<span className="text-blue-600">X</span>
          </h1>
          <div className="w-full flex flex-col items-center">
            <h1 className="font-black text-center">
              Welcome!
            </h1>
            <h2 className="font-black text-center text-blue-400">
              Ready to be Active ?{" "}
            </h2>
            <h2 className="font-black text-center text-[2.5rem] py-[2em]">
              Bored from being <span className="text-blue-400">alone</span>?
              make new <span className="text-blue-400">Friends</span> Now !
            </h2>
            <button
              className="w-[20%] py-[1em] bg-blue-600 hover:bg-white hover:text-black transition"
              onClick={() =>
                scroller.scrollTo("home2", {
                  duration: 1500,
                  delay: 100,
                  smooth: true,
                  offset: -50, // Optional offset, adjust as needed
                })
              }
            >
              Start Now !
            </button>
            <CgScrollV className="my-[4em] w-[50px] h-[50px] animate__animated animate__bounce" />
            <div className="about flex flex-col">
              <div className="div flex justify-between px-[10em]">
                <p className="w-[60%]">
                  With ActivityX you can watch Youtube together. Services such
                  as Vimeo, Netflix, Amazon, Disney & Co are also supported.
                </p>
                <ul className="w-[30%]">
                  <ol className="my-[0.3em] flex items-baseline">
                    <div className="point mr-[0.5em]"></div>Synchronized player
                    for video and audio
                  </ol>
                  <ol className="my-[0.3em] flex items-baseline">
                    <div className="point mr-[0.5em]"></div> Talk to your
                    friends in the integrated chat room
                  </ol>
                  <ol className="my-[0.3em] flex items-baseline">
                    <div className="point mr-[0.5em]"> </div>
                    Enjoy content from YouTube, Vimeo, Dailymotion and
                    SoundCloud
                  </ol>
                  <ol className="my-[0.3em] flex items-baseline">
                    <div className="point mr-[0.5em]"> </div>Organize content
                    into playlists
                  </ol>
                </ul>
              </div>
              <div className="steps px-[6em] my-[2.5em] flex justify-between w-[50%] mx-auto bg-blue-500 py-[1em] rounded">
                <div>1. Create a room</div>
                <div>2. Share the link</div>
                <div>3. Watch2Gether</div>
              </div>
              <p className="flex items-center">
                {" "}
                <BsPersonHeart className="w-[50px] h-[50px] mx-[2em]" /> With
                ActivityX you can watch Youtube videos together. Other services
                such as Vimeo, Netflix, Amazon, Disney & Co are also supported.
                Create a room, share the link and you're good to go. All videos
                run synchronously and you can talk via the built-in chat. Have
                fun with ActivityX!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Element name="home2" >
        <div className="container m-auto flex flex-col justify-between h-[70%]">
          <h1 className="text-center pt-[3em] font-black">
            Choose how do you want to be{" "}
            <span className="text-blue-400">Active</span>
          </h1>
          <p className="text-center py-[1em]">
            We Have Options for Parties, Random Chats, Chatting and Drawing with
            Friends.
          </p>
          <h3 className="text-center text-3xl font-black my-[2em]">
          “Let your actions be louder than your words and your dreams bigger than your fears.”{" "}
            <span className="text-blue-400">~ Invajy</span>
          </h3>
          <div className="flex justify-between w-[50%] mx-auto py-[2em]">
            <TypeActiveButton type="Party" />
            <TypeActiveButton type="Chat" />
            <TypeActiveButton type="Drawing" />
          </div>
        </div>
      </Element>
    </div>
  );
}
