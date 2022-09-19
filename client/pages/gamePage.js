import Link from "next/link";
import Game from "../components/Game";
import { useRouter } from "next/router";

<link rel="stylesheet" href="globals.css"></link>;
import io from "socket.io-client";

//const socket = io.connect("https://mighty-brushlands-84806.herokuapp.com/");

////////////

////////////////

function GamePage() {
  return <Game />;
}
export default GamePage;
