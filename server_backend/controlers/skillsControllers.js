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
    res.status(200).json(`This is updating existing skill API`);
});

export {getAllSkills, getSkillById, addNewSkill, updateExistingSkill};