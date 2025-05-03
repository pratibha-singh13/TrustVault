import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profilePic: {
            type: String,
            default: "",
        },
        lastActiveAt: {
            type: Date,
            default: Date.now, // Tracks the last activity date
        },
        inactivityThresholdDays: {
            type: Number,
            default: 30, // Default inactivity threshold if the user doesn't set one
            min: 1,
        },
        warningCount: {
            type: Number,
            default: 0, // Tracks the number of warnings sent
        },
        isVaultReleased: {
            type: Boolean,
            default: false, // Tracks if the user's vaults have been released
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;