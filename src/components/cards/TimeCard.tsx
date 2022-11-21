import { useEffect, useState } from "react";
import { calculateTime } from "../timer/CalculateTime";
import { useTimeTrackContext } from "../../context/TimeTrackerContext";

const TimeCard = (props: any) => {
  const { times, editTime } = useTimeTrackContext();
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [timerArray, setTimerArray] = useState<Array<number | string>>([]);
  const [activeTimes, setActiveTimes] = useState([]);
  const [intervalId, setIntervalId] = useState<number>(0);
  const startTime = props.time.start_time;

  useEffect(() => {
    setActiveTimes(times.filter((time: any) => time.taskId == props.id));
  }, [times]);

  useEffect(() => {
    let timeArray: Array<number | string> = calculateTime(timeInSeconds);
    setTimerArray(timeArray);
  }, [timeInSeconds]);

  useEffect(() => {
    if (!props.time.end_time) {
      let interval: number = setInterval(() => {
        setTimeInSeconds((Date.now() - startTime) / 1000);
      }, 1000);
      setIntervalId(interval);
    } else
      setTimeInSeconds((props.time.end_time - props.time.start_time) / 1000);
  }, []);

  const handleStopButton = () => {
    clearInterval(intervalId);
    editTime(
      props.time.id,
      false,
      new Date().toISOString().slice(0, 10),
      Date.now()
    );
    // console.log(props.id, new Date().toISOString().slice(0, 10), Date.now());
  };

  const handleClick = () => {
    console.log((Date.now() - props.time.start_time) / 1000);
  };

  return (
    <div className="time-card-container">
      <p className="timer-text">{timerArray[0]}</p>
      <span>:</span>
      <p className="timer-text">{timerArray[1]}</p>
      <span>:</span>
      <p className="timer-text">{timerArray[2]}</p>
      {props.time.end_time ? undefined : (
        <button onClick={handleStopButton}>Stop</button>
      )}
    </div>
  );
};

export default TimeCard;
