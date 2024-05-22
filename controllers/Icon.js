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
        const IconUpdate = req.body;
        await Icon.findByIdAndUpdate(IconID, IconUpdate);

        res.status(201).json({ success: true, message: "Icon updated successfully" }); // Correction du message
    } catch (error) { // Utilisation de 'error' au lieu de 'err'
        res.status(500).json({ msg: error }); // Utilisation de 'error' au lieu de 'err'
    }
};

module.exports = { addIcon,getIcon ,updateicon};
