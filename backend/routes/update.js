import { cancelBooking, makeAdmins ,update} from "../controllers/authValidRoute.js";
import express from "express";
const router=express.Router();

router.put("/bookings/:bookingId",cancelBooking);
router.put("/makeAdmin/:userId",makeAdmins);
router.patch("/:hotelId",update);

export default router;