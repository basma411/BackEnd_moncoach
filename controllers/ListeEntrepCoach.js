const Atelier2=require('../models/ListeSchema')

const AddList = async (req, res) => {
    try {
        const atelierId = req.params.id;

        const { nom, prenom, tel, mail, entreprise, poste, proposition } = req.body;

        if (!nom || !prenom || !tel || !mail || !entreprise || !poste || !proposition) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const ListeEntreCoach = await Atelier2.create({
            nom,
            prenom,
            tel,
            mail,
            entreprise,
            poste,
            proposition,
            ouner:atelierId
        });

        res.status(200).json({ ListeEntreCoach });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getList = async (req, res) => {
    const ListId = req.params.id;
    const { entreprise } = req.query; 
  
    try {
      const Lists = await Atelier2.find({ ouner: ListId, entreprise });
      res.status(200).json({ Lists });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const DeleteAtelier = async (req, res) => {
    try {
        const AtelierId = req.params.id;
        const atelier = await Atelier2.findByIdAndDelete(AtelierId);

        if (!atelier) {
            return res.status(404).json({ msg: 'Atelier not found' });
        }

        res.status(200).json({ msg: 'Atelier deleted successfully' });
    } catch (error) {
        console.error("Error while deleting atelier:", error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};
module.exports = { AddList,getList,DeleteAtelier };
