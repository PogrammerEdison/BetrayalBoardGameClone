import classes from "./EventCard.module.css";
import Webcam from "react-webcam";
import { useState } from "react";
import { useRef } from "react";
import { CameraReducerStore } from "../../context/CameraReducer.js";
import { PlayerDetailsStore } from "../../context/PlayerStore";
import { PlayerListStore } from "../../context/PlayerListStore.js";

export default function CameraScreen(props) {
  const [cameraScreen, setCameraScreen] = CameraReducerStore();
  const [playerOne, playerOneImage, setPlayerOneImage] = PlayerDetailsStore();
  const [playerList, setPlayerList] = PlayerListStore();
  const [testImage, setTestImage] = useState("https://i.imgur.com/pdPR9ds.png");
  const [trigger, setTrigger] = useState(true);
  const webRef = useRef(null);
  let profileImg = null;

  const showImage = () => {
    profileImg = webRef.current.getScreenshot();
    setTestImage(profileImg);
    cameraTrigger();
    setPlayerOneImage(profileImg);
  };

  function cameraTrigger() {
    setTrigger(!trigger);
  }

  const videoConstraints = {
    width: 500,
    height: 500,
  };

  return (
    <div className={classes.fp_container}>
      {trigger == true ? (
        <>
          <Webcam
            style={{
              borderRadius: "300px",
              border: "2px solid black",
              left: "35%",
              top: "10%",
              position: "absolute",
            }}
            ref={webRef}
            videoConstraints={videoConstraints}
            mirrored={true}
          ></Webcam>
          <button
            style={{ position: "relative", left: "45%", top: "85%" }}
            onClick={() => {
              showImage();
            }}
          >
            {" "}
            Take Image{" "}
          </button>
          <button
            style={{ position: "relative", left: "55%", top: "85%" }}
            onClick={() => {
              setCameraScreen(false);
            }}
          >
            {" "}
            Exit{" "}
          </button>
        </>
      ) : (
        <>
          <img
            style={{
              borderRadius: "300px",
              border: "2px solid black",
              left: "35%",
              top: "10%",
              position: "absolute",
            }}
            src={playerOneImage}
          ></img>
          <button
            style={{ position: "relative", left: "45%", top: "85%" }}
            onClick={() => {
              cameraTrigger();
            }}
          >
            Retake
          </button>
          <button
            style={{ position: "relative", left: "55%", top: "85%" }}
            onClick={() => {
              setCameraScreen(false);
            }}
          >
            {" "}
            Exit{" "}
          </button>
        </>
      )}
    </div>
  );
}
