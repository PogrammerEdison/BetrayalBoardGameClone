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

const socket = io.connect("https://pure-atoll-20271.herokuapp.com/");

// const socket = io.connect("http://localhost:3001", {
//   reconnection: true,
//   reconnectionAttempts: Infinity,
// });

////////////

////////////////

function HomePage(props) {
  const [cameraScreen, setCameraScreen] = CameraReducerStore();
  const [trigger, setTrigger] = useState(false);
  const [testImage, setTestImage] = useState("https://i.imgur.com/pdPR9ds.png");
  const webRef = useRef(null);
  let profileImg = null;

  const showImage = () => {
    profileImg = webRef.current.getScreenshot();
    setTestImage(profileImg);
  };
  const [playerOne, playerOneImage, setPlayerOneImage] = PlayerDetailsStore();

  const [playerList, setPlayerList] = PlayerListStore();
  const router = useRouter();

  function startRoom() {
    socket.emit("startRoom", {
      hostName: document.getElementById("name").value,
      roomID: String(Math.floor(Math.random() * 1000)),
    });
  }

  function connectRoom() {
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
    <div>
      <div style={{ position: "absolute", left: "40%", top: "30%" }}>
        Enter Name:
        <input id="name" />
      </div>
      <div style={{ position: "absolute", left: "40%", top: "40%" }}>
        <input id="roomID" />
        <button onClick={connectRoom}> Join Room </button>
      </div>
      <div style={{ position: "absolute", left: "45%", top: "50%" }}>
        <button
          onClick={() => {
            setPlayerList([[document.getElementById("name").value, playerOneImage]]),
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
      {console.log(playerOne.Image)}
      <img
        src={playerOneImage}
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "300px",
          border: "2px solid black",
          left: "5%",
          top: "10%",
          position: "relative",
        }}
      ></img>
      {cameraScreen}
    </div>
  );

  //return <Game />;
}
export default HomePage;
