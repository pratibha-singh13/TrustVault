import User from "../models/user.model.js";
import { subDays, differenceInDays } from "date-fns";

const checkInactiveUsers = async (inactivityThresholdDays, warningIntervals) => {
    const now = new Date();
    const thresholdDate = subDays(now, inactivityThresholdDays);

    try {
        console.log(`Threshold Date: ${thresholdDate}`);

        // Find all inactive users
        const inactiveUsers = await User.find({ lastActiveAt: { $lt: thresholdDate } });

        if (inactiveUsers.length === 0) {
            console.log("No inactive users found.");
            return { usersToNotify: [], usersToReleaseVaults: [] }; // Ensure arrays are returned
        }

        console.log(`Found ${inactiveUsers.length} inactive users. Emails: ${inactiveUsers.map(u => u.email).join(", ")}`);

        const usersToNotify = [];
        const usersToReleaseVaults = [];

        for (const user of inactiveUsers) {
            const inactivityDuration = differenceInDays(now, new Date(user.lastActiveAt));

            // Check if the user needs a warning email
            if (user.warningCount < warningIntervals.length) {
                const nextWarningThreshold = warningIntervals[user.warningCount];
                if (inactivityDuration >= nextWarningThreshold) {
                    usersToNotify.push(user);
                }
            }

            // Check if the vault needs to be released
            if (inactivityDuration >= inactivityThresholdDays) {
                usersToReleaseVaults.push(user);
            }
        }

        return { usersToNotify, usersToReleaseVaults }; // Ensure arrays are returned
    } catch (error) {
        console.error("Error fetching inactive users:", error);
        throw new Error("Error fetching inactive users: " + error.message);
    }
};
export default checkInactiveUsers;