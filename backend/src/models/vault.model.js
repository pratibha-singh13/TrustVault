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
    },
    content: {
        type: String, // encrypted string
        required: true,
    },
    category: {
        type: String,
        enum: ['will', 'memories', 'credentials', 'notes', 'others'],
        default: 'others'
    },
    trustedContacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isPrivate: {
        type: Boolean,
        default: false
    },
    releaseAfterDays: {
        type: Number,
        default: 30
    },
    isReleased: {
        type: Boolean,
        default: false
    },
    lastConfirmedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export default mongoose.model('Vault', vaultSchema);
