import express from 'express';
import { createVault, getVaultEntries } from '../controllers/vault.controller.js'; // Import getVaultEntries
import { protectRoute } from '../middleware/auth.middleware.js';
import { body } from 'express-validator';

const router = express.Router();
router.get("/", protectRoute, getVaultEntries);
router.post(
    '/',
    protectRoute,
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('content').notEmpty().withMessage('Content is required'),
    ],
    createVault
);

export default router;