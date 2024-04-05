const Evenements  = require("../model/EvenementsSchema");
const { validationResult } = require("express-validator");
const AddEvenements = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({ error: errors.array() });
        } else { 
            const { Titre, Texte, Lien, Lieu, Date, Photo } = req.body;
            let photoPath = '';
            if (req.file) {
                photoPath = req.file.path;
            }
            const evenement = await Evenements.create({
                Titre,
                Texte,
                Lien,
                Lieu,
                Date,
                Photo: photoPath
            });
            res.status(200).json({ evenement });
        }
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
}

const GetEvenements =async(req,res)=>{
    try {
        const Evenement=await Evenements.find()
        res.status(200).json({msg:'Articls retrieved successfully ',Evenements:Evenement})


    } catch (error) {
            res.status(500).json({ msg: error });

    }
}
const PutEvenements = async (req, res) => {
    try {
        const EvenementId = req.params.id;
        const UpdateEvenement = req.body;
        
        // Vérifie si une nouvelle photo a été téléchargée et met à jour le chemin du fichier
        let photoPath = '';
        if (req.file) {
            photoPath = req.file.path;
            // Ajoute le chemin de la nouvelle photo à l'objet de mise à jour
            UpdateEvenement.Photo = photoPath;
        }

        console.log(UpdateEvenement);
        
        await Evenements.findByIdAndUpdate(EvenementId, UpdateEvenement);
        res.status(200).json({ message: 'Evenement updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { AddEvenements ,GetEvenements,PutEvenements};
