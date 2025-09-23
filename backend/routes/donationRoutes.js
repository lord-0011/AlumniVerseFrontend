import express from "express";
import { addDonation, getDonations } from "../controllers/donationController.js";
import { protect } from "../middleware/authmiddleware.js"; // ✅ only once

const router = express.Router();

router.post("/", protect, addDonation);
router.get("/", protect, getDonations);

export default router;
