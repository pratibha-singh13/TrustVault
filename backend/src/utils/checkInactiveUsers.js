import User from "../models/user.model.js";
import { sendInactivityEmail, sendVaultReleaseEmailToTrustedContacts } from "./emailService.js"; // Import email functions

// This function checks for inactive users and returns the ones who need warnings or vault release notifications
const checkInactiveUsers = async (inactivityThresholdDays, warningThresholdDays) => {
    const now = new Date();
    const thresholdDate = new Date(now - inactivityThresholdDays * 24 * 60 * 60 * 1000); // Calculate inactivity threshold

    try {
        // Find all inactive users based on lastActiveAt
        const inactiveUsers = await User.find({ lastActiveAt: { $lt: thresholdDate } });

        const usersToNotify = [];

        for (const user of inactiveUsers) {
            const inactivityDuration = (now - new Date(user.lastActiveAt)) / (1000 * 60 * 60 * 24); // In days

            // If the user is inactive for more than the warning threshold, add them to the list to notify
            if (inactivityDuration >= warningThresholdDays) {
                usersToNotify.push({
                    email: user.email,
                    fullName: user.fullName,
                    daysInactive: inactivityDuration, // Track inactivity duration for release notifications
                    _id: user._id,
                });
            }
        }

        return usersToNotify;

    } catch (error) {
        console.error("❌ Error fetching inactive users:", error.message);
        return [];
    }
};

export default checkInactiveUsers;
