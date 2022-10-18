import BoardCell from "./BoardCell.js";
import { useState } from "react";
import { PlayerDetailsStore } from "../../context/PlayerStore.js";
import { CardStackStore } from "../../context/CardStore.js";
import Deck from "../CardDeck/Deck";
import PlayerCard from "../Player Components/PlayerCard.js";
import { EventStore } from "../../context/EventStore.js";
import { useEventCardStore } from "../../context/EventCardStore.js";
import { ActiveCellStore } from "../../context/ActiveCellStore.js";
import { PlayerListStore } from "../../context/PlayerListStore";
import { SocketStore } from "../../context/SocketStore.js";
import { useEffect } from "react";
import { TurnTrackerStore } from "../../context/TurnTrackerStore.js";

var { range } = [];

function Board(props) {
  const [
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
  ] = PlayerDetailsStore();

  const players = [playerOne, playerTwo, playerThree, playerFour];
  console.log(players)
  const setPlayers = [
    setPlayerOne,
    setPlayerTwo,
    setPlayerThree,
    setPlayerFour,
  ];

  function playerFinder() {
    {console.log(players)}
    for (var i = 0; i < 4; i++) {
      if (players[i][5] == clientName) {
         setPlayers[i]([5,5,5,60,[],clientPlayer]);
      }
    }
  }


  function setClient() {
    console.log("set client called");
    {console.log(players)}
    for (var i = 0; i < 4; i++) {
      console.log(players[i]);
      console.log(clientName);
      if (players[i][5] == clientName) {
        console.log("matching found " + players[i][5]);
        setClientPlayer(players[i]);
      }
    }
  }

  setClient();
  const [
    currentTurn,
    setCurrentTurn,
    isTurn,
    setIsTurn,
    turnCounter,
    setTurnCounter,
  ] = TurnTrackerStore();
  const [cardStack, setCardStack] = CardStackStore();
  const [Socket, setSocket] = SocketStore();
  useEffect(() => {
    Socket.once("receive_message", (data) => {
      setTurnCounter(turnCounter + 1);
      setCurrentTurn(playerList[turnCounter % playerList.length][0]);
      console.log("recvied message called");
      console.log("id is " + props.id);
      setCardStack(cardStack.slice(1));
      document.getElementById(parseInt(data.cellId)).src = data.image;
    });
  }, [Socket, cardStack]);

  // useEffect(() => {
  //   showEventCard({ type: true });
  // }, [])
  const [playerList, setPlayerList] = PlayerListStore();
  console.log("player list is " + playerList);
  console.log("current turn is " + currentTurn);
  const [activeCellIds, setActiveCellIds] = useState([]);
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

  let setter=null;
  {console.log(players)}
  return (
    <div
      style={{
        background: "URL(/table.jpg)",
        backgroundSize: "cover",
        position: "fixed",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        id="turn"
        style={{
          position: "absolute",
          left: "30%",
          top: "5%",
          fontFamily: "Helvetica, sans-serif",
          fontSize: "46px",
        }}
      >
        It is currently {currentTurn}'s turn
      </div>
      {console.log(playerOne[6])}
      <table
        id="board"
        style={{
          borderCollapse: "collapse",
          borderSpacing: "0px",
          margin: "0px",
          border: "solid",
          outline: "0px",
          position: "absolute",
          left: "6%",
          bottom: "10%",
        }}
      >
        <tbody>
          {props.cells.map((i) => (
            <tr
              key={i}
              style={{ padding: "0px", outline: "0px", margin: "0px" }}
            >
              {console.log(clientPlayer)}
              {playerFinder()}
              {props.cells.map((j) => {
                const id = i * 11 + j;
                return (
                  <BoardCell
                    key={id}
                    id={id}
                    surround={[
                      clientPlayer[3] % 11 != 0 ? clientPlayer[3] - 1 : null,
                      (clientPlayer[3] + 1) % 11 != 0
                        ? clientPlayer[3] + 1
                        : null,
                      clientPlayer[3] + 11,
                      clientPlayer[3] - 11,
                    ]}
                    canBePlaced={[
                      ActiveCell.indexOf(clientPlayer[3] - 1) == -1,
                      ActiveCell.indexOf(clientPlayer[3] + 1) == -1,
                      ActiveCell.indexOf(clientPlayer[3] + 11) == -1,
                      ActiveCell.indexOf(clientPlayer[3] - 11) == -1,
                    ]}
                    setActiveCell={setActiveCell}
                    setActiveCellImage={setActiveCellImage}
                    setActiveCellName={setActiveCellNameFunc}
                    player={clientPlayer}
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
          position: "relative",
          left: "0%",
          top: "15%",
          width: "100px",
          height: "100px",
          display: "inline",
        }}
      >
        {console.log(playerList)}
        {console.log(players)}
        <ul style={{ listStyle: "none", display: "inline", margin: "0px" }}>
          {playerList.map((player, i = -1) => {
            i++;
            {
              "hello looping players here then list" + console.log(players[i]);
              console.log(playerList)
            }
            {
              console.log("HEEEEERE")
              console.log(players)
            }
            return (
              <li key={player} style={{ float: "right" }}>
                <PlayerCard
                key={player}
                  name={player[0]}
                  image={player[1]}
                  player={players[i]}
                />{" "}
              </li>
            );
          })}
        </ul>
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
