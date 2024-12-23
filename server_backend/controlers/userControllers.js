import asyncHandler from "express-async-handler";
import Users from "../models/users.model.js";
import Skill from "../models/skills.model.js";
import Project from "../models/projects.model.js";
import bcrypt from "bcrypt";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await Users.find()
    .populate("skills", "name") // Populate skills with their names
    .populate("experience.projectId", "name description"); // Populate project details
  res.status(200).json(allUsers);
});

const loginUser = asyncHandler(async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Email and Password are mandatory");
    }

    // Find user by email
    const user = await Users.findOne({ email }); // Add `await`

    if (user && (await bcryptjs.compare(password, user.password))) {
        // Generate token
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "18m" }
        );

        console.log("You are logged in successfully");
        res.status(200).json({ user });
    } else {
        res.status(401);
        throw new Error("Credentials are wrong");
    }
})

// Get user by ID
const userByID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await Users.findById(id)
    .populate("skills", "name") // Populate skills
    .populate("experience.projectId", "name description"); // Populate project details

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

// Register a new user
const registerNewUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, skills, experience } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error("Name, Email, Password and Role are required fields");
  }

  // Check if user already exists
  const userAvailable = await Users.findOne({ email });
  if (userAvailable) {
      console.log("User already exists");
      throw new Error("User already exists");
  }

  // Hash password
  const hashPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password", hashPassword);

  // Validate skills (check if they exist in Skill collection)
  if (skills) {
    const skillCheck = await Skill.find({ _id: { $in: skills } });
    if (skillCheck.length !== skills.length) {
      res.status(400);
      throw new Error("One or more skills provided are invalid");
    }
  }

  // Validate project IDs in experience
  if (experience) {
    for (const exp of experience) {
      const projectExists = await Project.findById(exp.projectId);
      if (!projectExists) {
        res.status(400);
        throw new Error(`Invalid project ID: ${exp.projectId}`);
      }
    }
  }

  const newUser = await Users.create({
    name,
    email,
    password: hashPassword,
    role,
    skills, // Array of skill IDs
    experience, // Array of experiences
  });

  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
    role: newUser.role,
    skills: newUser.skills,
    experience: newUser.experience,
  });
});

// Update an existing user
const updateLoggedInUser = asyncHandler(async (req, res) => {
  const { id } = req.params; // Assuming the logged-in user's ID is passed as a parameter
  const updates = req.body;

  // Validate updated skills
  if (updates.skills) {
    const skillCheck = await Skill.find({ _id: { $in: updates.skills } });
    if (skillCheck.length !== updates.skills.length) {
      res.status(400);
      throw new Error("One or more updated skills provided are invalid");
    }
  }

  // Validate updated projects in experience
  if (updates.experience) {
    for (const exp of updates.experience) {
      const projectExists = await Project.findById(exp.projectId);
      if (!projectExists) {
        res.status(400);
        throw new Error(`Invalid project ID: ${exp.projectId}`);
      }
    }
  }

  const updatedUser = await Users.findByIdAndUpdate(id, updates, {
    new: true, // Return the updated document
    runValidators: true, // Validate updated fields
  }).populate("skills", "name")
    .populate("experience.projectId", "name description");

  if (!updatedUser) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(updatedUser);
});

export { getAllUsers, userByID, registerNewUser, updateLoggedInUser, loginUser };