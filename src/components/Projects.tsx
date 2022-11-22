import { useTimeTrackContext } from "../context/TimeTrackerContext";
import NewProjectModal from "./modal/NewProjectModal";
import useModal from "./hooks/useModal";

const Projects = () => {
  const { projects, editProject, removeProject } = useTimeTrackContext();
  const { isOpen, toggle } = useModal();
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
        <button onClick={toggle}>Add Project</button>
        <NewProjectModal isOpen={isOpen} toggle={toggle} />
      </section>
      <section className="cards">
        {projects.map((project: any) => (
          <div className="project-card" key={project.id}>
            <div
              style={{ backgroundColor: project.color }}
              className="project-card-top"
            ></div>
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
