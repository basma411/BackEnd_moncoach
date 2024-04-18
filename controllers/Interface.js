const Interface = require('../models/InterfacheSchema');

// Controller function to add an interface document
const addInterface = async (req, res) => {
    try {
        let photoPath = '';
        if (req.file) {
            photoPath = req.file.path;
        }
        const { titre, texte, image, lien, page } = req.body;
        const newInterface = await Interface.create({
            titre,
            texte,
            image: photoPath,
            lien,
            page
        });
        res.status(201).json({ success: true, message: "Interface document added successfully", Interface: newInterface });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding interface document", error: error.message });
    }
};

// Controller function to get all interface documents
const getInterfaces = async (req, res) => {
    try {
        const interfaces = await Interface.find();
        res.status(200).json({ success: true, message: "Interfaces retrieved successfully", Interfaces: interfaces });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving interfaces", error: error.message });
    }
};

// Controller function to update an interface document
const updateInterface = async (req, res) => {
    try {
        const interfaceId = req.params.id;
        let photoPath = '';
        if (req.file) {
            photoPath = req.file.path;
        }
        const updatedInterface = req.body;
        if (photoPath) {
            updatedInterface.image = photoPath;
        }
        await Interface.findByIdAndUpdate(interfaceId, updatedInterface);
        res.status(200).json({ success: true, message: "Interface document updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating interface document", error: error.message });
    }
};

module.exports = { addInterface, getInterfaces, updateInterface };
