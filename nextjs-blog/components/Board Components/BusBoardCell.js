
import classes from "./BoardCell.module.css";
import { PlayerDetailsStore } from "../../context/PlayerStore.js";
import { CardStackStore } from "../../context/CardStore.js";
import { useEventCardStore } from "../../context/EventCardStore.js";
import { ActiveCellStore } from "../../context/ActiveCellStore.js";

function BusBoardCell(props) {
  const [playerOne, playerTwo] = PlayerDetailsStore();
  const [cardStack, setCardStack] = CardStackStore();
  const [eventCard, showEventCard] = useEventCardStore();
  const [
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
  ] = ActiveCellStore();
  //const [ActiveCell, setActiveCellStore] = ActiveCellStore();

  function cardSelector(props) {
    setBusImage(ActiveCellImages[ActiveCell.indexOf(props.id)]);

    playerOne.Space = props.id;
    console.log(ActiveCell.indexOf(props.id));
    setButtonNameBus("Go to " + ActiveCellName[ActiveCell.indexOf(props.id)]);
    document.getElementById("tennis" + props.id).style.border = "5px solid red";
    console.log("hi" + document.getElementById("busImage").src);
    console.log(
      "The prop id is " +
        props.id +
        " and the cell index is " +
        ActiveCell.indexOf(props.id)
    );
    console.log(ActiveCellName);
    console.log(ActiveCell);
    console.log(ActiveCellImages);
    ActiveCell.forEach((element) => {
      if (element != props.id) {
        document.getElementById("tennis" + element).style.border = "none";
      }
    });
    console.log("boom");
  }

  if (ActiveCell.includes(props.id)) {
    console.log("asdasdasdasdas");
    console.log(ActiveCell.indexOf(props.id));
    console.log(ActiveCellImages);
    return (
      <td className={classes.td}>
        <div
          className="square"
          onClick={() => {
            cardSelector(props);
          }}
        >
          <img
            src={ActiveCellImages[ActiveCell.indexOf(props.id)]}
            id={"tennis" + props.id}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </td>
    );
  }

  if (props.id == 60) {
    return (
      <td className={classes.td}>
        <div
          id={"tennis" + 60}
          className="square"
          onClick={() => {
            testFunction();
          }}
        >
          {props.id}
        </div>
      </td>
    );
  }

  return (
    <td
      style={{
        //border: "1px solid #555",
        width: "50px",
        height: "50px",
        lineHeight: "50px",
        textAlign: "center",
      }}
    >
      <div className="square">
        <img
          src="https://i.imgur.com/wrrKYfO.png"
          id={props.id}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </td>
  );
}

export default BusBoardCell;
