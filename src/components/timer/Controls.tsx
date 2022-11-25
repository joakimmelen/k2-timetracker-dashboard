import { useState } from "react";
import { useTimeTrackContext } from "../../context/TimeTrackerContext";
import { v4 as uuidv4 } from "uuid";

export const Controls = (props: any) => {
  const { addTime, removeTask } = useTimeTrackContext();

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

  const handleRemove = (id: number) => {
    removeTask(id);
    console.log(`Task with id ${id} has been successfully removed`);
  };

  return (
    <div className="controls-container">
      <button onClick={handlePlayButton}>New Timer</button>
      {props.removeButton ? (
        <button onClick={() => handleRemove(props.id)}>remove</button>
      ) : null}
    </div>
  );
};
