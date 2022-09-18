import { SocketStoreProvider } from "../context/SocketStore.js";
import { PlayerListStoreProvider } from "../context/PlayerListStore.js";

function MyApp({ Component, pageProps }) {
  return (
    <SocketStoreProvider>
      <PlayerListStoreProvider>
        <TestStoreProvider>
          <ActiveCellStoreProvider>
            <ItemStoreProvider>
              <CardTriggerProvider>
                <CardStackStoreProvider>
                  <PlayerDetailsStoreProvider>
                    <EventStoreProvider>
                      <EventCardStoreProvider>
                        <Component {...pageProps} />
                      </EventCardStoreProvider>
                    </EventStoreProvider>
                  </PlayerDetailsStoreProvider>
                </CardStackStoreProvider>
              </CardTriggerProvider>
            </ItemStoreProvider>
          </ActiveCellStoreProvider>
        </TestStoreProvider>
      </PlayerListStoreProvider>
    </SocketStoreProvider>
  );
}
export default MyApp;
