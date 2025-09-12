import {login,signup} from "../controllers/authControllers.js";

//taken validation from middlewares
import {validAuthentication} from "../middleware/ensureValidation.js";

//all routes are written here
import express from "express";
const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);

export default router;