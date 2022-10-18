import { useRouter } from "next/router";
import { PlayerListStore } from "../context/PlayerListStore.js";
import { SocketStore } from "../context/SocketStore.js";
import io from "socket.io-client";
import Webcam from "react-webcam";
import { useState } from "react";
import { useRef } from "react";
import { CameraReducerStore } from "../context/CameraReducer.js";
import { PlayerDetailsStore } from "../context/PlayerStore";

<link rel="stylesheet" href="globals.css"></link>;

// const socket = io.connect("https://pure-atoll-20271.herokuapp.com/");

// const socket = io.connect("http://localhost:3001", {
//   reconnection: true,
//   reconnectionAttempts: Infinity,
// });

////////////

////////////////

function HomePage(props) {
  const [Socket, setSocket] = SocketStore();
  const [cameraScreen, setCameraScreen] = CameraReducerStore();
  const [trigger, setTrigger] = useState(false);
  const [testImage, setTestImage] = useState("https://i.imgur.com/pdPR9ds.png");
  const webRef = useRef(null);
  let profileImg = null;

  const showImage = () => {
    profileImg = webRef.current.getScreenshot();
    setTestImage(profileImg);
  };
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

  console.log(playerOne);
  const [playerList, setPlayerList] = PlayerListStore();
  const router = useRouter();

  function startRoom() {
    Socket.emit("startRoom", {
      hostName: document.getElementById("name").value,
      roomID: String(Math.floor(Math.random() * 1000)),
    });
  }

  function connectRoom() {
    //setPlayerOne([5,5,5,60,[],document.getElementById("name").value]);
    setClientName(document.getElementById("name").value);
    router.push({
      pathname: "/lobby",
      query: {
        roomID: document.getElementById("roomID").value,
        host: false,
        name: document.getElementById("name").value,
      },
    });
  }

  function cameraTrigger() {
    setTrigger(!trigger);
  }

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
          left: "29%",
          top: "10%",
          fontFamily: "Helvetica, sans-serif",
          fontSize: "46px",
        }}
      >
        Betrayal at the House on the Hill
      </div>
      <div
        style={{
          position: "absolute",
          left: "42%",
          top: "17%",
          fontFamily: "Helvetica, sans-serif",
          fontSize: "46px",
        }}
      >
        Board setter
      </div>
      <div
        style={{
          position: "absolute",
          left: "40%",
          top: "30%",
          display: "inline-block",
        }}
      >
        <div style={{ padding: "10px", display: "inline-block" }}>
          Enter Name:
        </div>
        <input id="name" style={{ padding: "10px", borderRadius: "10px" }} />
      </div>
      <div
        style={{
          position: "absolute",
          left: "40%",
          top: "40%",
          display: "inline-block",
        }}
      >
        <input id="roomID" style={{ padding: "10px", borderRadius: "10px" }} />
        <div style={{ padding: "10px", display: "inline-block" }}>
          <button
            style={{
              width: "100px",
              height: "50px",
              display: "inline-block",
              borderRadius: "12px",
              color: "black",
              backgroundImage: "linear-gradient(blue, turquoise)",
            }}
            onClick={connectRoom}
          >
            {" "}
            Join Room{" "}
          </button>
        </div>
      </div>
      <div style={{ position: "absolute", left: "44%", top: "50%" }}>
        <button
          style={{
            position: "relative",
            width: "200px",
            height: "50px",
            borderRadius: "12px",
            backgroundImage: "linear-gradient(blue, turquoise)",
            color: "black",
          }}
          onClick={() => {
            setClientName(document.getElementById("name").value);
            console.log(playerOne);
            console.log(playerOne.Name);
            setPlayerList([
              [document.getElementById("name").value, playerOneImage],
            ]),
              setClientName(document.getElementById("name").value);
            router.push({
              pathname: "/lobby",
              query: {
                host: true,
                roomID: String(Math.floor(Math.random() * 1000)),
                startRoom,
                name: document.getElementById("name").value,
              },
            });
          }}
        >
          Create a Room
        </button>
        <button
          style={{
            position: "fixed",
            left: "12%",
            width: "120px",
            height: "50px",
            borderRadius: "12px",
            backgroundImage: "linear-gradient(blue, turquoise)",
            color: "black",
          }}
          onClick={() => {
            setCameraScreen({ type: "showScreen" });
          }}
        >
          Take Image
        </button>
      </div>
      <div>
        {trigger == true ? (
          <>
            <Webcam
              ref={webRef}
              videoConstraints={videoConstraints}
              mirrored={true}
            ></Webcam>
            <button
              onClick={() => {
                showImage();
              }}
            >
              {" "}
              show{" "}
            </button>
          </>
        ) : null}
      </div>
      <img
        src={playerOneImage}
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "300px",
          border: "2px solid black",
          left: "9%",
          top: "20%",
          position: "relative",
        }}
      ></img>
      {cameraScreen}
    </div>
  );

  //return <Game />;
}
export default HomePage;
