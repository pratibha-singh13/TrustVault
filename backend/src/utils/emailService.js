import nodemailer from "nodemailer";
import TrustedContact from "../models/trustedContacts.model.js";
import dotenv from "dotenv";
dotenv.config();
// Create a transporter using Brevo's SMTP settings
console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_LOGIN:", process.env.SMTP_LOGIN);
console.log("SMTP_EMAIL:", process.env.SMTP_EMAIL);
console.log("SMTP_PASSWORD:", process.env.SMTP_PASSWORD);
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,  // Use port 587 for TLS
    secure: false,  // Use TLS
    auth: {
        user: process.env.SMTP_LOGIN,  // Use the SMTP email from the .env file
        pass: process.env.SMTP_PASSWORD,  // Use the SMTP password from the .env file
    },
});

// Function to send an inactivity warning email
export const sendInactivityEmail = async (to, fullName) => {
    const mailOptions = {
        from: `"TrustVault" <${process.env.SMTP_EMAIL}>`,
        to,
        subject: "Still there? We noticed you're inactive",
        text: `Hello ${fullName},\n\nWe've noticed you haven't been active on TrustVault.\nPlease log in to confirm you're okay. Otherwise, your vault entries may be released to your trusted contacts after a set duration.\n\nStay safe,\nTrustVault Team`,
        html: `
            <h2>Hello ${fullName},</h2>
            <p>We've noticed you haven't been active on TrustVault.</p>
            <p>Please log in to confirm you're okay. Otherwise, your vault entries may be released to your trusted contacts after a set duration.</p>
            <p>Stay safe,<br>TrustVault Team</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📧 Sent inactivity warning to ${to}`);
    } catch (error) {
        console.error("❌ Error sending inactivity email:", error);
    }
};

// Function to notify trusted contacts when a vault is released
export const sendVaultReleaseEmailToTrustedContacts = async (vault, user) => {
    const trustedContacts = await TrustedContact.find({ _id: { $in: vault.trustedContacts } });

    for (const contact of trustedContacts) {
        if (!contact.contactEmail || !contact.contactName) {
            console.error(`❌ Invalid trusted contact: ${JSON.stringify(contact)}`);
            continue;
        }

        const mailOptions = {
            from: `"TrustVault" <${process.env.SMTP_EMAIL}>`,
            to: contact.contactEmail,
            subject: `Vault Released: ${vault.title}`,
            text: `Hello ${contact.contactName},\n\nThe vault "${vault.title}" from ${user.fullName} has been released to you.\n\nStay safe,\nTrustVault Team`,
            html: `
                <h2>Hello ${contact.contactName},</h2>
                <p>The vault "<strong>${vault.title}</strong>" from ${user.fullName} has been released to you.</p>
                <p>Stay safe,<br>TrustVault Team</p>
            `,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`📧 Vault release notification sent to ${contact.contactEmail}`);
        } catch (error) {
            console.error(`❌ Error sending vault release email to ${contact.contactEmail}:`, error);
        }
    }
};