import React, { useEffect, useState, useRef, useCallback } from "react";
import { Loading } from "../Icons";

const Drum = ({
  isPowered,
  keyTrigger,
  keyCode,
  url,
  id,
  updateDisplay,
  volumeLevel,
}) => {
  const audioRef = useRef();
  const [canPlay, setCanPlay] = useState(false);

  // update volume level if props.volumeLevel changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volumeLevel;
    }
  }, [volumeLevel]);

  const playSound = useCallback(() => {
    if (audioRef.current) {
      let thisAudioEl = audioRef.current;
      thisAudioEl.currentTime = 0;
      thisAudioEl.play();
      updateDisplay(id.replace(/-/g, " "));
    }
  }, [audioRef, id, updateDisplay]);

  useEffect(() => {
    // handle key presses
    const handleKeyDown = (e) => {
      if (isPowered) {
        if (e.keyCode === keyCode) {
          playSound();
          highLightActiveDrum(audioRef.current.parentNode);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const highLightActiveDrum = (target) => {
    target.classList.add("active");
    setTimeout(() => {
      target.classList.remove("active");
    }, 200);
  };
  const handleClick = (e) => {
    if (isPowered) {
      playSound();
      highLightActiveDrum(e.target);
    }
  };
  useEffect(() => {
    // handle audio load
    const handleAudioLoad = () => {
      setCanPlay(true);
    }
    if (audioRef.current) {
      audioRef.current.addEventListener('loadeddata', handleAudioLoad);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadeddata', handleAudioLoad);
      }
    }
  }, [audioRef])

  useEffect(() => {
    // if audio load unsuccessful and user toggles power switch
    // load the audio again if power on
    if (isPowered) {
      if (audioRef.current && !canPlay) audioRef.current.load();
    }
  }, [isPowered])

  let isDisabled = !isPowered || !canPlay;
  let title = isPowered ? canPlay ? keyTrigger : 'Loading audio...' : keyTrigger;

  return (
    <button type="button" className="drum-pad" id={id} onClick={handleClick} disabled={isDisabled} title={title}>
      <audio className="clip" id={keyTrigger} src={url} ref={audioRef}></audio>
      {
        isPowered && !canPlay ? (<Loading style={{ width: '100%', height: '100%', color: 'white' }} />) : keyTrigger
      }
    </button>
  );
};

export default Drum;
