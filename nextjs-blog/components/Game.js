import Board from "./Board Components/Board";
import Deck from "./CardDeck/Deck";

const cards = [
  {
    name: "Roundabout",
    image: "https://i.imgur.com/LHHaiwt.png"
  },
  {
    name: "Spongebob",
    image: "https://i.imgur.com/3pvcxnC.png"
  },
  {
    name: "Drumglass",
    image: "https://i.imgur.com/btLWFMa.png"
  },
  {
    name: "Dungannon Leisure Centre",
    image: "https://i.imgur.com/wKSvBwc.png"
  }
];

function Game() {
  let board = [];
  for (let i = 0; i < 11; i++) {
    board.push(i);
  }
  return(
    <Board cells={board} key={board} />);

}

export default Game;
