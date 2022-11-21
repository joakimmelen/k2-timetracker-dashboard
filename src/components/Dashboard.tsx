import { useTimeTrackContext } from "../context/TimeTrackerContext";
import TimeCard from "./cards/TimeCard";

const Dashboard = () => {
  const { times } = useTimeTrackContext();
  return (
    <div className="dashboard">
      <h1>Welcome to the Dashboard</h1>
      {times.map((time: any) => (
        <TimeCard key={time.id} time={time} />
      ))}
    </div>
  );
};

export default Dashboard;
