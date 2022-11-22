import { useTimeTrackContext } from "../context/TimeTrackerContext";
import TaskCard from "./cards/TaskCard";

const Dashboard = () => {
  const { tasks } = useTimeTrackContext();
  return (
    <div className="dashboard">
      <h1>Welcome to the Dashboard</h1>
      {tasks.map((task: any) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  );
};

export default Dashboard;
