import classes from "./Cards.module.css";

import { CardTrigger } from "../../context/CardTrigger.js";
import Image from "next/image";


function ItemStack(props) {
  const [triggerItemFlip] = CardTrigger();
  return (
    <div>
      <div>
        <div className={classes.flipItemcard} value={triggerItemFlip}>
          <div className={classes.flipItemcardinner}>
          Actually Item
            <div className={classes.flipItemcardfront}>
              <Image
                src="/EventCardBack.png"
                alt="Actually Item"
                width="1024"
                height="1024"
              ></Image>
            </div>
            <div className={classes.flipItemcardback}>
              <Image
                src= {props.cards[0].image}
                alt="me"
                width="1024"
                height="1024"
              ></Image>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default ItemStack;
