import { useState } from "react";
import { useTimeTrackContext } from "../../context/TimeTrackerContext";
import { v4 as uuidv4 } from "uuid";

export const Controls = (props: any) => {
  const { addTime } = useTimeTrackContext();

  const handlePlayButton = () => {
    const uuid = uuidv4();
    const active = true;

    addTime(
      uuid,
      props.id,
      active,
      new Date().toISOString().slice(0, 10),
      Date.now()
    );
  };

  return (
    <div className="controls-container">
      <button onClick={handlePlayButton}>New Timer</button>
    </div>
  );
};
