import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getDashboardData } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/", protectRoute, getDashboardData);

export default router;