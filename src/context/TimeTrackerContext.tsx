import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { getInvoices, getProjects, getTasks, getTimes } from "../utils/api";
import axios from "axios";

type TimeContext = {
  addProject: Function;
  projects: any;
  editProject: Function;
  removeProject: Function;
  tasks: any;
  addTask: Function;
  editTask: Function;
  removeTask: Function;
  addTime: Function;
  times: any;
  editTime: Function;
};
interface TimeProps {
  children: React.ReactNode;
}
export const TimeTrackContext = createContext<TimeContext | undefined>(
  undefined
);

export function TimeTrackerProvider({ children }: TimeProps) {
  const [projects, setProjects] = useState<Array<object>>([]);
  const [tasks, setTasks] = useState<Array<object>>([]);
  const [times, setTimes] = useState<Array<object>>([]);
  const [invoices, setInvoices] = useState<Array<object>>([]);

  const updateProjects = useCallback(() => {
    getProjects().then((res) => setProjects(res.data));
  }, []);
  useEffect(updateProjects, []);

  const addProject = useCallback(
    (id: string, title: string, hrate: number, color: string) => {
      axios
        .post("http://localhost:3000/projects", {
          id,
          title,
          hrate,
          color,
        })
        .then(() => {
          updateProjects();
        });
    },
    []
  );

  const editProject = useCallback(
    (id: string, title?: string, color?: string, hrate?: number) => {
      axios
        .patch(`http://localhost:3000/projects/${id}`, {
          title,
          color,
          hrate,
        })
        .then(() => {
          updateProjects();
        });
    },
    []
  );

  const removeProject = useCallback((id: string) => {
    axios.delete(`http://localhost:3000/projects/${id}`).then(() => {
      updateProjects();
      updateTasks();
    });
  }, []);

  const updateTasks = useCallback(() => {
    getTasks().then((response) => setTasks(response.data));
  }, []);
  useEffect(updateTasks, []);

  const addTask = useCallback(
    (
      id: string,
      projectId: string,
      projectTitle: string,
      title: string,
      time_spent: number,
      invoiced: string
    ) => {
      axios
        .post("http://localhost:3000/tasks", {
          id,
          projectId,
          projectTitle,
          title,
          time_spent,
          invoiced,
        })
        .then(() => {
          updateTasks();
        });
    },
    []
  );

  const editTask = useCallback(
    (id: string, title?: string, time_spent?: number) => {
      axios
        .patch(`http://localhost:3000/tasks/${id}`, {
          title,
          time_spent,
        })
        .then(() => {
          updateTasks();
        });
    },
    []
  );

  const removeTask = useCallback((id: number) => {
    axios.delete(`http://localhost:3000/tasks/${id}`).then(() => {
      updateTasks();
    });
  }, []);

  const updateTimes = useCallback(() => {
    getTimes().then((response) => setTimes(response.data));
  }, []);
  useEffect(updateTimes, []);

  const addTime = useCallback(
    (
      id: string,
      taskId: string,
      active: boolean,
      start_date: string,
      start_time: number,
      end_date?: string,
      end_time?: number,
      total_time_seconds?: number
    ) => {
      axios
        .post("http://localhost:3000/timelogs", {
          id,
          taskId,
          active,
          start_date,
          start_time,
          end_date,
          end_time,
          total_time_seconds,
        })
        .then(() => {
          updateTimes();
        });
    },
    []
  );

  const editTime = useCallback(
    (id: string, active: boolean, end_date: string, end_time: number) => {
      axios
        .patch(`http://localhost:3000/timelogs/${id}`, {
          active,
          end_date,
          end_time,
        })
        .then(() => {
          updateTimes();
        });
    },
    []
  );

  const removeTime = useCallback((id: number) => {
    axios.delete(`http://localhost:3000/timelogs/${id}`).then(() => {
      updateTimes();
    });
  }, []);

  const updateInvoices = useCallback(() => {
    getInvoices().then((res) => setInvoices(res.data));
  }, []);
  useEffect(updateInvoices, []);

  const addInvoice = useCallback(
    (
      projectId: number,
      status: string,
      due_date: string,
      amount: number,
      customer_name: string,
      created_at: string
    ) => {
      axios
        .post("http://localhost:3000/invoices", {
          projectId,
          status,
          due_date,
          amount,
          customer_name,
          created_at,
        })
        .then(() => {
          updateInvoices();
        });
    },
    []
  );

  const removeInvoice = useCallback((id: number) => {
    axios.delete(`http://localhost:3000/invoices/${id}`).then(() => {
      updateInvoices();
    });
  }, []);

  const providerValue = useMemo(() => {
    return {
      projects,
      addProject,
      editProject,
      removeProject,
      tasks,
      addTask,
      editTask,
      removeTask,
      times,
      addTime,
      editTime,
      removeTime,
      invoices,
      addInvoice,
      removeInvoice,
    };
  }, [
    projects,
    addProject,
    editProject,
    removeProject,
    tasks,
    addTask,
    editTask,
    removeTask,
    times,
    addTime,
    editTime,
    removeTime,
    invoices,
    addInvoice,
    removeInvoice,
  ]);

  return (
    <TimeTrackContext.Provider value={providerValue}>
      {children}
    </TimeTrackContext.Provider>
  );
}

export function useTimeTrackContext() {
  const context = useContext(TimeTrackContext);

  if (!context) {
    throw new Error("UseTimeTrackContext: Outside the Provider");
  }
  return context;
}
