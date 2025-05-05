import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { updateSettings } from "../controllers/settings.controller.js";

const router = express.Router();

router.put("/", protectRoute, updateSettings);

export default router;