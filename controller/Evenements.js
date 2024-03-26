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
module.exports = { AddEvenements ,GetEvenements};
