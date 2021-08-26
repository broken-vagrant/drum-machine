import { bankOne, bankTwo } from "../constants";
import Drum from "./Drum";

const Drums = (props) => {
  let drums = null;
  if (props.bank.selected === "One") {
    drums = bankOne.map((item) => {
      return (
        <Drum
          isPowered={props.isPowered}
          updateDisplay={props.updateDisplay}
          {...item}
          volumeLevel={props.volumeLevel}
          key={item.keyCode}
        />
      );
    });
  } else {
    drums = bankTwo.map((item) => {
      return (
        <Drum
          isPowered={props.isPowered}
          updateDisplay={props.updateDisplay}
          {...item}
          volumeLevel={props.volumeLevel}
          key={item.keyCode}
        />
      );
    });
  }
  return <div className="drum-pads">{drums}</div>;
};

export default Drums;
