const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTasks = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "member") {
      query = { assignedTo: req.user.id };
    }

    const tasks = await Task.find(query)
      .populate("assignedTo", "name email")
      .populate("project", "name");

    res.json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    res.status(500).json(error);
  }
};

const dashboard = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === "member") {
      query = { assignedTo: req.user.id };
    }

    const tasks = await Task.find(query);

    const totalTasks = tasks.length;
    const completed = tasks.filter(
      (task) => task.status === "done"
    ).length;

    const pending = tasks.filter(
      (task) => task.status !== "done"
    ).length;

    const overdue = tasks.filter(
      (task) =>
        new Date(task.dueDate) < new Date() &&
        task.status !== "done"
    ).length;

    res.json({
      totalTasks,
      completed,
      pending,
      overdue
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  dashboard
};