import { useState, ReactNode, useEffect } from "react";
import { useTimeTrackContext } from "../../context/TimeTrackerContext";
import { v4 as uuidv4 } from "uuid";
import Tasks from "../Tasks";
import TaskTable from "../tables/TaskTable";
import { calculateTime } from "../timer/CalculateTime";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

type ProjectType = {
  id: string;
  title: string;
  hrate?: number;
  color: string;
};

function NewInvoiceForm(props: ModalType) {
  const [project, setProject] = useState<ProjectType | undefined>({
    id: "",
    title: "",
    hrate: 0,
    color: "string",
  });
  const { projects, tasks, addInvoice } = useTimeTrackContext();
  const [customer, setCustomer] = useState<string>("");
  const [dueDate, setDueDate] = useState<any>("");
  const [amount, setAmount] = useState<number>(0);
  const [billedTasks, setBilledTasks] = useState<any>([]);

  function handleSubmit(e: any) {
    e.preventDefault();
    addInvoice(
      uuidv4(),
      project?.id,
      "unpaid",
      dueDate,
      Math.round(amount),
      customer,
      new Date().toISOString().split("T")[0]
    );
    props.toggle();
  }

  const handleChange = (e: any) => {
    setProject(JSON.parse(e.target.value) as ProjectType);
    setCustomer("");
    setAmount(0);
    setBilledTasks([]);
  };

  const calcDate = () => {
    const magicData = Date.now() + 2592000000;
    let newDate = new Date(magicData);
    return newDate.toISOString().split("T")[0];
  };

  useEffect(() => {
    setDueDate(calcDate);
  }, []);

  const calculator = () => {
    let timeCash: Array<number> = [];
    const cash = billedTasks.filter((item: any) =>
      timeCash.push(item.time_spent)
    );
    const reducer = timeCash.reduce((acc, curr) => acc + curr, 0);
    console.log(reducer);
    const adderator = reducer / 60 / 60;
    if (project?.hrate) {
      return adderator * project?.hrate;
    } else return;
  };

  useEffect(() => {
    const cashDollars = calculator();
    if (cashDollars) {
      setAmount(cashDollars);
      // console.log(cashDollars);
    }
  }, [billedTasks]);

  const handleAddTask = (task: any) => {
    if (!billedTasks.find((btask: any) => btask.id == task.id)) {
      setBilledTasks([...billedTasks, task]);
    } else return;
  };

  return (
    <div>
      <button onClick={props.toggle}>X</button>
      <div>
        <h2>Create Invoice</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="project">For project</label>
        <select onChange={handleChange} name="project" id="project">
          <option value="hej">----</option>
          {projects.map((project: any) => (
            <option key={project.id} value={JSON.stringify(project)}>
              {project.title}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="projectRate">Hourly Rate</label>
        <input type="number" disabled value={project?.hrate} />
        <br />
        <label htmlFor="status">Status</label>
        <input type="" disabled value="unpaid" />
        <br />
        <label htmlFor="due_date">Due date</label>
        <input
          type="date"
          name="due_date"
          id="due_date"
          value={dueDate}
          disabled
        />
        <br />
        <label htmlFor="customer">Customer name</label>
        <input
          type="text"
          onChange={(e: any) => setCustomer(e.target.value)}
          value={customer}
        />
        <br />
        <label htmlFor="amount">Total value for billing</label>
        <input type="number" disabled value={Math.round(amount)} />
        <br />

        <h5>tasks added</h5>
        <div>
          {billedTasks.map((bTask: any) => (
            <p key={bTask.id}>{bTask.title}</p>
          ))}
        </div>
        <h5>Choose tasks to add to billing</h5>
        <div>
          <table>
            <thead>
              <tr>
                <th colSpan={4}>Tasks</th>
              </tr>
              <tr>
                <th>Name</th>
                <th>Hours</th>
                <th>Minutes</th>
                <th>Seconds</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task: any) =>
                task.projectId == project?.id ? (
                  <tr onClick={() => handleAddTask(task)} key={task.id}>
                    <td>{task.title}</td>
                    <td>{calculateTime(task.time_spent)[0]}</td>
                    <td>{calculateTime(task.time_spent)[1]}</td>
                    <td>{calculateTime(task.time_spent)[2]}</td>
                  </tr>
                ) : undefined
              )}
            </tbody>
          </table>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default NewInvoiceForm;
