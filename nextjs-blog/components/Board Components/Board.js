import BoardCell from "./BoardCell.js";
import { useState } from "react";
import { PlayerDetailsStore } from "../../context/PlayerStore.js";
import { CardStackStore } from "../../context/CardStore.js";
import Deck from "../CardDeck/Deck";
import PlayerCard from "../Player Components/PlayerCard.js";
import { EventStore } from "../../context/EventStore.js";
import { useEventCardStore } from "../../context/EventCardStore.js";
import { ActiveCellStore } from "../../context/ActiveCellStore.js";

var { range } = [];

function Board(props) {
  // useEffect(() => {
  //   showEventCard({ type: true });
  // }, [])

  const [activeCellIds, setActiveCellIds] = useState([]);
  const [playerOne] = PlayerDetailsStore();
  const [cardStack, setCardStack] = CardStackStore();
  const [eventCard, showEventCard] = useEventCardStore();
  const [eventStack, setEventStack] = EventStore();
  const [
    ActiveCell,
    setActiveCellStore,
    ActiveCellImages,
    setActiveCellImages,
    ActiveCellName,
    setActiveCellName,
    buttonName,
    setButtonName,
  ] = ActiveCellStore();
  //const [ActiveCellImages, setActiveCellImages] = ActiveCellStore();

  function setActiveCell(cellId) {
    const tempArray = ActiveCell;
    if (tempArray.indexOf(cellId) == -1) tempArray.push(cellId);
    setActiveCellStore(tempArray);
  }

  function setActiveCellImage(cellIdImage) {
    const tempArray = ActiveCellImages;
    if (tempArray.indexOf(cellIdImage) == -1) tempArray.push(cellIdImage);
    setActiveCellImages(tempArray);
    console.log("added " + cellIdImage);
  }

  function setActiveCellNameFunc(cellIdName) {
    const tempArray = ActiveCellName;
    if (tempArray.indexOf(cellIdName) == -1) tempArray.push(cellIdName);
    setActiveCellName(tempArray);
    console.log("added " + cellIdName);
  }

  function identifySurroundingCells(cellId) {}

  function findCell(id) {}

  return (
    <div style={{background: "URL(/table.jpg)", backgroundSize:"cover", position: "fixed", width: "100%", height: "100%"}}>
      {console.log(activeCellIds)}
      <table
        id="board"
        style={{
          borderCollapse:"collapse",
          borderSpacing: "0px",
          margin: "0px",
          border: "solid",
          outline: "0px",
          position: "absolute",
          left: "32%",
          bottom: "10%",
        }}
      >
        <tbody>
          {props.cells.map((i) => (
            <tr key={i} style={{padding: "0px", outline: "0px", margin: "0px"}}>
              {props.cells.map((j) => {
                const id = i * 11 + j;
                return (
                  <BoardCell
                    key={id}
                    id={id}
                    surround={[
                      playerOne.Space % 11 != 0 ? playerOne.Space - 1 : null,
                      (playerOne.Space + 1) % 11 != 0
                        ? playerOne.Space + 1
                        : null,
                      playerOne.Space + 11,
                      playerOne.Space - 11,
                    ]}
                    canBePlaced={[
                      ActiveCell.indexOf(playerOne.Space - 1) == -1,
                      ActiveCell.indexOf(playerOne.Space + 1) == -1,
                      ActiveCell.indexOf(playerOne.Space + 11) == -1,
                      ActiveCell.indexOf(playerOne.Space - 11) == -1,
                    ]}
                    setActiveCell={setActiveCell}
                    setActiveCellImage={setActiveCellImage}
                    setActiveCellName={setActiveCellNameFunc}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="cards"
        style={{ position: "fixed", left: "90%", bottom: "10%" }}
      >
        <Deck cards={cardStack} type="placeCard" />
      </div>
      <div
        id="playerOne"
        style={{
          position: "absolute",
          left: "80vw",
          bottom: "70%",
          width: "200px",
          height: "200px",
        }}
      >
        <PlayerCard />
      </div>
      {/*
      <Events/>
      */}
      <div>
        <div>{eventCard}</div>
      </div>
    </div>
  );
}
export default Board;
