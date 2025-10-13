import { validAuthentication } from "../middleware/ensureValidation.js";
import { getBookings, getSingle, listings } from "../controllers/authValidRoute.js"; 

import express from "express";
const router=express.Router();


router.get("/",validAuthentication,listings);
router.get("/:hotelId",getSingle);
router.get("/bookings/:userId",getBookings);


export default router;

