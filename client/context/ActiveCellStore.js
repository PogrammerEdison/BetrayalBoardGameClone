import { useState, createContext, useContext, useReducer } from 'react';


const Store = createContext();

export const ActiveCellStore = () => useContext(Store);

export const ActiveCellStoreProvider = ({ children }) => {
  const [ActiveCell, setActiveCellStore] = useState([]);
  const [ActiveCellImages, setActiveCellImages] = useState([]);
  const [ActiveCellName, setActiveCellName] = useState([]);
  const [buttonNameBus, setButtonNameBus] = useState("Select Location");
  const [busImage, setBusImage] = useState("/Bus Station.png");

  return (
    <Store.Provider
      value={[
        ActiveCell,
        setActiveCellStore,
        ActiveCellImages,
        setActiveCellImages,
        ActiveCellName,
        setActiveCellName,
        buttonNameBus,
        setButtonNameBus,
        busImage,
        setBusImage,
      ]}
    >
      {children}
    </Store.Provider>
  );
};
