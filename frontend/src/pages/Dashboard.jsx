import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await API.get("/tasks/dashboard/stats");
    setStats(res.data);
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>

      <div className="cards">
        <div className="card">Total: {stats.totalTasks}</div>
        <div className="card">Completed: {stats.completed}</div>
        <div className="card">Pending: {stats.pending}</div>
        <div className="card">Overdue: {stats.overdue}</div>
      </div>

      <Link to="/projects">Projects</Link>
      <br />
      <Link to="/tasks">Tasks</Link>
    </div>
  );
}

export default Dashboard;