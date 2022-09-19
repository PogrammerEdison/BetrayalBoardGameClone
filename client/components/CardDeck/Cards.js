import classes from "./Cards.module.css";


function Card(props) {
  //setCardStack(cardStack.concat(props.card));
  return (
    <div className={classes.stack}>
      <img src={props.card.image} width="100" height="100"></img>
    </div>
  );
}

export default Card;
