// utils/checkInactiveUsers.js
import User from "../models/user.model.js"; // Import User model

const checkInactiveUsers = async (inactivityThresholdDays) => {
    const now = new Date();
    const thresholdDate = new Date(now - inactivityThresholdDays * 24 * 60 * 60 * 1000); // Calculate inactivity threshold

    try {
        // Find all inactive users based on lastActiveAt
        const inactiveUsers = await User.find({ lastActiveAt: { $lt: thresholdDate } });

        // Return an array of inactive users, even if it's empty
        return inactiveUsers || [];  // If no inactive users, return an empty array
    } catch (error) {
        console.error("❌ Error fetching inactive users:", error.message);
        return []; // Return an empty array in case of any error
    }
};

export default checkInactiveUsers;
