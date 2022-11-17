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
};
interface TimeProps {
  children: React.ReactNode;
}
export const TimeTrackContext = createContext<TimeContext | undefined>(
  undefined
);

export function TimeTrackerProvider({ children }: TimeProps) {
  const [projects, setProjects] = useState<Array<string>>([]);
  const [tasks, setTasks] = useState<Array<string>>([]);
  const [times, setTimes] = useState<Array<string>>([]);
  const [invoices, setInvoices] = useState<Array<string>>([]);

  const updateProjects = useCallback(() => {
    getProjects().then((res) => setProjects(res.data));
  }, []);
  useEffect(updateProjects, []);

  const addProject = useCallback(
    (title: string, hrate: number, color: string) => {
      axios
        .post("http://localhost:3000/projects", {
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

  const removeProject = useCallback((id: number) => {
    axios.delete(`http://localhost:3000/projects/${id}`).then(() => {
      updateProjects();
    });
  }, []);

  const updateTasks = useCallback(() => {
    getTasks().then((response) => setTasks(response.data));
  }, []);
  useEffect(updateTasks, []);

  const addTask = useCallback((projectId: number, title: string) => {
    axios
      .post("http://localhost:3000/tasks", {
        projectId,
        title,
      })
      .then(() => {
        updateTasks();
      });
  }, []);

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
      projectId: number,
      task_title: string,
      start_date: string,
      start_time: string,
      end_date: string,
      end_time: string,
      total_time_seconds: number
    ) => {
      axios
        .post("http://localhost:3000/timelogs", {
          projectId,
          task_title,
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
      removeProject,
      tasks,
      addTask,
      removeTask,
      times,
      addTime,
      removeTime,
      invoices,
      addInvoice,
      removeInvoice,
    };
  }, [
    projects,
    addProject,
    removeProject,
    tasks,
    addTask,
    removeTask,
    times,
    addTime,
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
