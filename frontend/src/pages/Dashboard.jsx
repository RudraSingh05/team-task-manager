import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const [stats, setStats] = useState({});
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await API.get("/tasks/dashboard/stats");
    setStats(res.data);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="nav-bar">
        <span className="nav-logo">TASKR</span>
        <div className="nav-links">
          <Link to="/projects">Projects</Link>
          <Link to="/tasks">Tasks</Link>
          <button className="btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="container">
        <div className="dash-header">
          <div>
            <span className="section-label">Dashboard</span>
            <h1>Hey, {user?.name}</h1>
            <div className="user-role">{user?.role}</div>
          </div>
        </div>

        <div className="cards">
          <div className="card stat blue">
            <span className="stat-label">Total Tasks</span>
            <span className="stat-value">{stats.totalTasks ?? 0}</span>
          </div>
          <div className="card stat green">
            <span className="stat-label">Completed</span>
            <span className="stat-value">{stats.completed ?? 0}</span>
          </div>
          <div className="card stat amber">
            <span className="stat-label">Pending</span>
            <span className="stat-value">{stats.pending ?? 0}</span>
          </div>
          <div className="card stat red">
            <span className="stat-label">Overdue</span>
            <span className="stat-value">{stats.overdue ?? 0}</span>
          </div>
        </div>

        <hr className="divider" />

        <div className="dash-nav-links">
          <Link to="/projects">→ Projects</Link>
          <Link to="/tasks">→ Tasks</Link>
        </div>
      </div>
    </>
  );
}

export default Dashboard;