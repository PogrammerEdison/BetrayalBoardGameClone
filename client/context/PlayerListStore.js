import React, { useState, createContext, useContext } from "react";

const Store = createContext();

export const PlayerListStore = () => useContext(Store);

export const PlayerListStoreProvider = ({ children }) => {
  const [playerList, setPlayerList] = useState([]);

  return (
    <Store.Provider
      value={[playerList, setPlayerList]}
    >
      {children}
    </Store.Provider>
  );
};
