import classes from "./EventCard.module.css";
import { PlayerDetailsStore } from "../../context/PlayerStore";
import { useEventCardStore } from "../../context/EventCardStore.js";
import { ActiveCellStore } from "../../context/ActiveCellStore.js";
import BusBoardCell from "../Board Components/BusBoardCell";
import Image from "next/image";
//import Board from "./Board Components/Board";

export default function BusStationEvent(props) {
  function log() {
    showEventCard("false");
    return console.log("test");
  }

  let test = document.getElementById("board");
  const [eventCard, showEventCard] = useEventCardStore();
  const [
    ActiveCell,
    setActiveCellStore,
    ActiveCellImages,
    setActiveCellImages,
    ActiveCellName,
    setActiveCellName,
    buttonNameBus,
    setButtonNameBus,
    busImage,
    setBusImage,
  ] = ActiveCellStore();
  //const [ActiveCellImages, setActiveCellImages] = ActiveCellStore();
  const [playerOne] = PlayerDetailsStore();

  let board = [];
  for (let i = 0; i < 11; i++) {
    board.push(i);
  }

  return (
    <div className={classes.fp_container}>
      <table
        id="board"
        style={{
          borderCollapse:"collapse",
          borderSpacing: "0px",
          margin: "0px",
          border: "solid",
          outline: "0px",
          position: "absolute",
          left: "52%",
          bottom: "10%",
        }}
      >
        <tbody>
          {board.map((i) => (
            <tr key={i}>
              {board.map((j) => {
                const id = i * 11 + j;
                return <BusBoardCell id={id} key={id} />;
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={classes.cardInfoBus}>
        <Image
          id="busImage"
          src={busImage}
          position = "absolute"
          width="100%"
          height="100%"
          layout="fill"
        />
        {/* height: 100%;
  position: absolute;
  object-fit: cover; alt="Event Card" /> */}
        <br></br>
        <button className={classes.actionButton} onClick={log}>
          {buttonNameBus}
        </button>
      </div>
    </div>
  );
}
