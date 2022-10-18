import { createContext, useContext, useReducer } from "react";
import React, { useState } from "react";

const Store = createContext();

export const TurnTrackerStore = () => useContext(Store);

export const TurnTrackerStoreProvider = ({ children }) => {
    const [currentTurn, setCurrentTurn] = useState(0);
    const [isTurn, setIsTurn] = useState(false);
    const [turnCounter, setTurnCounter] = useState(1);

  return (
    <Store.Provider value={[currentTurn, setCurrentTurn, isTurn, setIsTurn, turnCounter, setTurnCounter]}>
      {children}
    </Store.Provider>
  );
};
