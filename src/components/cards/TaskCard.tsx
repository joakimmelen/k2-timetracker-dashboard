import { useEffect, useState } from "react";
import { calculateTime } from "../timer/CalculateTime";
import { Controls } from "../timer/Controls";
import TimeCard from "./TimeCard";
import { useTimeTrackContext } from "../../context/TimeTrackerContext";

type Task = {
  id: string;
  projectId: string;
  projectTitle: string;
  color: string;
  title: string;
  time_spent: number;
  invoiced: string;
  removeButton?: boolean | undefined;
  allTimes?: boolean | undefined;
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
    if (task.allTimes == true) {
      setActiveTimes(times.filter((time: any) => time.taskId == task.id));
    } else
      setActiveTimes(
        times.filter(
          (time: any) => time.taskId == task.id && time.active == true
        )
      );
  }, [times]);

  return (
    <>
      <div className="task-card">
        <div
          className="task-card-top"
          style={{ backgroundColor: task.color }}
        ></div>
        <h2>{task.title}</h2>
        <h5 style={{ backgroundColor: task.color }}>
          <p>{task.projectTitle}</p>
        </h5>
        <Controls
          {...currentTask}
          setTimeInSeconds={setTimeInSeconds}
          removeButton={task.removeButton}
        />
        <div className="task-times-card">
          {activeTimes.map((time: any) => (
            <TimeCard key={time.id} time={time} {...currentTask} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TaskCard;
