const Project = require("../models/Project");

const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { createdBy: req.user.id },
        { members: req.user.id }
      ]
    }).populate("members", "name email");

    res.json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addMember = async (req, res) => {
  try {
    const { userId } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: userId } },
      { new: true }
    );

    res.json(project);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createProject,
  getProjects,
  addMember
};