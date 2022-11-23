import { useTimeTrackContext } from "../../context/TimeTrackerContext";

const TaskTable = () => {
  const { tasks } = useTimeTrackContext();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Tasks</th>
          </tr>
          <tr>
            <th>Name</th>
            <th>On project</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: any) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.projectTitle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
