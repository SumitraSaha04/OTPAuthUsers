import {  deleteHotel } from "../controllers/authValidRoute.js";
import express from "express";
import { validAuthentication } from "../middleware/ensureValidation.js";
import { verifyAdmin } from "../middleware/authAdmin.js";
const router=express.Router();


router.delete("/:deleteHotelid",validAuthentication,verifyAdmin,deleteHotel);


export default router;