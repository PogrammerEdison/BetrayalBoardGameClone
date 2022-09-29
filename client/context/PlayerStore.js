import { createContext, useContext } from "react";
import { useState } from "react";

const Store = createContext();

class Player {
  constructor(strength, intelligence, speed, space, items) {
    this.strength = strength;
    this.intelligence = intelligence;
    this.speed = speed;
    this.space = space;
    this.items = items;
  }

  get Strength() {
    return this.strength;
  }

  set Strength(strength) {
    this.strength = strength;
  }

  get Intelligence() {
    return this.intelligence;
  }

  set Intelligence(intelligence) {
    this.intelligence = intelligence;
  }

  get Speed() {
    return this.speed;
  }

  set Speed(speed) {
    this.speed = speed;
  }

  get Space() {
    return this.space;
  }

  set Space(space) {
    this.space = space;
  }

  get Items() {
    return this.items;
  }

  set Items(items) {
    this.items = items;
  }
}

export const PlayerDetailsStore = () => useContext(Store);

export const PlayerDetailsStoreProvider = ({ children }) => {
  let playerOne = new Player(5, 5, 5, 60, []);
  let playerTwo = new Player(5, 5, 5, 59, []);
  const [playerOneImage, setPlayerOneImage] = useState("https://i.imgur.com/pdPR9ds.png")
  // const [playerOne, setPlayerOne] = useState(playerOne);
  // const [playerTwo, setPlayerTwo] = useState(playerTwo);

  return (
    <>
      <Store.Provider value={[playerOne, playerOneImage, setPlayerOneImage]}>{children}</Store.Provider>
      ,
    </>
  );
};
