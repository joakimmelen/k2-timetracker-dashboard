import { useEffect, useState } from "react";
import { calculateTime } from "./CalculateTime";
import { Controls } from "./Controls";

const Timer = () => {
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [timerArray, setTimerArray] = useState<Array<number | string>>([]);

  useEffect(() => {
    let timeArray: Array<number | string> = calculateTime(timeInSeconds);
    setTimerArray(timeArray);
  }, [timeInSeconds]);

  return (
    <>
      <div className="timer-container">
        <p className="timer-text">{timerArray[0]}</p>
        <span>:</span>
        <p className="timer-text">{timerArray[1]}</p>
        <span>:</span>
        <p className="timer-text">{timerArray[2]}</p>
      </div>
      <Controls setTimeInSeconds={setTimeInSeconds} />
    </>
  );
};

export default Timer;
