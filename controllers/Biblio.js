const Biblio = require('../models/BiblioSchema');

// Controller function to add a bibliography entry
const addBiblio = async (req, res) => {
    try {
        let photoPath = '';
        if (req.file) {
            photoPath = req.file.path;
        }
        const { image, texte,editeur, annee } = req.body;
        const newBiblio = await Biblio.create({
            image: photoPath,
            texte,
            editeur,
          
            annee
        });
        res.status(201).json({ success: true, message: "Bibliography entry added successfully", Biblio: newBiblio });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding bibliography entry", error: error.message });
    }
};

// Controller function to get all bibliography entries
const getBiblios = async (req, res) => {
    try {
        const biblios = await Biblio.find();
        res.status(200).json({ success: true, message: "Bibliography entries retrieved successfully", Biblios: biblios });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving bibliography entries", error: error.message });
    }
};

const updateBiblio = async (req, res) => {
    try {
        const biblioId = req.params.id;
        const updatedBiblio = { ...req.body };

        // Vérifie si une nouvelle photo a été téléchargée et met à jour le chemin du fichier
        if (req.file) {
            updatedBiblio.photo_c = req.file.path;
        }

        await Biblio.findByIdAndUpdate(biblioId, updatedBiblio);
        res.status(200).json({ success: true, message: "Bibliography entry updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating bibliography entry", error: error.message });
    }
};

module.exports = { addBiblio, getBiblios, updateBiblio };
