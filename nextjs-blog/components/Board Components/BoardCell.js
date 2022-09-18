import classes from "./BoardCell.module.css";
import { PlayerDetailsStore } from "../../context/PlayerStore.js";
import { CardStackStore } from "../../context/CardStore.js";
import { useEventCardStore } from "../../context/EventCardStore.js";
import { SocketStore } from "../../context/SocketStore.js";

///////////
import { useEffect } from "react";
import io from "socket.io-client";

//const socket = io.connect("https://mighty-brushlands-84806.herokuapp.com/");
// const socket = io.connect("http://localhost:3001", {
//   reconnection: true,
//   reconnectionDelay: 1000,
//   reconnectionDelayMax: 5000,
//   reconnectionAttempts: Infinity,
//   forceNewConnection: false
// });

////////////

function BoardCell(props) {
  const [Socket, setSocket] = SocketStore();
  const [playerOne, playerTwo] = PlayerDetailsStore();
  const [cardStack, setCardStack] = CardStackStore();
  const [eventCard, showEventCard] = useEventCardStore();

  useEffect(() => {
    Socket.on("receive_message", (data) => {
      setCardStack(cardStack.slice(1));
      document.getElementById(parseInt(data.cellId)).src = data.image;
      console.log(cardStack);
      console.log(data.message);
      console.log(data.cellId);
      console.log(document.getElementById(data.cellId));
    });
  }, [Socket, cardStack]);

  ////////////////
  function boardChange() {
    console.log("emmiting");
    Socket.emit("send_message", {
      message: "HelloYOYOYOYO",
      cellId: String(props.id),
      image: cardStack[0].image,
    });
  }
  ///////////////////////
  function testFunction() {
    alert("Clicked Square");
    event.target.style.backgroundColor = "powderblue";
  }

  function testFunction2(props) {
    console.log("the card stack is " + cardStack[0].name);
    playerOne.Space = props.id;
    props.setActiveCell(props.id);
    props.setActiveCellImage(cardStack[0].image);
    props.setActiveCellName(cardStack[0].name);

    let id = props.id;
    console.log(id);
    document.getElementById(id).src = cardStack[0].image;
    console.log(cardStack);
    let playedCard = cardStack.slice(0, 1);
    console.log(playedCard);
    switch (playedCard[0].type) {
      case "cardEvent3":
        showEventCard({
          type: "cardEvent",
          payload: {
            image: playedCard[0].image,
            type: cardStack[0].rollType,
            penalty: cardStack[0].penalty,
            button: cardStack[0].button,
            value: cardStack[0].value,
          },
        });
        break;
      case "drawEvent3":
        showEventCard({
          type: "drawEvent",
          payload: {
            image: playedCard[0].image,
          },
        });
        break;
      case "busStation":
        console.log("poggers");
        showEventCard({
          type: "busStation",
          payload: {
            image: playedCard[0].image,
          },
        });
        break;
      case "statRoll":
        //document.getElementById("playerOne").innerHTML = "statRoll";
        break;
      default:
        //document.getElementById("playerOne").innerHTML = "Normal";
        break;
    }
    setCardStack(cardStack.slice(1));
    boardChange();
  }

  if (props.surround.includes(props.id)) {
    const index = props.surround.indexOf(props.id);
    const canBePlaced = props.canBePlaced[index];
    const style = canBePlaced ? "1px solid red" : null;
    return (
      <td
        style={{
          outline: style,
          padding: "0px",
          margin: "0px",
          objectFit: "cover",
        }}
      >
        <div
          className="square"
          style={{
            position: " relative",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onClick={() => {
            testFunction2(props);
          }}
        >
          <img
            src="https://i.imgur.com/wrrKYfO.png"
            id={props.id}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          ></img>
          <div
            id={props.id + "player"}
            style={{
              position: "absolute",
              width: "10%",
              height: "10%",
              left: "50%",
              top: "50%",
            }}
          ></div>
        </div>
      </td>
    );
  }

  if (props.id == 60) {
    return (
      <td className={classes.td} style={{ padding: "0px", margin: "0px" }}>
        <div
          className="square"
          onClick={() => {
            testFunction();
          }}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <img
            src="https://i.imgur.com/wrrKYfO.png"
            id={props.id}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </td>
    );
  }

  return (
    <td
      style={{
        //border: "1px solid black",
        width: "50px",
        height: "50px",
        lineHeight: "0px",
        textAlign: "center",
        padding: "0px",
        margin: "0px",
      }}
    >
      <div className="square">
        <img
          src="https://i.imgur.com/wrrKYfO.png"
          id={props.id}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div
        id={props.id + "player"}
        style={{
          position: "absolute",
          width: "10%",
          height: "10%",
          left: "50%",
          top: "50%",
        }}
      ></div>
    </td>
  );
}

export default BoardCell;
