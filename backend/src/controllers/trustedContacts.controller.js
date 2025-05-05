import TrustedContact from "../models/trustedContacts.model.js";  // Use default import

// POST /api/trusted-contacts/add
export const addTrustedContact = async (req, res) => {
    const { contactName, contactEmail } = req.body;

    if (!contactName || !contactEmail) {
        return res.status(400).json({ message: "Please provide name and email." });
    }

    const contact = await TrustedContact.create({
        owner: req.user._id,  // Assuming you have access to the logged-in user
        contactName,
        contactEmail,
    });

    res.status(201).json(contact);
};

export const deleteTrustedContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const userId = req.user.id;

        const contact = await TrustedContact.findOneAndDelete({ _id: contactId, owner: userId });

        if (!contact) {
            return res.status(404).json({ message: "Trusted contact not found." });
        }

        res.status(200).json({ message: "Trusted contact deleted successfully." });
    } catch (error) {
        console.error("Error deleting trusted contact:", error.message);
        res.status(500).json({ message: "Failed to delete trusted contact." });
    }
};

// GET /api/trusted-contacts
export const getTrustedContacts = async (req, res) => {
    const contacts = await TrustedContact.find({ owner: req.user._id });  // Find contacts by owner (logged-in user)
    res.json(contacts);
};
