import Card from "./Cards";

import EventStack from "./EventStack";

function Deck(props) {
  console.log("we made it");
  if(props.type == "placeCard") {
  return props.cards.slice(0).reverse().map((cardInfo) => //slice 0 creates shallow copy
  <Card card={cardInfo} key={cardInfo.name}/>) 
  } else {
    return props.cards.slice(0).reverse().map((cardInfo) => //slice 0 creates shallow copy
    <EventStack card={cardInfo} key={cardInfo.name}/>) 
  }
}

export default Deck;
