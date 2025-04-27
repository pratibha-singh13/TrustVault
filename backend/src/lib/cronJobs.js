import cron from "node-cron";
import checkInactiveUsers from "../utils/checkInactiveUsers.js"; // Import the function
import { sendInactivityEmail, sendVaultReleaseEmailToTrustedContacts } from "../utils/emailService.js"; // Import the new function

// Set the inactivity threshold (in days)
const INACTIVITY_THRESHOLD_DAYS = 7;
const WARNING_THRESHOLD_DAYS = 5;  // Example: send warning if inactive for more than 5 days

export const startInactivityCheck = () => {
    // ⏱ Runs every minute — for testing only, you can change it to a daily run later
    cron.schedule("* * * * *", async () => {
        try {
            // Call the checkInactiveUsers function to handle the inactivity check
            const inactiveUsers = await checkInactiveUsers(INACTIVITY_THRESHOLD_DAYS, WARNING_THRESHOLD_DAYS);

            // Check if inactiveUsers is an array before accessing length
            if (!Array.isArray(inactiveUsers)) {
                console.error("❌ checkInactiveUsers did not return an array.");
                return;
            }

            if (inactiveUsers.length === 0) {
                console.log("✅ No inactive users found.");
                return;
            }

            // Send inactivity warning emails to each inactive user
            for (const user of inactiveUsers) {
                // Send warning email
                await sendInactivityEmail(user.email, user.fullName);
                console.log(`📧 Sent inactivity warning to ${user.email}`);

                // Send vault release email to trusted contacts if the user is beyond the warning threshold
                if (user.daysInactive > WARNING_THRESHOLD_DAYS) {
                    await sendVaultReleaseEmailToTrustedContacts(user);
                    console.log(`📧 Sent vault release notification to trusted contacts of ${user.email}`);
                }
            }
        } catch (error) {
            console.error("❌ Error in inactivity check cron job:", error.message);
        }
    });

    console.log("⏳ Inactivity cron job started...");
};
