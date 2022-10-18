import { PlayerDetailsStore } from "../../context/PlayerStore.js";
import Image from "next/image";
import { useRef } from "react";

function PlayerCard(props) {
  console.log(props.player);
  return (
    <div
      style={{
        position: "relative",
        width: "160px",
        height: "270px",
        margin: "10px",
      }}
    >
      <div>
        <Image src="/RedCard.png" alt="me" layout="fill"></Image>
      </div>
      <div>
        <img
          src={props.image}
          alt="me"
          style={{
            position: "relative",
            width: "100px",
            height: "100px",
            left: "31px",
            top: "44px",
            borderRadius: "100%",
            border: "solid",
            margin: "0px",
          }}
        ></img>
      </div>
      <div
        style={{
          position: "relative",
          fontFamily: "Arial Black",
          color: "rgb(154,0,0)",
        }}
      >
        <div
          style={{
            position: "relative",
            left: "0%",
            top: "150px",
            fontFamily: "Arial Black",
            color: "rgb(154,0,0)",
          }}
        >
          <strong>Items:</strong>
          <ul>
            {console.log("heeee " + props.player)}
            {console.log(props.player)}
            {console.log(props.player[4])}
            {props.player[4].map((item) => {
              {
                console.log("hi");
              }
              return (
                <li>
                  <img
                    src={item.image}
                    alt="me"
                    position="relative"
                    width="64px"
                    height="64px"
                  ></img>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {console.log(props.name)}
      <div
        style={{
          position: "relative",
          left: "25%",
          top: "7%",
          fontFamily: "Arial Black",
          color: "rgb(154,0,0)",
        }}
      >
        <em>
          <b>{props.name}</b>
        </em>
      </div>
      <div
        style={{
          position: "relative",
          left: "55%",
          top: "22px",
          fontFamily: "Arial Black",
          color: "rgb(154,0,0)",
        }}
      >
        <em>
          <b>{props.player[0]}</b>
        </em>
      </div>
      <div
        style={{
          position: "relative",
          left: "55%",
          top: "20px",
          fontFamily: "Arial Black",
          color: "rgb(154,0,0)",
        }}
      >
        <em>
          <b>{props.player[1]}</b>
        </em>
      </div>
      <div
        style={{
          position: "relative",
          left: "55%",
          top: "18px",
          fontFamily: "Arial Black",
          color: "rgb(154,0,0)",
        }}
      >
        <em>
          <b>{props.player[2]}</b>
        </em>
      </div>
    </div>
  );
}

export default PlayerCard;
