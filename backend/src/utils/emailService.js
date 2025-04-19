import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

export const sendInactivityEmail = async (to, fullName) => {
    const mailOptions = {
        from: `"TrustVault" <${process.env.SMTP_EMAIL}>`,
        to,
        subject: "Still there? We noticed you're inactive",
        html: `
      <h2>Hello ${fullName},</h2>
      <p>We've noticed you haven't been active on TrustVault.</p>
      <p>Please log in to confirm you're okay. Otherwise, your vault entries may be released to your trusted contacts after a set duration.</p>
      <p>Stay safe,<br>TrustVault Team</p>
    `,
    };

    await transporter.sendMail(mailOptions);
};
