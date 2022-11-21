import { useEffect, useState } from "react";
import { calculateTime } from "../timer/CalculateTime";
import { Controls } from "../timer/Controls";
import TimeCard from "./TimeCard";
import { useTimeTrackContext } from "../../context/TimeTrackerContext";

type Task = {
  id: string;
  projectId: string;
  projectTitle: string;
  title: string;
  time_spent: number;
  invoiced: string;
};

const TaskCard = (task: Task) => {
  const { times } = useTimeTrackContext();
  const [activeTimes, setActiveTimes] = useState([]);
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [timerArray, setTimerArray] = useState<Array<number | string>>([]);
  const currentTask = task;

  useEffect(() => {
    let timeArray: Array<number | string> = calculateTime(timeInSeconds);
    setTimerArray(timeArray);
  }, [timeInSeconds]);

  useEffect(() => {
    setActiveTimes(
      times.filter((time: any) => time.taskId == task.id && time.active == true)
    );
  }, [times]);

  return (
    <>
      <div className="timer-container">
        <h2>{task.title}</h2>
        <h5>
          on project: <p>{task.projectTitle}</p>
        </h5>
        <Controls {...currentTask} setTimeInSeconds={setTimeInSeconds} />
        {activeTimes.map((time: any) => (
          <TimeCard key={time.id} time={time} {...currentTask} />
        ))}
      </div>
    </>
  );
};

export default TaskCard;
