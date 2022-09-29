import { PlayerListStore } from "../context/PlayerListStore";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRef } from "react";
import io from "socket.io-client";
import classes from "./chatBox.module.css";
import Webcam from "react-webcam";
import { useState } from "react";
import { PlayerDetailsStore } from "../context/PlayerStore";

const socket = io.connect("https://pure-atoll-20271.herokuapp.com/");
// const socket = io.connect("http://localhost:3001", {
//   reconnection: true,
//   reconnectionAttempts: Infinity,
// });
////////

function RoomPage() {
  const [playerOne, playerOneImage, setPlayerOneImage] = PlayerDetailsStore();
  const [testImage, setTestImage] = useState(""); //useState("https://i.imgur.com/pdPR9ds.png");

  const testList = useRef([]);
  const router = useRouter();
  const [playerList, setPlayerList] = PlayerListStore();
  const [playerImage, setPlayerImage] = useState(null);
  let roomCode = router.query.roomID;
  playerList;
  //on client load, get list of players
  function initialEmit() {
    if (String(router.query.host) == "true") {
      testList.current = [[String(router.query.name), playerOneImage]]; //create reference with host name in array
    }
    if (String(router.query.host) == "false") {
      //client asks host to server for list of players
      socket.emit("initialRoomReq", {
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

  //host gets request for list of players and sends to server
  useEffect(() => {
    if (router.query.host == "true") {
      socket.on("initalRoomReqHost", (data) => {
        setPlayerListFunc(data.name, data.image); //add name to list
      });
    }
  }, [socket]);

  //server sends list of players back to client
  useEffect(() => {
    if (router.query.host == "false") {
      socket.on("initialRoomRes", (data) => {
        console.log("respones from host recieved: " + data.lobbyList);
        setPlayerListFuncAll(data.lobbyList); //set playerList to the updated list
      });
    }
  }, [socket]);

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
      setPlayerList(tempArray);
    }
  }

  socket.emit("startRoom", {
    roomID: String(router.query.roomID),
  });

  //host sends player list to clients
  function updatePlayerList() {
    testList.current = playerList.slice(0); //save the shallow playerList to testList reference, (needs to be sliced for shallow copy otherwise it will be a reference to the playerList)
    socket.emit("initialRoomResHost", {
      lobbyList: playerList,
      roomID: router.query.roomID,
    });
  }

  ////////////////
  useEffect(() => {
    socket.on("roomStart", (data) => {
      roomCode = data.roomID;
    });
  }, [socket, roomCode]);

  function startGame() {
    if (router.query.host == "true") {
      socket.emit("gameStart", {
        roomID: roomCode,
      });
      router.push({ pathname: "/gamePage", query: { roomID: roomCode } });
    }
  }
  useEffect(() => {
    socket.on("startGameClient", (data) => {
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
    socket.on("chat-message", (data) => {
      console.log("hello, chat-message recieved");
      console.log(data);
      let connectMessage = data.name + ": " + data.message;
      appendMessage(connectMessage, data.image);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("userConnected", (data) => {
      console.log(data);
      appendMessage(data.name + " joined.", data.image);
    });
  }, [socket]);

  useEffect(() => {
    console.log("chat initalized");
    const messageForm = document.getElementById("send-container");
    const messageInput = document.getElementById("message-input");
    messageContainer = document.getElementById("message-container");

    messageForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = messageInput.value;
      socket.emit("sendChatMessage", {
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
    <div>
      <div style={{ position: "absolute", left: "49%", top: "5%" }}>
        Lobby, socket id: {socket.id}
      </div>
      <div style={{ position: "absolute", left: "49%", top: "10%" }}>
        Lobby code: {roomCode}
      </div>
      <div style={{ position: "absolute", left: "19%", top: "20%" }}>
        Players in Lobby:
        <ul>
          <div style={{ width: "300px", height: "300px", border: "solid", borderRadius: "10%" }}>
            {playerList.map((player) => {
              return (
                <div
                  key={player}
                  style={{ width: "300px", height: "60px", padding: "8px" }}
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
        <input type="text" id="message-input" style={{ width: "80%" }}></input>
        <button
          type="submit"
          id="send-button"
          style={{ position: "relative", left: "0%", top: "0%" }}
        >
          Send
        </button>
      </form>
      <button
        onClick={startGame}
        style={{ position: "absolute", left: "49%", top: "50%" }}
      >
        Start
      </button>
    </div>
  );
}

export default RoomPage;
