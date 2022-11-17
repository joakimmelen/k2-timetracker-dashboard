import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useTimeTrackContext } from "../../context/TimeTrackerContext";
import styles from "./NewForm.module.css";

function NewProjectForm() {
  const [projectName, setProjectName] = useState("");
  const [projectAdded, setProjectAdded] = useState();
  const [projectColor, setProjectColor] = useState();
  const { addProject } = useTimeTrackContext();

  function handleSubmit(e: Event) {
    e.preventDefault();
    addProject(projectName, projectColor);
    setProjectName("");
  }

  return (
    <div className={styles.container}>
      <div className={styles.topcontainer}>
        <h2>Create Project</h2>
        <Link to={`/overview`}>
          <button>Back</button>
        </Link>
      </div>
      <form className={styles.formular} onSubmit={handleSubmit}>
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
        <label htmlFor="projectColor">Project Color</label>
        <input
          type="color"
          ref={projectColorRef}
          name="projectColor"
          id="projectColor"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default NewProjectForm;
