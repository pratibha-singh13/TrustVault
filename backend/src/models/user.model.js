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
            default: Date.now,
        },
        inactivityDurationDays: {
            type: Number,
            default: 30, // Set default inactivity threshold to 30 days
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
