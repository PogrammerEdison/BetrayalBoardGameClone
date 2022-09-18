import { createContext, useContext, useReducer } from "react";
import { useState } from "react";
import { useRef } from "react";

import io from "socket.io-client";


// const socket = io.connect("http://localhost:3001", {
//   reconnection: true,
//   reconnectionAttempts: Infinity,
//   forceNewConnection: false,
// });

const Store = createContext();

export const SocketStore = () => useContext(Store);

export const SocketStoreProvider = ({ children }) => {
  //const socket = io.connect("https://mighty-brushlands-84806.herokuapp.com/");
  const [Socket, setSocket] = useRef(0);

  return (
    <Store.Provider value={[Socket, setSocket]}>{children}</Store.Provider>
  );
};
