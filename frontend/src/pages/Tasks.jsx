import { useEffect, useState } from "react";
import API from "../api/axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  return (
    <div className="container">
      <h2>Tasks</h2>

      {tasks.map((task) => (
        <div className="card" key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>

          <select
            onChange={(e) =>
              updateStatus(task._id, e.target.value)
            }
          >
            <option>todo</option>
            <option>in-progress</option>
            <option>done</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default Tasks;