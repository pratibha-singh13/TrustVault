import Vault from "../models/vault.model.js";
import TrustedContact from "../models/trustedContacts.model.js";

export const getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch total assets (vault entries)
        const totalAssets = await Vault.countDocuments({ user: userId });

        // Fetch vault size (sum of all vault content lengths)
        const vaultSize = await Vault.aggregate([
            { $match: { user: userId } },
            { $group: { _id: null, totalSize: { $sum: { $strLenCP: "$content" } } } },
        ]);

        // Fetch trusted contacts count
        const trustedContacts = await TrustedContact.countDocuments({ owner: userId });

        res.status(200).json({
            totalAssets,
            vaultSize: vaultSize[0]?.totalSize || 0,
            trustedContacts,
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error.message);
        res.status(500).json({ message: "Failed to fetch dashboard data." });
    }
};