import { createContext, useContext, useRef } from "react";
import { useState } from "react";

const Store = createContext();

export const PlayerDetailsStore = () => useContext(Store);

export const PlayerDetailsStoreProvider = ({ children }) => {
  const [playerOne, setPlayerOne] = useState([5, 5, 5, 60, [], ""]);
  const [playerTwo, setPlayerTwo] = useState([5, 5, 5, 60, [], ""]);
  const [playerThree, setPlayerThree] = useState([5, 5, 5, 60, [], ""]);
  const [playerFour, setPlayerFour] = useState([5, 5, 5, 60, [], ""]);
  const [clientName, setClientName] = useState("");
  const [clientPlayer, setClientPlayer] = useState("");

  const [playerOneImage, setPlayerOneImage] = useState(
    "https://i.imgur.com/JreYOd6.png"
  );

  // const [playerOne, setPlayerOne] = useState(playerOne);
  // const [playerTwo, setPlayerTwo] = useState(playerTwo);

  return (
    <>
      <Store.Provider
        value={[
          playerOneImage,
          setPlayerOneImage,
          playerOne,
          setPlayerOne,
          playerTwo,
          setPlayerTwo,
          playerThree,
          setPlayerThree,
          playerFour,
          setPlayerFour,
          clientName,
          setClientName,
          clientPlayer,
          setClientPlayer,
        ]}
      >
        {children}
      </Store.Provider>
      ,
    </>
  );
};
