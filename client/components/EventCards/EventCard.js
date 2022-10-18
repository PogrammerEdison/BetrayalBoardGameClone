import classes from "./EventCard.module.css";
import { PlayerDetailsStore } from "../../context/PlayerStore";
import { useEventCardStore } from "../../context/EventCardStore.js";
import PlayerCard from "../Player Components/PlayerCard";
import * as cardActionsCards from "../../playerActions/cardActionsCards.js";
import { PlayerListStore } from "../../context/PlayerListStore";
import { useEffect } from "react";

export default function EventCard(props) {
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
  let count = 0;
  const [eventCard, showEventCard] = useEventCardStore();
  const [playerList, setPlayerList] = PlayerListStore();

  const players = [playerOne, playerTwo, playerThree, playerFour];
  let penaltyTrig = false;
  let penalty = 0;
  useEffect(() => {
    console.log(props.player)
    props.player[props.type] += penalty;
    count = count + 1;
  }, [penalty]);

  function normalHandler() {
    penalty = cardActionsCards.normalRoll(props, props.player, showEventCard);
  }

  function test2(type) {
    switch (type) {
      case "Court":
        return (
          <div>
            {console.log("we in the court")}
            {/*(rollType = highestTrait())*/}
            {/*console.log(rollType)*/}
            <button
              id="courtButton"
              className={classes.actionButton}
              onClick={function () {
                cardActionsCards.CourtHouse(props, playerOne, showEventCard);
              }}
            >
              Roll
            </button>
          </div>
        );
        break;
      case "NormalRoll":
        return (
          <div>
            {console.log("we in the roll")}
            <button className={classes.actionButton} onClick={normalHandler}>
              Roll {props.type}
            </button>
          </div>
        );
        break;
      case "NormalAdd":
        return (
          <div>
            {console.log("we in the add")}
            <button
              className={classes.actionButton}
              onClick={function () {
                cardActionsCards.normalAdd(props, playerOne, showEventCard);
              }}
            >
              Add {props.value} {props.type}
            </button>
          </div>
        );
      case "discard":
        return (
          <div>
            {console.log("we in the discard")}
            <button
              className={classes.actionButton}
              onClick={function () {
                cardActionsCards.normalDiscard(props, playerOne, showEventCard);
              }}
            >
              Discard {props.penalty}
            </button>
          </div>
        );
        break;
      default:
        break;
    }
  }

  return (
    <div className={classes.fp_container}>
      {playerList.map((player, i = -1) => {
        i++;
        if (player[0] == clientName) {
          //need a way to get the current player
          {
            console.log("attention");
          }
          console.log(players[i]);
          return (
            <div
              key={player}
              style={{ position: "relative", width: "160px", height: "270px" }}
            >
              <PlayerCard
                key={i}
                name={player[0]}
                image={player[1]}
                player={players[i]}
                counter={count}
              />{" "}
            </div>
          );
        }
      })}
      <div
        id="dice-0"
        className="dice"
        style={{
          color: "black",
          position: "fixed",
          left: "580px",
          top: "140px",
        }}
      >
        1
      </div>
      <div
        id="dice-1"
        style={{
          color: "black",
          position: "fixed",
          left: "680px",
          top: "140px",
        }}
      >
        1
      </div>
      <div
        id="dice-2"
        style={{
          color: "black",
          position: "fixed",
          left: "780px",
          top: "140px",
        }}
      >
        1
      </div>
      <div
        id="dice-3"
        style={{
          color: "black",
          position: "fixed",
          left: "880px",
          top: "140px",
        }}
      >
        1
      </div>
      <div
        id="dice-4"
        style={{
          color: "black",
          position: "fixed",
          left: "980px",
          top: "140px",
        }}
      >
        1
      </div>
      <div className={classes.cardInfo}>
        <img src={props.image} className={classes.image} alt="Event Card" />
        {test2(props.button)}
        {/*}{test(props.button) == "Court" ? (
          <div>
            <button id="courtButton" className={classes.actionButton} onClick={function (){cardActionsCards.CourtHouse(props, playerOne, showEventCard)}}>
              Roll
            </button>
          </div>
        ) : (
          <div>
            <button className={classes.actionButton} onClick={function () {cardActionsCards.normalRoll(props, playerOne, showEventCard)}}>
              Roll {props.type}
            </button>
        </div>
        )}{*/}
      </div>
    </div>
  );
}
