import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import vaultRoutes from './routes/vault.route.js';
import trustedContactsRoute from './routes/trustedContacts.route.js';
import { startInactivityCheck } from "./lib/cronJobs.js"; // 👈 added

dotenv.config();
const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/vaults', vaultRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/trusted-contacts', trustedContactsRoute);

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');

    // Start Inactivity Checker when server starts
    startInactivityCheck(); // 👈 added here
});
