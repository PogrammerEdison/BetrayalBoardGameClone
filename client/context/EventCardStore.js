import { createContext, useContext, useReducer } from "react";
import EventCard from "../components/EventCards/EventCard";
import DrawEventCard from "../components/EventCards/DrawEventCard";
import BusStationEvent from "../components/EventCards/BusStationEvent";


const Store = createContext();

// Reducer to show the loading screen or not depending on the action passed in
const reducer = (state, action) => {
  switch (action.type) {
    case "cardEvent": {
      return (
        <EventCard
          type={action.payload.type}
          value={action.payload.value}
          penalty={action.payload.penalty}
          image={action.payload.image}
          button={action.payload.button}
          player={action.payload.player}
          setPlayer={action.payload.setPlayer}
        ></EventCard>
      );
    }
    case "drawEvent": {
      return (
        <DrawEventCard
          value={action.payload.value}
          image={action.payload.image}
        ></DrawEventCard>
      );
    }
    case "busStation": {
      return (
        <BusStationEvent
          value={action.payload.value}
          image={action.payload.image}
        ></BusStationEvent>
      );
    }
    default: {
      return null;
    }
  }
};

export const useEventCardStore = () => useContext(Store);

export const EventCardStoreProvider = ({ children }) => {
  const [eventCard, showEventCard] = useReducer(reducer, null);

  return (
    <Store.Provider value={[eventCard, showEventCard]}>
      {children}
    </Store.Provider>
  );
};
