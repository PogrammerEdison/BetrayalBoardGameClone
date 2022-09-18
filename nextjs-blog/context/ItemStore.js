import { useState, createContext, useContext } from "react";

const cards = [
  {
    name: "Fireworks",
    image: "/firework.png",
    type: "Weapon",
    value: "2"
  },
  {
    name: "Book",
    image: "/book.png",
    type: "Buff",
    value: "2"
  },
  {
    name: "Zombie Knife",
    image: "/zombie.png",
    type: "Weapon",
    value: "3"
  },
  {
    name: "Nimbus 3000",
    image: "/broom.png",
    type: "Buff",
    value: "2"
  },
  {
    name: "Lawyer",
    image: "/lawyer.png",
    type: "Companion",
  }
];

const Store = createContext();

export const ItemStore = () => useContext(Store);

export const ItemStoreProvider = ({ children }) => {
  const [itemStack, setItemStack] = useState(cards);
  

  return (
    <Store.Provider value={[itemStack, setItemStack]}>
      {children}
    </Store.Provider>
  );
};