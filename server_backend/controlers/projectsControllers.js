import asyncHandler from "express-async-handler";
import Projects from "../models/projects.model.js";

// Get all projects
const getAllProjects = asyncHandler(async (req, res) => {
  const allProjects = await Projects.find().populate("requiredSkills", "name").populate("team", "name");
  res.status(200).json(allProjects);
});

// Get project by ID
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Projects.findById(req.params.id).populate("requiredSkills", "name").populate("team", "name");
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }
  res.status(200).json(project); // Corrected variable name
});

// Add new project
const addNewProject = asyncHandler(async (req, res) => {
  const { name, description, requiredSkills, teams, status, createdBy } = req.body;

  if (!name || !status) {
    res.status(400);
    throw new Error("Name and status are required fields");
  }

  const newProject = await Projects.create({
    name,
    description,
    requiredSkills,
    teams,
    status,
    createdBy,
  });

  res.status(201).json(newProject);
});

// Update existing project
const updateExistingProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const project = await Projects.findById(id).populate("requiredSkills", "name").populate("team", "name");

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  const updatedProject = await Projects.findByIdAndUpdate(id, req.body, {
    new: true, // Return the updated document
  });

  res.status(200).json(updatedProject); // Corrected variable name
});

// Delete existing project
const deleteExistingProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const project = await Projects.findById(id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  await project.remove(); // Use instance method remove
  res.status(200).json({ message: `Project ${id} deleted successfully` });
});

export {
  getAllProjects,
  getProjectById,
  addNewProject,
  updateExistingProject,
  deleteExistingProject,
};
