import { validAuthentication } from "../middleware/ensureValidation.js";
import { game } from "../controllers/authValidRoute.js"; 

import express from "express";
const router=express.Router();


router.get("/game",validAuthentication,game);

export default router;

