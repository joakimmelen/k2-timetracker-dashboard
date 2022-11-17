import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { TimeTrackerProvider } from "./context/TimeTrackerContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <TimeTrackerProvider>
        <App />
      </TimeTrackerProvider>
    </BrowserRouter>
  </React.StrictMode>
);
