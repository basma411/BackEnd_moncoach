const Partenaires=require('../model/PartenaireSchema')
const AddPartenaire = async (req, res) => {
    try {
        const { Statut, Nom, } = req.body;
        let photoPath = '';
        if (req.file) {
            photoPath = req.file.path;
        }

        const Partenaire = await Partenaires.create({
            Statut, Nom,  Photo: photoPath
        });

        res.status(200).json({ Partenaire });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getPartenaires = async (req, res) => {
    try {
        const partenaires = await Partenaires.find();
        res.status(200).json({ partenaires });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const deletePartenaire = async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedPartenaire = await Partenaires.findByIdAndDelete(id);
        
        if (!deletedPartenaire) {
            return res.status(404).json({ message: "Partenaire not found" });
        }

        res.status(200).json({ message: "Partenaire deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = { AddPartenaire,getPartenaires,deletePartenaire };
