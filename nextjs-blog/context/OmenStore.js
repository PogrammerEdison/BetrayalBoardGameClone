import { useState, createContext, useContext } from "react";

const cards = [
  {
    name: "The Lawyer",
    image: "/LawyerOmen.png",
  }
];

const Store = createContext();

export const OmenStore = () => useContext(Store);

export const OmenStoreProvider = ({ children }) => {
  const [omenStack, setOmenStack] = useState(cards);
  

  return (
    <Store.Provider value={[omenStack, setOmenStack]}>
      {children}
    </Store.Provider>
  );
};
