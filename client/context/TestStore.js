import { createContext, useContext, useReducer } from "react";
import React, { useState } from "react";

const Store = createContext();

export const TestStore = () => useContext(Store);

export const TestStoreProvider = ({ children }) => {
  const [buttonName, setButtonName] = useState("Draw Event Card");

  return (
    <Store.Provider value={[buttonName, setButtonName]}>
      {children}
    </Store.Provider>
  );
};
