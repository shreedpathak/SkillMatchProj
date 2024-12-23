import express from "express"
import  { getAllProjects,getProjectById, addNewProject, updateExistingProject,deleteExistingProject} from "../controlers/projectsControllers.js"
const router = express.Router();

router.route("/").get(getAllProjects);
router.route("/:id").get(getProjectById);
router.route("/create").post(addNewProject);
router.route("/update/:id").put(updateExistingProject);
router.route("/delete/:id").delete(deleteExistingProject);

export default router;