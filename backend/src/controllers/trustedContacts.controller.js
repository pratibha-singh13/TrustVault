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

// GET /api/trusted-contacts
export const getTrustedContacts = async (req, res) => {
    const contacts = await TrustedContact.find({ owner: req.user._id });  // Find contacts by owner (logged-in user)
    res.json(contacts);
};
