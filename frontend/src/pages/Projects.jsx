import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: ""
  });

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
    fetchProjects();
  };

  return (
    <div className="container">
      <h2>Projects</h2>

      {user?.role === "admin" && (
        <form onSubmit={createProject}>
          <input
            placeholder="Project Name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Description"
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value
              })
            }
          />

          <button>Create Project</button>
        </form>
      )}

      {projects.map((project) => (
        <div className="card" key={project._id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Projects;