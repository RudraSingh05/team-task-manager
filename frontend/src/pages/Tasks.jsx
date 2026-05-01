import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const STATUS_CLASS = {
  todo: "status-todo",
  "in-progress": "status-in-progress",
  done: "status-done",
};

// Only statuses that come after the current one
const NEXT_STATUSES = {
  todo:          [{ value: "in-progress", label: "In Progress" }],
  "in-progress": [{ value: "done",        label: "Done"        }],
  done:          [], // no further moves
};

function Tasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    project: "",
    assignedTo: "",
    dueDate: "",
  });

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, []);

  const fetchTasks    = async () => { const r = await API.get("/tasks");    setTasks(r.data); };
  const fetchProjects = async () => { const r = await API.get("/projects"); setProjects(r.data); };
  const fetchUsers    = async () => { const r = await API.get("/users");    setUsers(r.data); };

  const createTask = async (e) => {
    e.preventDefault();
    await API.post("/tasks", form);
    setForm({ title: "", description: "", project: "", assignedTo: "", dueDate: "" });
    fetchTasks();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  return (
    <div className="container">
      <span className="section-label">Board</span>
      <h2>Tasks</h2>

      {user?.role === "admin" && (
        <div className="form-card" style={{ marginTop: "24px" }}>
          <h3 style={{ marginBottom: "16px", color: "var(--text-muted)" }}>
            New Task
          </h3>
          <form onSubmit={createTask}>
            <div className="form-row">
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <input
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="form-row">
              <select
                value={form.project}
                onChange={(e) => setForm({ ...form, project: e.target.value })}
              >
                <option value="">Select Project</option>
                {projects.map((p) => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </select>
              <select
                value={form.assignedTo}
                onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
              >
                <option value="">Assign User</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>{u.name}</option>
                ))}
              </select>
            </div>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              style={{ maxWidth: "220px" }}
            />
            <button type="submit" style={{ alignSelf: "flex-start" }}>
              + Create Task
            </button>
          </form>
        </div>
      )}

      <hr className="divider" />

      {tasks.length === 0 ? (
        <div className="empty">No tasks yet.</div>
      ) : (
        <div className="card-list">
          {tasks.map((task) => (
            <div className="card item" key={task._id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <h3>{task.title}</h3>
                <span className={`tag ${STATUS_CLASS[task.status] ?? "status-todo"}`}>
                  {task.status}
                </span>
              </div>
              {task.description && <p>{task.description}</p>}
              <div className="meta">
                {task.project?.name && (
                  <span
                    className="tag"
                    style={{
                      background: "var(--accent-dim)",
                      color: "var(--accent)",
                      border: "1px solid rgba(0,229,255,0.15)",
                    }}
                  >
                    {task.project.name}
                  </span>
                )}
                {task.assignedTo?.name && (
                  <span className="tag status-todo">
                    @{task.assignedTo.name}
                  </span>
                )}
              </div>
              <div className="card-footer">
                <span style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>
                  {task.dueDate
                    ? `Due: ${new Date(task.dueDate).toLocaleDateString()}`
                    : "No due date"}
                </span>
                {NEXT_STATUSES[task.status]?.length > 0 ? (
                  <select
                    value=""
                    onChange={(e) => updateStatus(task._id, e.target.value)}
                  >
                    <option value="" disabled>
                      Move to...
                    </option>
                    {NEXT_STATUSES[task.status].map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span
                    className="tag status-done"
                    style={{ cursor: "default" }}
                  >
                    ✓ Complete
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tasks;