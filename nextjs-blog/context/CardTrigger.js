import { useState, createContext, useContext } from "react";

const Store = createContext();

export const CardTrigger = () => useContext(Store);

export const CardTriggerProvider = ({ children }) => {
  const [triggerItemFlip, setTriggerItemFlip] = useState("off");
  const [trigger, setTrigger] = useState("off");
  

  return (
    <Store.Provider
      value={[triggerItemFlip, setTriggerItemFlip, trigger, setTrigger]}
    >
      {children}
    </Store.Provider>
  );
};
