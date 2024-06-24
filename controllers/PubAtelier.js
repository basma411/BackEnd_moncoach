const PubAteliers = require('../models/PubAtelierSchema');

// Controller function to add a pub atelier
const addPubAtelier = async (req, res) => {
    try {
        const atelierId = req.params.id;

        const { titre, texte } = req.body;
        let photoPath = '';
        if (req.file) {
            photoPath = req.file.path;
        }
        const newPubAtelier = await PubAteliers.create({
            titre,
            texte,
            img:photoPath,
            ouner:atelierId
        });
        res.status(201).json({ success: true, message: "Publication d'atelier ajoutée avec succès", PubAtelier: newPubAtelier });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de l'ajout de la publication d'atelier", error: error.message });
    }
};

// Controller function to get all pub ateliers
const getPubAteliers = async (req, res) => {
    try {
                const atelierId = req.params.id;

        const pubAteliers = await PubAteliers.find();
        // const pubAteliers = await PubAteliers.find({ouner:atelierId});

        res.status(200).json({ success: true, message: "Publications d'ateliers récupérées avec succès", PubAteliers: pubAteliers });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la récupération des publications d'ateliers", error: error.message });
    }
};

// Controller function to update a pub atelier
const updatePubAtelier = async (req, res) => {
    try {
        const pubAtelierId = req.params.id;

        const updatedPubAtelier = req.body;
        let photoPath = '';
        if (req.file) {
            photoPath = req.file.path;
        }
        updatedPubAtelier.img=photoPath
        await PubAteliers.findByIdAndUpdate(pubAtelierId, updatedPubAtelier);
        res.status(200).json({ success: true, message: "Publication d'atelier mise à jour avec succès" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la mise à jour de la publication d'atelier", error: error.message });
    }
};

// Controller function to delete a pub atelier
const deletePubAtelier = async (req, res) => {
    try {
        const pubAtelierId = req.params.id;
        await PubAteliers.findByIdAndDelete(pubAtelierId);
        res.status(200).json({ success: true, message: "Publication d'atelier supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la suppression de la publication d'atelier", error: error.message });
    }
};

module.exports = { addPubAtelier, getPubAteliers, updatePubAtelier, deletePubAtelier };
