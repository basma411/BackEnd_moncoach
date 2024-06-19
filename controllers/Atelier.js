const Atelier = require('../models/AtelierSchema');

const AddAtelier = async (req, res) => {
    try {
        const { num, titre, date, heure, statut } = req.body;
        let photoPath = "";

        if (req.file) {
            if (req.file.mimetype === "image/png" || req.file.mimetype === "image/jpeg") {
                photoPath = req.file.path;
            } else {
                return res.status(400).json({ message: 'Invalid file type. Only PNG and JPEG are allowed.' });
            }
        }

        const newAtelier = new Atelier({
            num,
            titre,
            date,
            heure,
            statut,
            photo: photoPath
        });

        await newAtelier.save();
        res.status(201).json({ newAtelier });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const GetAtelier = async (req, res) => {
    try {
        const ateliers = await Atelier.find();
        res.status(200).json({ msg: 'Ateliers retrieved successfully', ateliers: ateliers });
    } catch (error) {
        console.error("Error while retrieving ateliers:", error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

module.exports = { AddAtelier, GetAtelier };
