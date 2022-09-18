import { useState, createContext, useContext } from "react";

const cards = [
  {
    name: "The Constable",
    image: "/TheConstable.png",
  }
];

const Store = createContext();

export const EventStore = () => useContext(Store);

export const EventStoreProvider = ({ children }) => {
  const [eventStack, setEventStack] = useState(cards);
  

  return (
    <Store.Provider value={[eventStack, setEventStack]}>
      {children}
    </Store.Provider>
  );
};
