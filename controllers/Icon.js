const Icon = require('../models/IconSchema');

const addIcon = async (req, res) => {
    try {
        const { Titre, Texte, image } = req.body;    
        let photoPath = '';
        if (req.file) {
            photoPath = req.file.path;
        }
     const icon=await Icon.create({
        Titre, Texte, image :photoPath
     });

        res.status(201).json({ success: true, message: "Icône ajoutée avec succès", icon: icon });
    } catch (err) {
        res.status(500).json({ success: false, message: "Erreur lors de l'ajout de l'icône", error: err.message });
    }
};

const getIcon = async (req, res) => {
    try {
     
     const icon=await Icon.find();

        res.status(201).json({ success: true, message: "Icon retrieved successfully", icon: icon });
    } catch (err) {
        res.status(500).json({ msg: error });
    }
};
const updateicon = async (req, res) => {
    try {
        const IconID = req.params.id;
        const iconUpdate = req.body;

        if (!iconUpdate && !req.file) {
            return res.status(404).json({ success: false, message: "Icon not found" });
        }

        // If there's a file uploaded, add it to the update data
        if (req.file) {
            iconUpdate.image = req.file.path; // Assuming you want to store the file path
        }

        const updatedIcon = await Icon.findByIdAndUpdate(IconID, iconUpdate, { new: true, runValidators: true });

        if (!updatedIcon) {
            return res.status(404).json({ success: false, message: "Icon not found" });
        }

        res.status(200).json({ success: true, message: "Icon updated successfully", data: updatedIcon });
    } catch (error) {
        res.status(500).json({ msg: error.message }); // Ensure you send the error message
    }
};


module.exports = { addIcon,getIcon ,updateicon};
