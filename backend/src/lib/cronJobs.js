import cron from "node-cron";
import checkInactiveUsers from "../utils/checkInactiveUsers.js";
import { sendInactivityEmail, sendVaultReleaseEmailToTrustedContacts, sendVaultReleaseNotificationToUser } from "../utils/emailService.js";
import Vault from "../models/vault.model.js";

const INACTIVITY_THRESHOLD_DAYS = 30; // Vault release threshold
const WARNING_INTERVALS = [7, 14, 21]; // Days for sending warnings

export const startInactivityCheck = () => {
    cron.schedule("0 0 * * *", async () => { // Runs every minute for testing
        try {
            console.log("Running inactivity check...");

            const { usersToNotify = [], usersToReleaseVaults = [] } = await checkInactiveUsers(INACTIVITY_THRESHOLD_DAYS, WARNING_INTERVALS);

            // Send warning emails
            if (Array.isArray(usersToNotify)) {
                for (const user of usersToNotify) {
                    await sendInactivityEmail(user.email, user.fullName);
                    user.warningCount += 1;
                    user.lastWarningSentAt = new Date();
                    await user.save();
                    console.log(`Sent warning email to ${user.email}`);
                }
            } else {
                console.error("usersToNotify is not an array.");
            }

            // Release vaults
            if (Array.isArray(usersToReleaseVaults)) {
                for (const user of usersToReleaseVaults) {
                    const vaults = await Vault.find({ user: user._id, isReleased: false, isPrivate: false });

                    if (vaults.length === 0) {
                        console.log(`No vaults to release for user: ${user.email}`);
                        continue;
                    }

                    for (const vault of vaults) {
                        await sendVaultReleaseEmailToTrustedContacts(vault, user);
                        vault.isReleased = true;
                        await vault.save();
                        console.log(`Released vault "${vault.title}" for user ${user.email}`);
                    }

                    // Notify the user about the vault release
                    await sendVaultReleaseNotificationToUser(user, vaults);
                    user.isVaultReleased = true;
                    await user.save();
                }
            } else {
                console.error("usersToReleaseVaults is not an array.");
            }
        } catch (error) {
            console.error("Error in inactivity check cron job:", error.message);
        }
    });

    console.log("Inactivity cron job started...");
};