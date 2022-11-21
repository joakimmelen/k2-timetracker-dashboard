import { useState } from "react";
import { useTimeTrackContext } from "../../context/TimeTrackerContext";
import { v4 as uuidv4 } from "uuid";

function NewTaskForm() {
  const [project, setProject] = useState({ id: "dead", title: "dead" });
  const [taskName, setTaskName] = useState<string>("");
  const time_spent = 0;
  const invoiced = "no";
  const [chosenProject, setChosenProject] = useState(false);
  const { addTask, projects } = useTimeTrackContext();

  function handleSubmit(e: any) {
    console.log(project);
    e.preventDefault();
    if (project.id == "dead") {
      console.log("Invalid data, not successfull");
    } else {
      addTask(
        uuidv4(),
        project.id,
        project.title,
        taskName,
        time_spent,
        invoiced
      );
      console.log("task successfully added");
    }
  }

  const handleChange = (e: any) => {
    if (e.target.value == "nobueno") {
      setProject({ id: "dead", title: "dead" });
      console.log("This is an invalid project");
    } else {
      setProject(JSON.parse(e.target.value));
      setChosenProject(true);
    }
  };

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
        <select onChange={handleChange} name="project" id="project">
          <option value="nobueno">----</option>
          {projects.map(
            (project: {
              id: number;
              title: string;
              hrate: number;
              color: string;
            }) => (
              <option key={project.id} value={JSON.stringify(project)}>
                {project.title}
              </option>
            )
          )}
        </select>

        <br />

        {!chosenProject ? (
          <p>Choose project</p>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    </div>
  );
}
export default NewTaskForm;
