import { useState, ReactNode } from "react";
import { useTimeTrackContext } from "../../context/TimeTrackerContext";
import { v4 as uuidv4 } from "uuid";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

function NewProjectForm(props: ModalType) {
  const [projectName, setProjectName] = useState<string>("");
  const [projectColor, setProjectColor] = useState<string>("#f6b73c");
  const [projectRate, setProjectRate] = useState<number>();
  const { addProject } = useTimeTrackContext();

  function handleSubmit(e: any) {
    e.preventDefault();
    addProject(uuidv4(), projectName, projectRate, projectColor);
    setProjectName("");
    props.toggle();
  }

  return (
    <div>
      <button onClick={props.toggle}>X</button>
      <div>
        <h2>Create Project</h2>
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
