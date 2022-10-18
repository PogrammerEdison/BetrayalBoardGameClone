import { PlayerListStore } from "../context/PlayerListStore";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRef } from "react";
import io from "socket.io-client";
import classes from "./chatBox.module.css";
import Webcam from "react-webcam";
import { useState } from "react";
import { PlayerDetailsStore } from "../context/PlayerStore";
import { SocketStore } from "../context/SocketStore";
import { TurnTrackerStore } from "../context/TurnTrackerStore";

// const socket = io.connect("https://pure-atoll-20271.herokuapp.com/");
// const socket = io.connect("http://localhost:3001", {
//   reconnection: true,
//   reconnectionAttempts: Infinity,
// });
////////

function RoomPage() {
  const [Socket, setSocket] = SocketStore();
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
  const playerStats = [playerOne, playerTwo, playerThree, playerFour];
  const players = [setPlayerOne, setPlayerTwo, setPlayerThree, setPlayerFour];
  let playerCount = 0;
  const [currentTurn, setCurrentTurn, isTurn, setIsTurn] = TurnTrackerStore();
  const testList = useRef([]);
  const router = useRouter();
  const [playerList, setPlayerList] = PlayerListStore();
  const [playerImage, setPlayerImage] = useState(null);
  let roomCode = router.query.roomID;

  //on client load, get list of players
  function initialEmit() {
    if (String(router.query.host) == "true") {
      setPlayerOne([5, 5, 5, 60, [], clientName]);
      testList.current = [[String(router.query.name), playerOneImage]]; //create reference with host name in array
    }
    if (String(router.query.host) == "false") {
      setCurrentTurn(playerOne[5]);
      //client asks host to server for list of players
      Socket.emit("initialRoomReq", {
        name: router.query.name,
        roomID: router.query.roomID,
        image: playerOneImage,
      });
    }
  }

  //makes initial emit only run once
  useEffect(() => {
    let ignore = false;
    if (!ignore) initialEmit();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    setCurrentTurn(playerOne[5]);
  }, [playerOne]);

  //host gets request for list of players and sends to server
  useEffect(() => {
    if (router.query.host == "true") {
      Socket.on("initalRoomReqHost", (data) => {
        ++playerCount;
        players[playerCount]([5, 5, 5, 60, [], data.name]);
        setPlayerListFunc(data.name, data.image); //add name to list
      });
    }
  }, [Socket]);

  //server sends list of players back to client
  useEffect(() => {
    if (router.query.host == "false") {
      Socket.on("initialRoomRes", (data) => {
        console.log("respones from host recieved: " + data.lobbyList);
        setPlayerListFuncAll(data.lobbyList); //set playerList to the updated list
        for (var i = 0; i < 4; i++) {
          console.log("done")
          players[i]([5, 5, 5, 60, [], data.players[i][5]]);
        }
        console.log(playerStats)
      });
    }
  }, [Socket]);

  useEffect(() => {
    console.log(playerStats)
  }, [playerStats]);

  //when the host player list changed, update other clients with new list
  useEffect(() => {
    if (router.query.host == "true") {
      updatePlayerList();
    }
  }, [playerList]);

  //set new player List
  function setPlayerListFunc(newPlayerName, newPlayerImage) {
    const tempArray = testList.current;
    tempArray.push([newPlayerName, newPlayerImage]);
    setPlayerList(tempArray); //this triggers the useEffect above
  }

  //set new player List for the client
  function setPlayerListFuncAll(list) {
    if (router.query.host == "false") {
      let tempArray = playerList.slice(0);
      tempArray = list.slice(0);
      setCurrentTurn(tempArray[0][0]);
      setPlayerList(tempArray);
    }
  }

  Socket.emit("startRoom", {
    roomID: String(router.query.roomID),
  });

  //host sends player list to clients
  function updatePlayerList() {
    testList.current = playerList.slice(0); //save the shallow playerList to testList reference, (needs to be sliced for shallow copy otherwise it will be a reference to the playerList)
    Socket.emit("initialRoomResHost", {
      lobbyList: playerList,
      roomID: router.query.roomID,
      players: playerStats,
    });
  }

  ////////////////
  useEffect(() => {
    Socket.on("roomStart", (data) => {
      roomCode = data.roomID;
    });
  }, [Socket, roomCode]);

  function setClient() {
    console.log("set client called");
    for (var i = 0; i < 4; i++) {
      console.log(players[i]);
      console.log(clientName);
      if (players[i][5] == clientName) {
        console.log("matching found " + players[i][5]);
        setClientPlayer(players[i]);
      }
    }
  }

  function startGame() {
    if (router.query.host == "true") {
      setClient();
      Socket.emit("gameStart", {
        roomID: roomCode,
      });
      router.push({ pathname: "/gamePage", query: { roomID: roomCode } });
    }
  }
  useEffect(() => {
    setClient();
    Socket.on("startGameClient", (data) => {
      router.push({ pathname: "/gamePage", query: { roomID: roomCode } });
    });
  });

  let messageContainer = null;

  function appendMessage(message, image) {
    const parentElement = document.createElement("div");
    const messageElement = document.createElement("div");
    const messageImage = document.createElement("img");
    parentElement.style.margin = "5px";
    messageImage.src = image;
    messageImage.style.width = "50px";
    messageImage.style.height = "50px";
    messageImage.style.borderRadius = "50%";
    messageImage.style.border = "solid";
    messageImage.style.verticalAlign = "middle";
    messageElement.innerText = message;
    messageElement.style.display = "inline-flex";
    messageElement.style.marginLeft = "10px";
    messageElement.style.verticalAlign = "middle";
    parentElement.appendChild(messageImage);
    parentElement.appendChild(messageElement);
    //messageElement.appendChild(messageImage);
    console.log(messageContainer);
    messageContainer.append(parentElement);
  }

  useEffect(() => {
    Socket.on("chat-message", (data) => {
      console.log("hello, chat-message recieved");
      console.log(data);
      let connectMessage = data.name + ": " + data.message;
      appendMessage(connectMessage, data.image);
    });
  }, [Socket]);

  useEffect(() => {
    Socket.on("userConnected", (data) => {
      console.log(data);
      appendMessage(data.name + " joined.", data.image);
    });
  }, [Socket]);

  useEffect(() => {
    console.log("chat initalized");
    const messageForm = document.getElementById("send-container");
    const messageInput = document.getElementById("message-input");
    messageContainer = document.getElementById("message-container");

    messageForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = messageInput.value;
      Socket.emit("sendChatMessage", {
        message: message,
        roomID: roomCode,
        name: router.query.name,
        image: playerOneImage,
      });
      appendMessage("You: " + message, playerOneImage);
      messageInput.value = "";
    });
  }, []);

  const videoConstraints = {
    width: 200,
    height: 200,
  };

  return (
    <div
      style={{
        background: "URL(/lobbyBackground.png)",
        backgroundSize: "100%",
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "39%",
          top: "10%",
          fontFamily: "Helvetica, sans-serif",
          fontSize: "46px",
        }}
      >
        Lobby code: {roomCode}
      </div>
      <div style={{ position: "absolute", left: "9%", top: "20%" }}>
        <div style={{ padding: "10px" }}>Players in Lobby:</div>
        <ul>
          <div
            style={{
              width: "300px",
              height: "300px",
              border: "solid",
              borderRadius: "10%",
              backgroundImage: "linear-gradient(red, yellow)",
            }}
          >
            {playerList.map((player) => {
              return (
                <div
                  key={player}
                  style={{ width: "300px", height: "60px", padding: "5px" }}
                >
                  <li
                    style={{
                      position: "relative",
                      left: "0%",
                      top: "0%",
                      padding: "0px",
                      listStyle: "none",
                    }}
                    key={player + "test"}
                  >
                    <img
                      key={player}
                      src={player[1]}
                      style={{
                        borderRadius: "300px",
                        border: "solid",
                        position: "relative",
                        width: "50px",
                        height: "50px",
                        left: "2%",
                        top: "0%",
                        verticalAlign: "middle",
                      }}
                    ></img>
                    <div
                      style={{
                        position: "relative",
                        left: "10%",
                        top: "20%",
                        display: "inline-flex",
                        verticalAlign: "middle",
                        padding: "0px",
                      }}
                    >
                      {player[0]}
                    </div>
                  </li>
                </div>
              );
            })}
          </div>
        </ul>
      </div>
      <div
        style={{
          position: "absolute",
          left: "70%",
          top: "20%",
          border: "solid",
          height: "100px",
          overflow: "auto",
          width: "300px",
          height: "400px",
          borderRadius: "25px",
          padding: "10px",
          backgroundImage: "linear-gradient(red, yellow)",
        }}
      >
        <div style={{ overflow: "visible" }}>
          <div id="message-container" style={{ overflow: "visible" }}></div>
        </div>
      </div>
      <form
        id="send-container"
        style={{
          position: "absolute",
          left: "71%",
          top: "83%",
          width: "300px",
        }}
      >
        <input
          type="text"
          id="message-input"
          style={{ width: "80%", padding: "5px", borderRadius: "10px" }}
        ></input>
        <div style={{ padding: "5px", display: "inline-block" }}>
          <button
            type="submit"
            id="send-button"
            style={{
              position: "relative",
              left: "0%",
              top: "0%",
              backgroundImage: "linear-gradient(blue, turquoise)",
              borderRadius: "10px",
              display: "inline-block",
              padding: "5px",
            }}
          >
            Send
          </button>
        </div>
      </form>
      <button
        onClick={startGame}
        style={{
          position: "absolute",
          left: "47%",
          top: "50%",
          backgroundImage: "linear-gradient(blue, turquoise)",
          width: "100px",
          height: "50px",
          borderRadius: "25px",
        }}
      >
        Start
      </button>
    </div>
  );
}

export default RoomPage;
