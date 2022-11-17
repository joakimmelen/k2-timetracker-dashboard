import { useState } from "react";

type Props = {
  setTimeInSeconds: Function;
};

export const Controls = (props: Props) => {
  const { setTimeInSeconds } = props;
  const [intervalId, setIntervalId] = useState<number>(0);

  const handlePlayButton = () => {
    let interval: number = setInterval(() => {
      setTimeInSeconds((prevState: number) => prevState + 1);
    }, 1000);
    setIntervalId(interval);
  };

  const handleStopButton = () => {
    clearInterval(intervalId);
  };

  return (
    <div className="controls-container">
      <button onClick={handlePlayButton}>Play</button>
      <button onClick={handleStopButton}>Stop</button>
    </div>
  );
};
