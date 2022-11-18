import { useState } from "react";
import { useTimeTrackContext } from "../context/TimeTrackerContext";
import ProjectCard from "./cards/ProjectCard";
import NewProjectForm from "./forms/NewProject";
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
    console.log(`Project with id ${id} has been successfully removed`);
  };

  return (
    <div className="Tasks">
      <h1>Tasks</h1>

      <section>
        <NewTaskForm />
      </section>
      <section>
        <button onClick={() => console.log(tasks)}>log Tasks</button>
        {tasks.map((task: any) => (
          <div key={task.id}>
            <h5>{task.title}</h5>
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
