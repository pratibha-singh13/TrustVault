import User from "../models/user.model.js";
import { subDays, differenceInDays } from "date-fns"; // Use date-fns for better date handling
import { sendInactivityEmail, sendVaultReleaseEmailToTrustedContacts } from "./emailService.js"; // Import email functions

// This function checks for inactive users and returns the ones who need warnings or vault release notifications
const checkInactiveUsers = async (inactivityThresholdDays, warningThresholdDays) => {
    const now = new Date();
    const thresholdDate = subDays(now, inactivityThresholdDays); // Calculate inactivity threshold

    try {
        // Find all inactive users based on lastActiveAt
        const inactiveUsers = await User.find({ lastActiveAt: { $lt: thresholdDate } });

        console.log(`✅ Found ${inactiveUsers.length} inactive users.`);

        const usersToNotify = [];

        for (const user of inactiveUsers) {
            const inactivityDuration = differenceInDays(now, new Date(user.lastActiveAt)); // In days

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

        console.log(`✅ ${usersToNotify.length} users need to be notified.`);
        return usersToNotify;

    } catch (error) {
        console.error("❌ Error fetching inactive users:", error);
        return [];
    }
};

export default checkInactiveUsers;