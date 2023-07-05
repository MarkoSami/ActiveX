import { createContext } from "react";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3000");

const SocketContext = createContext();
export default function SocketContextHandle({ children }) {
    return (
      <SocketContext.Provider value={socket}>
        {children}
      </SocketContext.Provider>
    );
  }

export { SocketContext };
