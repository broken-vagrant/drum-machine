import React from "react";

const Drum = ({
  isPowered,
  keyTrigger,
  keyCode,
  url,
  id,
  updateDisplay,
  volumeLevel,
}) => {
  const thisRef = React.useRef();

  // update volume level if props.volumeLevel changes
  React.useEffect(() => {
    if (thisRef.current) {
      thisRef.current.volume = volumeLevel;
    }
  }, [volumeLevel]);

  // I have to pass playSounc as dependency to handleKeyDown useEffect
  // playSound will get newly created if updateDisplay,thisRef,id changes
  const playSound = React.useCallback(() => {
    if (thisRef.current) {
      let thisAudioEl = thisRef.current;
      thisAudioEl.currentTime = 0;
      thisAudioEl.play();
      updateDisplay(id.replace(/-/g, " "));
    }
  }, [thisRef, id, updateDisplay]);

  React.useEffect(() => {
    // do below only if it's dependencies changes
    const handleKeyDown = (e) => {
      if (isPowered) {
        if (e.keyCode === keyCode) {
          playSound();
          highLightActiveDrum(thisRef.current.parentNode);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPowered]);

  const highLightActiveDrum = (target) => {
    target.classList.add("active");
    setTimeout(() => {
      target.classList.remove("active");
    }, 200);
  };
  const handleClick = (e) => {
    if (isPowered) {
      let clickedButton = e.target;
      playSound();
      highLightActiveDrum(clickedButton);
    }
  };
  return (
    <button type="button" className="drum-pad" id={id} onClick={handleClick}>
      <audio className="clip" id={keyTrigger} src={url} ref={thisRef}></audio>
      {keyTrigger}
    </button>
  );
};

export default Drum;
