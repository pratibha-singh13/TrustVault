import mongoose from 'mongoose';

const vaultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 100 // Limit the title length
    },
    content: {
        type: String, // Encrypted string
        required: true,
    },
    category: {
        type: String,
        enum: ['will', 'memories', 'credentials', 'notes', 'others'],
        default: 'others'
    },
    trustedContacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TrustedContact' // Reference to the other model
    }],
    isPrivate: {
        type: Boolean,
        default: false
    },
    releaseAfterDays: {
        type: Number,
        default: 30,
        min: 1 // Ensure positive values
    },
    isReleased: {
        type: Boolean,
        default: false // Tracks if the vault has been released
    },
    lastConfirmedAt: {
        type: Date,
        default: Date.now // Tracks the last confirmation date
    }
}, { timestamps: true });

// Add indexes for better query performance
vaultSchema.index({ user: 1 });
vaultSchema.index({ isPrivate: 1 });

export default mongoose.model('Vault', vaultSchema);