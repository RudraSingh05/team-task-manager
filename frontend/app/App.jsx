import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"

import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import Dashboard from "../src/pages/Dashboard";
import Projects from "../src/pages/Projects";
import Tasks from "../src/pages/Tasks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;