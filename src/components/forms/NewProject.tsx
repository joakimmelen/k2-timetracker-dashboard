import { useState } from "react";
import { Link } from "react-router-dom";
import { useTimeTrackContext } from "../../context/TimeTrackerContext";

function NewProjectForm() {
  const [projectName, setProjectName] = useState<string>("");
  const [projectColor, setProjectColor] = useState<string>("#f6b73c");
  const [projectRate, setProjectRate] = useState<number>();
  const [projectAdded, setProjectAdded] = useState();
  const { addProject } = useTimeTrackContext();

  function handleSubmit(e: any) {
    const project = {
      title: projectName,
      rate: projectRate,
      color: projectColor,
    };
    e.preventDefault();
    addProject(project);
    console.log(project);
    setProjectName("");
  }

  return (
    <div>
      <div>
        <h2>Create Project</h2>
        <Link to={`/overview`}>
          <button>Back</button>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="projectName">Project Name</label>
        <input
          type="text"
          onChange={(e) => setProjectName(e.target.value)}
          value={projectName}
          name="projectName"
          id="projectName"
          autoComplete="off"
        />
        <br />
        <label htmlFor="projectRate">Hourly Rate</label>
        <input
          type="number"
          name="projectRate"
          id="projectRate"
          onChange={(e) => {
            setProjectRate(parseInt(e.target.value));
          }}
        />
        <br />
        <label htmlFor="projectColor">Project Color</label>
        <input
          type="color"
          onChange={(e) => setProjectColor(e.target.value)}
          value={projectColor}
          name="projectColor"
          id="projectColor"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default NewProjectForm;
