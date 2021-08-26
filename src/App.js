import React from "react";
import "./App.scss";
import RangeSlider from "./Components/RangeSlider";
import Toggler from "./Components/Toggler";
import Display from "./Components/Display";
import Drums from "./Components/Drums";

const App = () => {
  const [displayVal, setDisplayVal] = React.useState("Play");
  const updateDisplay = (value) => {
    setDisplayVal(value);
  };

  const [power, setPower] = React.useState({ selected: "On" });
  const isPowered = power.selected === "On";
  const powerControl = () => {
    if (power.selected === "On") {
      updateDisplay("");
      setPower({ selected: "Off" });
    } else {
      setPower({ selected: "On" });
    }
  };

  const [bank, setBank] = React.useState({ selected: "One" });
  const handleBankChange = () => {
    if (bank.selected === "One") {
      setBank({ selected: "Two" });
      updateDisplay("Smooth Piano Kit");
    } else {
      setBank({ selected: "One" });
      updateDisplay("Heater Kit");
    }
  };
  const [volumeLevel, setVolumeLevel] = React.useState(0.5);
  const handleVolumeChange = (e) => {
    let value = e.target.value;
    setVolumeLevel(value);
    updateDisplay(`Volume: ${Math.round(value * 100)}`);

    setTimeout(() => {
      updateDisplay("");
    }, 1000);
  };
  const bankOptions = ["One", "Two"];
  const powerOptions = ["Off", "On"];

  return (
    <>
      <h2 className="text-center">Drum Machina</h2>
      <div id="drum-machine" className="drum-machine">
        <div className="drums">
          <Drums
            updateDisplay={updateDisplay}
            bank={bank}
            isPowered={isPowered}
            volumeLevel={volumeLevel}
          />
        </div>
        <div className="drum-controls">
          <Toggler
            name="power"
            title="Power"
            options={powerOptions}
            value={power.selected}
            onChange={powerControl}
          />
          <Display value={displayVal} />
          <RangeSlider
            name="volume"
            title="Volume"
            value={volumeLevel}
            onChange={handleVolumeChange}
            disabled={!isPowered}
          />
          <Toggler
            options={bankOptions}
            value={bank.selected}
            name="bank"
            title="Bank"
            onChange={handleBankChange}
            disabled={!isPowered}
          />
        </div>
      </div>
      <footer className="text-center">
        <h6>developed by Afroz Mohammad</h6>
      </footer>
    </>
  );
};

export default App;
