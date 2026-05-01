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
    const tasks = await Task.find()
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
    const tasks = await Task.find();

    const totalTasks = tasks.length;
    const completed = tasks.filter(t => t.status === "done").length;
    const pending = tasks.filter(t => t.status !== "done").length;
    const overdue = tasks.filter(
      t => new Date(t.dueDate) < new Date() && t.status !== "done"
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