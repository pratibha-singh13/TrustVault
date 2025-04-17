import Vault from '../models/vault.model.js';
import { encryptContent } from '../utils/encryption.js';

export const createVault = async (req, res) => {
    try {
        const { title, content, category, trustedContacts, isPrivate, releaseAfterDays } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required.' });
        }

        const encrypted = encryptContent(content);

        const newVault = await Vault.create({
            user: req.user._id, // from auth middleware
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
