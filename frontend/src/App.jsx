import { useState } from "react";
import ReactDOM from "react-dom/client";
import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  createHashRouter,
} from "react-router-dom";
import GenericCredentials from "./credentials/GenericCredentials";
import Home from "./components/Home";
import { auth } from "./APIS/auth";
import Chat from "./components/ACTIVITES/Chat";
import ChatSection from "./components/ACTIVITES/ChatSection";
import PrivateChat from "./components/ACTIVITES/PrivateChat";
import SocketContextHandle from "./APIS/sockectContext";
import PartySection from "./components/ACTIVITES/PartySection";
import Party from "./components/ACTIVITES/Party";
import Draw from "./components/ACTIVITES/Draw";
function App() {
  const router = createHashRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route
          key={location.pathname} // Use the current path as the key
          path="sign-in"
          element={
            <GenericCredentials
              signStatus={true}
              inputs={["email", "password"]}
            />
          }
        />
        <Route
          path="sign-up"
          element={
            <GenericCredentials
              signStatus={false}
              inputs={["First Name", "Last Name", "email", "password"]}
            />
          }
        />
        <Route path="/Drawing" element={<Draw />} />
        <Route path="/party-section" element={<PartySection />} loader={auth} />
        <Route path="/party" element={<Party />} />
        <Route path="Chat">
          <Route index element={<ChatSection />} loader={auth} />
          <Route path="random-chat" element={<Chat />} />
          <Route path="private-chat" element={<PrivateChat />} />
        </Route>
      </>
    )
  );

  return (
    <>
      <SocketContextHandle>
        <RouterProvider router={router} />
      </SocketContextHandle>
    </>
  );
}

export default React.memo(App);
