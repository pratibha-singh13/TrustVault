// models/TrustedContact.js
import mongoose from 'mongoose';

const trustedContactSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    contact: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // optional, in case contact is a user
    },
    contactName: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
}, { timestamps: true });

export default mongoose.model('TrustedContact', trustedContactSchema);
