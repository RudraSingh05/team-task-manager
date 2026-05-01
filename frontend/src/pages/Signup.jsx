import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const { user } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  const createProject = async (e) => {
    e.preventDefault();
    await API.post("/projects", form);
    setForm({ name: "", description: "" });
    fetchProjects();
  };

  return (
    <div className="container">
      <span className="section-label">Workspace</span>
      <h2>Projects</h2>

      {user?.role === "admin" && (
        <div className="form-card" style={{ marginTop: "24px" }}>
          <h3 style={{ marginBottom: "16px", color: "var(--text-muted)" }}>
            New Project
          </h3>
          <form onSubmit={createProject}>
            <div className="form-row">
              <input
                placeholder="Project name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            <button type="submit" style={{ alignSelf: "flex-start" }}>
              + Create Project
            </button>
          </form>
        </div>
      )}

      <hr className="divider" />

      {projects.length === 0 ? (
        <div className="empty">No projects yet.</div>
      ) : (
        <div className="card-list">
          {projects.map((project) => (
            <div className="card item" key={project._id}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="meta">
                <span
                  className="tag"
                  style={{
                    background: "var(--accent-dim)",
                    color: "var(--accent)",
                    border: "1px solid rgba(0,229,255,0.15)",
                  }}
                >
                  {project.members?.length ?? 0} members
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;