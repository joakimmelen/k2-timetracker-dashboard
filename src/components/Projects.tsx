import { useState } from "react";
import { useTimeTrackContext } from "../context/TimeTrackerContext";
import ProjectCard from "./cards/ProjectCard";
import NewProjectForm from "./forms/NewProject";

const Projects = () => {
  const { projects, editProject, removeProject } = useTimeTrackContext();
  // const [project, setProject] = useState<object>();

  const handleEdit = (project: object) =>
    //
    // id: number,
    // title?: string,
    // hrate?: number,
    // color?: string
    {
      console.log(project);
    };

  const handleRemove = (id: number) => {
    removeProject(id);
    console.log(`Project with id ${id} has been successfully removed`);
  };

  return (
    <div className="projects">
      <h1>Projects</h1>

      <section>
        <NewProjectForm />
      </section>
      <section>
        <button onClick={() => console.log(projects)}>log projects</button>
        {projects.map((project: any) => (
          <div key={project.id}>
            <h5>
              {project.title} @ {project.hrate} SEK/h
            </h5>
            <button
              onClick={() => {
                handleEdit(project);
              }}
            >
              edit
            </button>
            <button onClick={() => handleRemove(project.id)}>remove</button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Projects;
