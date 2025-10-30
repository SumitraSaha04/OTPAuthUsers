import {login,logout,signup,verifyme} from "../controllers/authControllers.js";

//taken validation from middlewares
import {validAuthentication} from "../middleware/ensureValidation.js";

//all routes are written here
import express from "express";
const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.get("/me",verifyme);
export default router;