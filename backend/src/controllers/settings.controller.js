import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const updateSettings = async (req, res) => {
    try {
        const userId = req.user.id;
        const { email, password } = req.body;

        const updates = {};
        if (email) updates.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        res.status(200).json({
            message: "Settings updated successfully.",
            user: {
                email: updatedUser.email,
                fullName: updatedUser.fullName,
            },
        });
    } catch (error) {
        console.error("Error updating settings:", error.message);
        res.status(500).json({ message: "Failed to update settings." });
    }
};