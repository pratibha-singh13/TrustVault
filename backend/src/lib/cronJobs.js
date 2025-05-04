import cron from "node-cron";
import checkInactiveUsers from "../utils/checkInactiveUsers.js"; // Import the function
import { sendInactivityEmail, sendVaultReleaseEmailToTrustedContacts } from "../utils/emailService.js"; // Import email functions
import Vault from "../models/vault.model.js"; // Import the Vault model
import TrustedContact from "../models/trustedContacts.model.js"; // Import the TrustedContact model

console.log("🔍 TrustedContact model loaded:", TrustedContact); // Debug log

// Set the inactivity threshold (in days)
const INACTIVITY_THRESHOLD_DAYS = 30; // Default inactivity threshold
const WARNING_THRESHOLD_DAYS = 7; // Default warning threshold

export const startInactivityCheck = () => {
    cron.schedule("* * * * *", async () => { // Runs every minute for testing
        try {
            console.log("🔄 Running inactivity check...");

            // Fetch inactive users
            const inactiveUsers = await checkInactiveUsers(INACTIVITY_THRESHOLD_DAYS, WARNING_THRESHOLD_DAYS);

            if (!Array.isArray(inactiveUsers) || inactiveUsers.length === 0) {
                console.log("✅ No inactive users found.");
                return;
            }

            for (const user of inactiveUsers) {
                // Send inactivity warning email
                if (user.daysInactive <= WARNING_THRESHOLD_DAYS) {
                    await sendInactivityEmail(user.email, user.fullName);
                    console.log(`📧 Sent inactivity warning to ${user.email}`);
                }

                // Release vaults if the user exceeds the warning threshold
                if (user.daysInactive > WARNING_THRESHOLD_DAYS) {
                    const vaults = await Vault.find({ user: user._id, isReleased: false, isPrivate: false });

                    if (vaults.length === 0) {
                        console.log(`⚠️ No vaults to release for user: ${user.email}`);
                        continue;
                    }

                    for (const vault of vaults) {
                        if (!vault.trustedContacts || vault.trustedContacts.length === 0) {
                            console.log(`⚠️ Vault "${vault.title}" has no trusted contacts.`);
                            continue;
                        }

                        // Fetch trusted contact details
                        const trustedContacts = await TrustedContact.find({ _id: { $in: vault.trustedContacts } });
                        console.log(`🔍 Trusted Contacts for Vault "${vault.title}":`, trustedContacts);

                        if (trustedContacts.length === 0) {
                            console.log(`⚠️ No valid trusted contacts found for vault "${vault.title}".`);
                            continue;
                        }

                        // Send release emails to trusted contacts
                        await sendVaultReleaseEmailToTrustedContacts(vault, user);
                        vault.isReleased = true; // Mark the vault as released
                        await vault.save();
                        console.log(`📧 Sent vault release notification for vault "${vault.title}" to trusted contacts.`);
                    }
                }
            }
        } catch (error) {
            console.error("❌ Error in inactivity check cron job:", error.message);
        }
    });

    console.log("⏳ Inactivity cron job started...");
};