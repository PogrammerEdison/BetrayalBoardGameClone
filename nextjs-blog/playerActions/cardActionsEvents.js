
const throwdice = () => Math.floor(Math.random() * 3);

function resetDice() {
  for (let i = 0; i < 5; i++) {
    console.log(diceRollsString);
    let diceRollsString = "dice-" + i;
    document.getElementById(diceRollsString).innerHTML = "";
  }
}

export function theConstable(
  player,
  showEventCard,
  setTriggerItemFlip,
  setButtonName,
  itemStack,
  setItemStack
) {
  diceRoll(
    player,
    showEventCard,
    setTriggerItemFlip,
    setButtonName,
    itemStack,
    setItemStack,
    "Intelligence"
  );
}

function diceRoll(
  player,
  showEventCard,
  setTriggerItemFlip,
  setButtonName,
  itemStack,
  setItemStack,
  rollType
) {
  let totalRoll = 0;
  resetDice();
  console.log(rollType);
  console.log(player[rollType]);
  for (let i = 0; i < player[rollType]; i++) {
    let diceRollsString = "dice-" + i;
    let roll = throwdice();
    setTimeout(
      () => (document.getElementById(diceRollsString).innerHTML = roll),
      i * 1000
    );
    totalRoll += roll;
    drawItemCard(
      setButtonName,
      setTriggerItemFlip,
      itemStack,
      setItemStack,
      showEventCard,
      player
    );
  }
}

function drawItemCard(
  setButtonName,
  setTriggerItemFlip,
  itemStack,
  setItemStack,
  showEventCard,
  player
) {
  setTimeout(
    () => (
      setButtonName("Draw Item"),
      (document.getElementById("button").onclick = function () {
        flipItemCard(
          setTriggerItemFlip,
          itemStack,
          setItemStack,
          showEventCard,
          setButtonName,
          player
        );
      })
    ),
    5000
  );
}

export function flipItemCard(
  setTriggerItemFlip,
  itemStack,
  setItemStack,
  showEventCard,
  setButtonName,
  player
) {
  console.log("we in");
  //setTimeout(() => setItemStack(itemStack.slice(1)), 2000);
  console.log("hehehehe");
  console.log(itemStack);
  setTimeout(() => setTriggerItemFlip("test"));
  setTimeout(() => setButtonName("End Turn"));
  setTimeout(
    () =>
      (document.getElementById("button").onclick = function () {
        resetState(setButtonName, setTriggerItemFlip, showEventCard);
        setItemStack(itemStack.slice(1));
      })
  );
  console.log("hhhhh");
  player.items.push(itemStack.slice(0).reverse().pop());
  console.log(player.items);
}

function resetState(setButtonName, setTriggerItemFlip, showEventCard){
  setTimeout(() => setTriggerItemFlip("off"));
  setTimeout(() => setButtonName("Draw Event"));
  showEventCard(false);
}