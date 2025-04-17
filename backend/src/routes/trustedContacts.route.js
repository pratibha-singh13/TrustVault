import express from "express";
import { addTrustedContact, getTrustedContacts } from "../controllers/trustedContacts.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// @route   POST /api/trusted-contacts/add
// @desc    Add a new trusted contact
// @access  Private
router.post("/add", protectRoute, addTrustedContact);

// @route   GET /api/trusted-contacts
// @desc    Get all trusted contacts of the logged-in user
// @access  Private
router.get("/", protectRoute, getTrustedContacts);

export default router;
