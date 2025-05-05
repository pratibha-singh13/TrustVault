import nodemailer from "nodemailer";
import TrustedContact from "../models/trustedContacts.model.js";
import dotenv from "dotenv";
dotenv.config();
// Create a transporter using Brevo's SMTP settings

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
        subject: "Reminder: Your TrustVault Account is Inactive",
        text: `Hello ${fullName},\n\nWe noticed you haven't logged into TrustVault for a while. Please log in to confirm your activity. If you remain inactive, your vault entries will be released to your trusted contacts.\n\nLog in here: ${process.env.FRONTEND_URL}/login\n\nStay safe,\nTrustVault Team`,
        html: `
            <h2>Hello ${fullName},</h2>
            <p>We noticed you haven't logged into TrustVault for a while. Please log in to confirm your activity. If you remain inactive, your vault entries will be released to your trusted contacts.</p>
            <p><a href="${process.env.FRONTEND_URL}/login" style="color: blue;">Log in to TrustVault</a></p>
            <p>Stay safe,<br>TrustVault Team</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Sent inactivity warning to ${to}`);
    } catch (error) {
        console.error("Error sending inactivity email:", error.message);
    }
};

// Function to notify trusted contacts when a vault is released
export const sendVaultReleaseEmailToTrustedContacts = async (vault, user) => {
    const trustedContacts = await TrustedContact.find({ _id: { $in: vault.trustedContacts } });

    for (const contact of trustedContacts) {
        if (!contact.contactEmail || !contact.contactName) {
            console.error(`Invalid trusted contact: ${JSON.stringify(contact)}`);
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
            console.log(`Vault release notification sent to ${contact.contactEmail}`);
        } catch (error) {
            console.error(`Error sending vault release email to ${contact.contactEmail}:`, error);
        }
    }
};

export const sendVaultReleaseNotificationToUser = async (user, vaults) => {
    const mailOptions = {
        from: `"TrustVault" <${process.env.SMTP_EMAIL}>`,
        to: user.email,
        subject: "Your Vault Has Been Released",
        text: `Hello ${user.fullName},\n\nYour vault entries have been released to your trusted contacts due to prolonged inactivity. Below are the details of the released vaults:\n\n${vaults
            .map((vault) => `- ${vault.title}`)
            .join("\n")}\n\nIf you have any questions, please contact our support team.\n\nStay safe,\nTrustVault Team`,
        html: `
            <h2>Hello ${user.fullName},</h2>
            <p>Your vault entries have been released to your trusted contacts due to prolonged inactivity. Below are the details of the released vaults:</p>
            <ul>
                ${vaults.map((vault) => `<li>${vault.title}</li>`).join("")}
            </ul>
            <p>If you have any questions, please contact our support team.</p>
            <p>Stay safe,<br>TrustVault Team</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Sent vault release notification to ${user.email}`);
    } catch (error) {
        console.error(`Error sending vault release notification to ${user.email}:`, error.message);
    }
};