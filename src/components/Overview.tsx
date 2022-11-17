import { Outlet } from "react-router-dom";
import OverviewNav from "./OverviewNav";

const Overview = () => {
  return (
    <div className="overview">
      <h1>Overview</h1>
      <OverviewNav />
      <Outlet />
    </div>
  );
};

export default Overview;
