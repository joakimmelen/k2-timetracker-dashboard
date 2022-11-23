import { useTimeTrackContext } from "../context/TimeTrackerContext";
import NewTaskModal from "./modal/NewTaskModal";
import useModal from "./hooks/useModal";
import EditTaskModal from "./modal/EditTaskModal";
import TaskCard from "./cards/TaskCard";

const Tasks = () => {
  const { tasks, editTask, removeTask } = useTimeTrackContext();
  const { isOpen, toggle } = useModal();
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

  return (
    <div className="tasks">
      <h1>Tasks</h1>

      <section>
        <button onClick={toggle}>Add Task</button>
        <NewTaskModal isOpen={isOpen} toggle={toggle} />
      </section>
      <section className="px-2 columns-3xs">
        {tasks.map((task: any) => (
          <div className="tasks-card" key={task.id}>
            {/* <h3>{task.title}</h3>
            <span>
              <h4>{task.projectTitle}</h4>
            </span>
            <button>edit</button> */}
            <TaskCard removeButton={true} {...task} />
            {/* <button onClick={() => handleRemove(task.id)}>
              remove {task.title}
            </button> */}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Tasks;
