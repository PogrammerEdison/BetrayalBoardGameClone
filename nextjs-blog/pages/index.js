
import { useRouter } from "next/router";
import { PlayerListStore } from "../context/PlayerListStore.js";
import { SocketStore } from "../context/SocketStore.js";
import io from "socket.io-client";

<link rel="stylesheet" href="globals.css"></link>;

// const socket = io.connect("http://localhost:3001", {
//   reconnection: true,
//   reconnectionAttempts: Infinity,
//   forceNewConnection: false,
// });

////////////

////////////////

function HomePage(props) {

  const [Socket, setSocket] = SocketStore();
  const [playerList, setPlayerList] = PlayerListStore();
  const router = useRouter();

  function startRoom() {
    Socket.emit("startRoom", {
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
            setPlayerList([document.getElementById("name").value]),
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
      </div>
    </div>
  );

  //return <Game />;
}
export default HomePage;
