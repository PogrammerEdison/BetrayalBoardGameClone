import { PlayerDetailsStore } from "../../context/PlayerStore.js";
import Image from "next/image";

function PlayerCard(props) {
  const [playerOne] = PlayerDetailsStore();
  console.log(playerOne.Items);
  return (
    <div>
      <div>
        <Image src="/RedCard.png" alt="me" width="512px" height="512px"></Image>
      </div>
      <div
        style={{
          position: "absolute",
          left: "90%",
          bottom: "80%",
          fontFamily: "Arial Black",
          color: "rgb(154,0,0)",
        }}
      >
        <div
          style={{
            position: "fixed",
            left: "94%",
            bottom: "90%",
            fontFamily: "Arial Black",
            color: "rgb(154,0,0)",
          }}
        >
          <strong>Items:</strong>
          <ul>
            {playerOne.items.map((item) => {
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
      <div
        style={{
          position: "absolute",
          left: "31%",
          bottom: "37%",
          fontFamily: "Arial Black",
          color: "rgb(154,0,0)",
        }}
      >
        <em>
          <b>playerOne</b>
        </em>
      </div>
      <div
        style={{
          position: "absolute",
          left: "55%",
          bottom: "27%",
          fontFamily: "Arial Black",
          color: "rgb(154,0,0)",
        }}
      >
        <em>
          <b>{playerOne.Strength}</b>
        </em>
      </div>
      <div
        style={{
          position: "absolute",
          left: "55%",
          bottom: "19%",
          fontFamily: "Arial Black",
          color: "rgb(154,0,0)",
        }}
      >
        <em>
          <b>{playerOne.Intelligence}</b>
        </em>
      </div>
      <div
        style={{
          position: "absolute",
          left: "55%",
          bottom: "12%",
          fontFamily: "Arial Black",
          color: "rgb(154,0,0)",
        }}
      >
        <em>
          <b>{playerOne.speed}</b>
        </em>
      </div>
    </div>
  );
}

export default PlayerCard;
