import Vault from '../models/vault.model.js';
import TrustedContact from '../models/trustedContacts.model.js';
import { encryptContent } from '../utils/encryption.js';

export const createVault = async (req, res) => {
    try {
        const { title, content, category, trustedContacts, isPrivate, releaseAfterDays } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required.' });
        }

        // Validate that all trusted contact IDs belong to the logged-in user (owner)
        const validContacts = await TrustedContact.find({
            _id: { $in: trustedContacts },
            owner: req.user._id
        });

        if (validContacts.length !== trustedContacts.length) {
            return res.status(400).json({ message: 'One or more trusted contacts are invalid or do not belong to you.' });
        }

        const encrypted = encryptContent(content);

        const newVault = await Vault.create({
            user: req.user._id,
            title,
            content: encrypted,
            category,
            trustedContacts,
            isPrivate,
            releaseAfterDays,
            lastConfirmedAt: new Date()
        });

        res.status(201).json({ message: 'Vault created successfully!', vault: newVault });
    } catch (error) {
        console.error('Vault creation error:', error);
        res.status(500).json({ message: 'Something went wrong.' });
    }
};
//6803c23627ed18eea17fbb5c
//6803c29027ed18eea17fbb60