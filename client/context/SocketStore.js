import { createContext, useContext, useReducer } from "react";
import { useState } from "react";
import { useRef } from "react";

import io from "socket.io-client";


// const socket = io.connect("http://localhost:3001", {
// });

const Store = createContext();

export const SocketStore = () => useContext(Store);

export const SocketStoreProvider = ({ children }) => {
  const socket = io.connect("https://pure-atoll-20271.herokuapp.com/");
  const [Socket, setSocket] = useState(socket);

  return (
    <Store.Provider value={[Socket, setSocket]}>{children}</Store.Provider>
  );
};
