import classes from "./Cards.module.css";

import { CardTrigger } from "../../context/CardTrigger.js";
import Image from "next/image";


function EventStack(props) {
  const [trigger, setTrigger] = CardTrigger();

  console.log(props.cards[0].image);
  return (
    /*
    <div className="flip-card">
      <div className="flip-card-front">
        <div className={classes.stack}>
          <Image
            src="/EventCardBack.png"
            alt="me"
            width="256"
            height="256"
          ></Image>
        </div>
        <div className="flip-card-back">test</div>
      </div>
    </div>
    
  */
    <div>
      <div>
        <div id="1" className={classes.flipcard} target={trigger}>
          <div id="2" className={classes.flipcardinner}>
            <div className={classes.flipcardfront}>
              <Image
                src="/EventCardBack.png"
                alt="me"
                width="1024"
                height="1024"
              ></Image>
            </div>
            <div className={classes.flipcardback}>
              <Image
                src="/TheConstable.png"
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

export default EventStack;
