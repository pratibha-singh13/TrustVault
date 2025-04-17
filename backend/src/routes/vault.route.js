import express from 'express';
import { createVault } from '../controllers/vault.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protectRoute, createVault);

export default router;
