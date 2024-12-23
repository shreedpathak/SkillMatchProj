import asyncHandler from  "express-async-handler"
import Skills from "../models/skills.model.js"

const getAllSkills = asyncHandler(async (req,res) => {
    const allSkills = await Skills.find(); 
    res.status(200).json(allSkills);
});


const getSkillById = asyncHandler(async (req,res) => {
    const skill = await Skills.findById(req.params.id);
    if (!skill) {
        res.status(404);
        throw new Error("Skill not found");
    }
    res.status(200).json(skill);
});


const addNewSkill = asyncHandler(async (req,res) => {
    const {name, category, popularity} = req.body;
    const newSkill = await Skills.create({
        name, category, popularity
    });
    res.status(200).json(newSkill);
});


const updateExistingSkill = asyncHandler(async (req, res)=>{
    const { id } = req.params;

    const skill = await Skills.findById(id);
    if (!skill) {
        res.status(404);
        throw new Error("Skill not found");
    }
    
    const updatedSkill = await Skills.findByIdAndUpdate(
        id,
        req.body,
        { new: true } // Return the updated document
    );

    res.status(200).json(updatedSkill);
});


const deleteExistingSkill = asyncHandler(async (req, res)=>{
    const { id } = req.params;

    const skill = await Skills.findById(id);
    if (!skill) {   
        res.status(404);
        throw new Error("Skill not found");
    }

    await Skills.findByIdAndDelete(id);
    res.status(200).json(updatedSkill);
});

export {getAllSkills, getSkillById, addNewSkill, updateExistingSkill, deleteExistingSkill};