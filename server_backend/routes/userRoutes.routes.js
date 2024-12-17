import express from "express"
import  {getAllContacts, getContactById, addNewContact, updateContact} from "../controlers/userControllers.js"
const router = express.Router();

router.route("/login").get(getAllContacts);
router.route("/login/:id").get(getContactById);
router.route("/login/createContact").post(addNewContact);
router.route("/login/updateContact").put(updateContact);

export default router;