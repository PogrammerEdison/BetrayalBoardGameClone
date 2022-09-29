import { createContext, useContext, useReducer } from "react";
import CameraScreen from "../components/EventCards/CameraScreen";

const Store = createContext();

// Reducer to show the loading screen or not depending on the action passed in
const reducer = (state, action) => {
  switch (action.type) {
    case "showScreen": {
        console.log("here we are")
      return (<CameraScreen></CameraScreen>);
    }
    default: {
      return null;
    }
  }
};

export const CameraReducerStore = () => useContext(Store);

export const CameraReducerProvider = ({ children }) => {
  const [cameraScreen, showCameraScreen] = useReducer(reducer, null);

  return (
    <Store.Provider value={[cameraScreen, showCameraScreen]}>
      {children}
    </Store.Provider>
  );
};
