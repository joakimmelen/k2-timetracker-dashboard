import { useState } from "react";
import { useTimeTrackContext } from "../context/TimeTrackerContext";
import NewProjectForm from "./forms/NewProject";

const Projects = () => {
  const { projects } = useTimeTrackContext();

  return (
    <div className="projects">
      <h1>Projects</h1>

      <section>
        <NewProjectForm />
      </section>
      <section>
        <button>log projects</button>
      </section>
    </div>
  );
};

export default Projects;
