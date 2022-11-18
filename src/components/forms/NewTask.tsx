import { useState } from "react";
import { Link } from "react-router-dom";
import { useTimeTrackContext } from "../../context/TimeTrackerContext";

function NewTaskForm() {
  const [taskName, setTaskName] = useState<string>("");
  const { addTask, tasks, projects } = useTimeTrackContext();

  function handleSubmit(e: any) {
    e.preventDefault();
    addTask(taskName);
  }

  return (
    <div>
      <div>
        <h2>Create Task</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskName">Task Name</label>
        <input
          type="text"
          onChange={(e) => setTaskName(e.target.value)}
          value={taskName}
          name="taskName"
          id="taskName"
          autoComplete="off"
        />
        <br />
        <label htmlFor="project">For what project?</label>
        <select name="project" id="project">
          {projects.map((project: any) => {
            {
              console.log(project);
            }
            <option value={project.id}>{project.title}</option>;
          })}
        </select>

        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default NewTaskForm;
