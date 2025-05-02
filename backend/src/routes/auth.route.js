import express from "express";
import { checkAuth, login, logout, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
    "/signup",
    [
        body("email").isEmail().withMessage("Invalid email address"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    ],
    signup
);

router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Invalid email address"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    login
);

router.post("/logout", logout);

router.get("/check", protectRoute, checkAuth);

export default router;