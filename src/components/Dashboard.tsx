import { useEffect, useState } from "react";
import { useTimeTrackContext } from "../context/TimeTrackerContext";
import TimeCard from "./cards/TimeCard";
import ProjectTable from "./tables/ProjectTable";
import TaskTable from "./tables/TaskTable";
import { calculateTime } from "./timer/CalculateTime";
import useModal from "./hooks/useModal";
import NewInvoiceModal from "./modal/NewInvoiceModal";
import InvoiceTable from "./tables/InvoiceTable";

const Dashboard = () => {
  const { projects, tasks, times, invoices } = useTimeTrackContext();
  const [timeSpan, setTimeSpan] = useState<string>("month");
  const [activeTime, setActiveTime] = useState<Array<string | number>>([]);
  const [billedCash, setBilledCash] = useState<Array<number>>();
  const { isOpen, toggle } = useModal();

  const handleChange = (e: any) => {
    setTimeSpan(e.target.value);
  };

  const calcTotalTimeMonth = () => {
    const filteredTimes = times.filter(
      (time: any) => time.end_time && time.start_time > Date.now() - 2592000000
    );

    const addTimes = filteredTimes.map(
      (time: any) => (time.end_time - time.start_time) / 1000
    );

    const timeArray = calculateTime(
      addTimes.reduce((acc: any, curr: any) => acc + curr, 0)
    );
    setActiveTime(timeArray);
  };

  const updateCash = () => {
    const magicData = Date.now() - 31556926000;
    let newDate = new Date(magicData);
    const simsallabim = newDate.toISOString().split("T")[0];
    const filteredInvoices = invoices.filter(
      (voice: any) =>
        Number(voice.created_at.split("-")[0]) >
        Number(simsallabim.split("-")[0])
    );
    const reducerator = filteredInvoices.map((item: any) => item.amount);
    const reducer = reducerator.reduce((acc: any, curr: any) => acc + curr, 0);
    setBilledCash(reducer);
  };

  useEffect(() => {
    updateCash();
  }, []);

  useEffect(() => {
    calcTotalTimeMonth();
  }, [times]);

  return (
    <div className="dashboard">
      <h1>Welcome to the Dashboard</h1>
      <div>
        <p>✔️Active projects: {projects.length}</p>
        <p>✔️Active tasks: {tasks.length}</p>
        <p>✔️Invoices created: {invoices.length}</p>
        <p>
          ✔️Active time past month: {activeTime[0]}:{activeTime[1]}:
          {activeTime[2]}{" "}
        </p>
        <p>✔️Amount billed past year: {billedCash} SEK </p>
      </div>

      <button onClick={toggle}>👉Create invoice</button>

      <NewInvoiceModal isOpen={isOpen} toggle={toggle} />
      <InvoiceTable />
      <ProjectTable />
      <TaskTable />
      <h2>
        Show timelogs{" "}
        <select onChange={handleChange}>
          <option value="month">30 days</option>
          <option value="always">always</option>
          <option value="active">active</option>
        </select>{" "}
        (by task)
      </h2>
      {tasks.map((task: any) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <div>
            {timeSpan == "month"
              ? times.map((time: any) => (
                  <div key={time.id}>
                    {time.taskId == task.id &&
                    time.start_time > Date.now() - 2592000000 ? (
                      <TimeCard time={time} />
                    ) : undefined}
                  </div>
                ))
              : timeSpan == "always"
              ? times.map((time: any) => (
                  <div key={time.id}>
                    {time.taskId == task.id ? (
                      <TimeCard time={time} />
                    ) : undefined}
                  </div>
                ))
              : timeSpan == "active"
              ? times.map((time: any) => (
                  <div key={time.id}>
                    {time.taskId == task.id && time.active ? (
                      <TimeCard time={time} />
                    ) : undefined}
                  </div>
                ))
              : undefined}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
