import express from "express"
import {getAllSkills, getSkillById, addNewSkill, updateExistingSkill} from "../controlers/skillsControllers.js"
const router = express.Router();

router.route("/").get(getAllSkills);
router.route("/:id").get(getSkillById);
router.route("/create").post(addNewSkill);
router.route("/update/:id").put(updateExistingSkill);

export default router;