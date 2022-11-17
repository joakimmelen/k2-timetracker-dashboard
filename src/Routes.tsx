import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import InnerContent from "./components/InnerContent";
import Login from "./components/Login";
import Overview from "./components/Overview";
import Projects from "./components/Projects";
import Timer from "./components/timer/Timer";
import Tasks from "./components/Tasks";

import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";

const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<ProtectedRoutes />}>
      <Route path="/" element={<InnerContent />}>
        <Route path="/" element={<Navigate replace to="dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/overview" element={<Overview />}>
          <Route
            path="/overview"
            element={<Navigate replace to="projects" />}
          />
          <Route path="projects" element={<Projects />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
        <Route path="/timer" element={<Timer />} />
      </Route>
    </Route>

    <Route path="login" element={<PublicRoutes />}>
      <Route path="/login" element={<Login />} />
    </Route>
  </Routes>
);

export default MainRoutes;
