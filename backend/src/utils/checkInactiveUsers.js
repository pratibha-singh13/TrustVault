import User from "../models/user.model.js";
import { subDays, differenceInDays } from "date-fns"; // Use date-fns for better date handling

// This function checks for inactive users and returns the ones who need warnings or vault release notifications
const checkInactiveUsers = async (inactivityThresholdDays, warningThresholdDays) => {
    const now = new Date();
    const thresholdDate = subDays(now, inactivityThresholdDays); // Calculate inactivity threshold

    try {
        console.log(`🔍 Threshold Date: ${thresholdDate}`);

        // Find all inactive users based on lastActiveAt
        const inactiveUsers = await User.find({ lastActiveAt: { $lt: thresholdDate } });

        if (inactiveUsers.length === 0) {
            console.log("✅ No inactive users found.");
            return [];
        }

        console.log(`✅ Found ${inactiveUsers.length} inactive users. Emails: ${inactiveUsers.map(u => u.email).join(", ")}`);

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
                console.log(`📧 User ${user.email} has been inactive for ${inactivityDuration} days.`);
            }
        }

        console.log(`✅ ${usersToNotify.length} users need to be notified.`);
        return usersToNotify;

    } catch (error) {
        console.error("❌ Error fetching inactive users:", error);
        throw new Error("Error fetching inactive users: " + error.message);
    }
};

export default checkInactiveUsers;