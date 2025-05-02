import express from "express";
import { addTrustedContact, getTrustedContacts } from "../controllers/trustedContacts.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { body } from "express-validator";

const router = express.Router();

// @route   POST /api/trusted-contacts/add
// @desc    Add a new trusted contact
// @access  Private
router.post(
    "/add",
    [
        body("email").isEmail().withMessage("Invalid email address"),
        body("name").notEmpty().withMessage("Name is required"),
    ],
    protectRoute,
    addTrustedContact
);

// @route   GET /api/trusted-contacts
// @desc    Get all trusted contacts of the logged-in user
// @access  Private
router.get("/", protectRoute, getTrustedContacts);

export default router;