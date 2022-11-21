import { useTimeTrackContext } from "../context/TimeTrackerContext";
import NewTaskForm from "./forms/NewTask";

const Tasks = () => {
  const { tasks, editTask, removeTask } = useTimeTrackContext();
  // const [project, setProject] = useState<object>();

  const handleEdit = (task: object) =>
    //
    // id: number,
    // title?: string,
    // hrate?: number,
    // color?: string
    {
      console.log(task);
    };

  const handleRemove = (id: number) => {
    removeTask(id);
    console.log(`Task with id ${id} has been successfully removed`);
  };

  return (
    <div className="Tasks">
      <h1>Tasks</h1>

      <section>
        <NewTaskForm />
      </section>
      <section>
        {tasks.map((task: any) => (
          <div key={task.id}>
            <span>
              <h3>{task.title}</h3>
              <h6>on project:</h6>
              <h4>{task.projectTitle}</h4>
            </span>
            <button
              onClick={() => {
                handleEdit(task);
              }}
            >
              edit
            </button>
            <button onClick={() => handleRemove(task.id)}>remove</button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Tasks;
