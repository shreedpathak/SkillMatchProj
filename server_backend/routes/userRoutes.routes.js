import express from "express"
import { getAllUsers, userByID, registerNewUser, updateLoggedInUser, loginUser } from "../controlers/userControllers.js"
const router = express.Router();

router.route("/admin").get(getAllUsers);
router.route("/register").post(registerNewUser);
router.route("/login").get(loginUser);
router.route("/login/:id").get(userByID);
router.route("/login/updateContact").put(updateLoggedInUser);

export default router;