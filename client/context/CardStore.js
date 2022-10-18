import { useState, createContext, useContext } from "react";


const cards = [
  {
    name: "Roundabout",
    image: "/roundabout.png",
    type: "normal",
  },
  {
    name: "Drumglass",
    image: "/drumglass.png",
    type: "cardEvent",
    button: "NormalRoll",
    rollType: "1",
    value: 0,
    penalty: -2
  },
  {
    name: "Bingo",
    image: "/Bingo.png",
    type: "drawEvent2",
  },
  {
    name: "Courthouse",
    image: "/Courthouse.png",
    type: "cardEvent",
    button: "Court",
    penalty: 0
  },
  {
    name: "Frank Street",
    image: "/Frank Street.png",
    type: "normal",
  },
  {
    name: "Gym",
    image: "/Gym.png",
    type: "cardEvent",
    button: "NormalAdd",
    rollType: "Strength",
    value: 2,
    penalty: 0
  },
  {
    name: "Hospital",
    image: "/Hospital.png",
    type: "statBoost",
  },
  {
    name: "Library",
    image: "/Library.png",
    type: "statBoost",
  },
  {
    name: "Moy Park",
    image: "/Moy Park.png",
    type: "omenEvent",
  },
  {
    name: "Oaks Road",
    image: "/Oaks Road.png",
    type: "normal",
  },
  {
    name: "Planeland Road",
    image: "/PlaneLand Road.png",
    type: "normal",
  },
  {
    name: "PSNI",
    button: "discard",
    penalty: "weapon",
    image: "/PSNI.png",
    type: "cardEvent",
  },
  {
    name: "Bus Station",
    image: "/Bus Station.png",
    type: "busStation",
  },
  {
    name: "Square Road",
    image: "/Square Road.png",
    type: "omenEvent",
  },
  {
    name: "Tesco",
    image: "/Tesco.png",
    type: "cardEvent",
  },
  {
    name: "TheDump",
    image: "/TheDump.png",
    type: "cardEvent",
  },
  {
    name: "Town Square",
    image: "/Town Square.png",
    type: "omenEvent",
  },
];

const Store = createContext();

export const CardStackStore = () => useContext(Store);

export const CardStackStoreProvider = ({ children }) => {
  const [cardStack, setCardStack] = useState(cards);

  return (
    <Store.Provider value={[cardStack, setCardStack]}>
      {children}
    </Store.Provider>
  );
};
