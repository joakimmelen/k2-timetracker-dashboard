import { useTimeTrackContext } from "../../context/TimeTrackerContext";

const ProjectTable = () => {
  const { projects, tasks } = useTimeTrackContext();

  const calcTasksOnProject = (project: any) => {
    const data = tasks.filter((task: any) => task.projectId == project.id);
    return data.length;
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Projects</th>
          </tr>
          <tr>
            <th>Name</th>
            <th>Tasks</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project: any) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{calcTasksOnProject(project)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
