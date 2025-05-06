import cron from "node-cron";
import checkInactiveUsers from "../utils/checkInactiveUsers.js";
import { sendInactivityEmail, sendVaultReleaseEmailToTrustedContacts, sendVaultReleaseNotificationToUser } from "../utils/emailService.js";
import Vault from "../models/vault.model.js";

const INACTIVITY_THRESHOLD_DAYS = 30; // Vault release threshold
const WARNING_INTERVALS = [7, 14, 21]; // Days for sending warnings

export const startInactivityCheck = () => {
    cron.schedule("0 0 * * *", async () => { // Runs every day at midnight
        try {
            console.log("Running inactivity check...");

            // Fetch inactive users and users to release vaults
            const { usersToNotify = [], usersToReleaseVaults = [] } = await checkInactiveUsers(INACTIVITY_THRESHOLD_DAYS, WARNING_INTERVALS);

            // Handle users to notify
            if (Array.isArray(usersToNotify)) {
                for (const user of usersToNotify) {
                    try {
                        await sendInactivityEmail(user.email, user.fullName);
                        user.warningCount += 1;
                        user.lastWarningSentAt = new Date();
                        await user.save();
                        console.log(`Sent warning email to ${user.email}`);
                    } catch (error) {
                        console.error(`Failed to send warning email to ${user.email}:`, error.message);
                    }
                }
            } else {
                console.error("usersToNotify is not an array.");
            }

            // Handle users to release vaults
            if (Array.isArray(usersToReleaseVaults)) {
                for (const user of usersToReleaseVaults) {
                    try {
                        const vaults = await Vault.find({ user: user._id, isReleased: false, isPrivate: false });

                        if (vaults.length === 0) {
                            console.log(`No vaults to release for user: ${user.email}`);
                            continue;
                        }

                        for (const vault of vaults) {
                            try {
                                await sendVaultReleaseEmailToTrustedContacts(vault, user);
                                vault.isReleased = true;
                                await vault.save();
                                console.log(`Released vault "${vault.title}" for user ${user.email}`);
                            } catch (error) {
                                console.error(`Failed to release vault "${vault.title}" for user ${user.email}:`, error.message);
                            }
                        }

                        // Notify the user about the vault release
                        try {
                            await sendVaultReleaseNotificationToUser(user, vaults);
                            user.isVaultReleased = true;
                            await user.save();
                            console.log(`Notified user ${user.email} about vault release.`);
                        } catch (error) {
                            console.error(`Failed to notify user ${user.email} about vault release:`, error.message);
                        }
                    } catch (error) {
                        console.error(`Failed to process vault release for user ${user.email}:`, error.message);
                    }
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