import { useEffect } from "react";

const throwdice = () => Math.floor(Math.random() * 3);

let rollType = "none";

export function CourtHouse(props, playerOne, showEventCard) {
  rollType = highestTrait(playerOne);
  document.getElementById("courtButton").innerHTML = "Rolling " + rollType;
  diceRoll(props, playerOne, showEventCard);
}

export function normalDiscard(props, playerOne, showEventCard) {
  console.log(playerOne.items);
  if (props.penalty == "weapon") {
    removeWeapons(playerOne);
  }
  showEventCard("none");
}

export function normalAdd(props, playerOne, showEventCard) {
  playerOne[props.type] = playerOne[props.type] + props.value;
  showEventCard("none");
}

export function normalRoll(props, playerOne, showEventCard) {
  rollType = props.type;
  console.log(playerOne);
  return diceRoll(props, playerOne, showEventCard);
  
}

function resetDice() {
  for (let i = 0; i < 5; i++) {
    let diceRollsString = "dice-" + i;
    document.getElementById(diceRollsString).innerHTML = "";
  }
}

function removeWeapons(playerOne) {
  const tempArray = [];
  playerOne.items.map((item) => {
    if (item.type !== "Weapon") {
      tempArray.push(item);
    }
  });
  playerOne.items = tempArray;
}

function highestTrait(playerOne) {
  console.log(playerOne.intelligence);
  if (playerOne.intelligence >= playerOne.speed) {
    if (playerOne.intelligence >= playerOne.strength) {
      return "Intelligence";
    } else {
      if (playerOne.speed >= playerOne.strength) {
        return "Speed";
      } else {
        return "Strength";
      }
    }
  } else {
    if (playerOne.speed >= playerOne.strength) {
      return "Speed";
    } else {
      return "Strength";
    }
  }
}

function diceRoll(props, playerOne, showEventCard) {
  let totalRoll = 0;
  resetDice();
  for (let i = 0; i < playerOne[rollType]; i++) {
    let diceRollsString = "dice-" + i;
    let roll = throwdice();
    setTimeout(
      () => (document.getElementById(diceRollsString).innerHTML = roll),
      i * 1000
    );
    totalRoll += roll;
  }
  setTimeout(() => showEventCard({ type: false }), 8000);
  if (totalRoll < 10) {
    setTimeout(
      () => (playerOne[rollType] = playerOne[rollType] + props.penalty, console.log(playerOne)),
      6000
    );
  }
  return props.penalty
}
