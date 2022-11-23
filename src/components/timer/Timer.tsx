import TaskCard from "../cards/TaskCard";
import { useTimeTrackContext } from "../../context/TimeTrackerContext";

type TaskCardProps = {
  id: string;
  projectId: string;
  projectTitle: string;
  color: string;
  title: string;
  time_spent: number;
  invoiced: string;
  removeButton?: boolean | undefined;
};

const Timer = () => {
  const { tasks } = useTimeTrackContext();

  return (
    <>
      {tasks.map((task: TaskCardProps) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </>
  );
};

export default Timer;
