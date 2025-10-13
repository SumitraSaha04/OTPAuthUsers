import { newlist } from "../controllers/authNewlist.js";

import { validAuthentication } from "../middleware/ensureValidation.js";
import express from "express";
import { order } from "../controllers/authPayment.js";
import { booking } from "../controllers/authValidRoute.js";
import { verifyAdmin } from "../middleware/authAdmin.js";
const router=express.Router();

router.post("/newlist",validAuthentication,verifyAdmin,newlist);
router.post("/create-order",order);
router.post("/bookings/:userId",booking);

export default  router;


