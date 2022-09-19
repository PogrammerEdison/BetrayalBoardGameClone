import classes from "./EventCard.module.css";
import { useEventCardStore } from "../../context/EventCardStore.js";
import { PlayerDetailsStore } from "../../context/PlayerStore";
import PlayerCard from "../Player Components/PlayerCard";
import { EventStore } from "../../context/EventStore";
import EventStack from "../CardDeck/EventStack";
import { CardTrigger } from "../../context/CardTrigger.js";
import { ItemStore } from "../../context/ItemStore.js";
import ItemStack from "../CardDeck/ItemStack";
import * as cardActionsEvents from "../../playerActions/cardActionsEvents.js";
import { TestStore } from "../../context/TestStore.js";

export default function EventCard(props) {
  const [playerOne] = PlayerDetailsStore();
  const [eventStack, setEventStack] = EventStore();
  const [trigger, setTrigger] = CardTrigger();
  const [triggerItemFlip, setTriggerItemFlip] = CardTrigger();
  const [buttonName, setButtonName] = TestStore();
  const [eventCard, showEventCard] = useEventCardStore();
  const [itemStack, setItemStack] = ItemStore();
  //setButtonName("Draw Event Card");
  
  function flipCard() {
    setTrigger("activate");
    setButtonName("Roll Dice");
    document.getElementById("button").onclick = function () {
      cardActionsEvents.theConstable(
        playerOne,
        showEventCard,
        setTriggerItemFlip,
        setButtonName,
        itemStack,
        setItemStack
      );
    };
  }

  return (
    <div className={classes.fp_container}>
      <div
        style={{
          position: "absolute",
          left: "80%",
          bottom: "70%",
          width: "200px",
          height: "200px",
        }}
      >
        <PlayerCard />
      </div>
      <div
        id="dice-0"
        className="dice"
        style={{
          color: "black",
          position: "absolute",
          left: "38%",
          top: "15%",
        }}
      >
        1
      </div>
      <div
        id="dice-1"
        style={{
          color: "black",
          position: "absolute",
          left: "44%",
          top: "15%",
        }}
      >
        1
      </div>
      <div
        id="dice-2"
        style={{
          color: "black",
          position: "absolute",
          left: "50%",
          top: "15%",
        }}
      >
        1
      </div>
      <div
        id="dice-3"
        style={{
          color: "black",
          position: "absolute",
          left: "56%",
          top: "15%",
        }}
      >
        1
      </div>
      <div
        id="dice-4"
        style={{
          color: "black",
          position: "absolute",
          left: "62%",
          top: "15%",
        }}
      >
        1
      </div>
      <div style={{ position: "absolute", left: "-5%", top: "140px" }}>
        <EventStack cards={eventStack} type="eventCard" />
      </div>
      <div className={classes.itemStack}>
        <ItemStack cards={itemStack} type="itemCard" />
      </div>
      <div className={classes.cardInfo}>
        <img src={props.image} className={classes.image} alt="Event Card" />
        <br></br>
        <button id="button" className={classes.actionButton} onClick={flipCard}>
          <b>{buttonName}</b>
        </button>
      </div>
    </div>
  );
}
