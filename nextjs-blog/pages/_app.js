import { SocketStoreProvider } from "../context/SocketStore.js";
import { PlayerListStoreProvider } from "../context/PlayerListStore.js";

function MyApp({ Component, pageProps }) {
  return (
    <SocketStoreProvider>
      <PlayerListStoreProvider>
        <Component {...pageProps} />
      </PlayerListStoreProvider>
    </SocketStoreProvider>
  );
}
export default MyApp;
