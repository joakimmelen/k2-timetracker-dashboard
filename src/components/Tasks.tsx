import { useTimeTrackContext } from "../context/TimeTrackerContext";
import NewTaskModal from "./modal/NewTaskModal";
import useModal from "./hooks/useModal";
import EditTaskModal from "./modal/EditTaskModal";
import TaskCard from "./cards/TaskCard";

const Tasks = () => {
  const { tasks, editTask, removeTask } = useTimeTrackContext();
  const { isOpen, toggle } = useModal();

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
            <TaskCard removeButton={true} {...task} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Tasks;
