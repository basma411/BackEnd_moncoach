const Contacts = require('../models/ContactSchema');
const AddContact = async (req, res) => {
    try {
        // Récupérer les données du corps de la requête
        const { Nom_Prénom, Téléphone, Email, Message } = req.body;

   console.log(Nom_Prénom, Téléphone, Email, Message)

        // Sauvegarder le nouveau contact dans la base de données
        const savedContact =await Contacts.create({
            Nom_Prénom, Téléphone,  Email,Message
        });

        res.status(201).json({ success: true, message: "Contact ajouté avec succès", contact: savedContact });
    } catch (err) {
        res.status(500).json({ success: false, message: "Erreur lors de l'ajout du contact", error: err.message });
    }
}
const GetContact=async(rq,res)=>{
    try {
        const Contact=await Contacts.find()
        res.status(200).json({msg:'Contacts retrieved successfully ',Contacts:Contact})


    } catch (error) {
            res.status(500).json({ msg: error });

    }
}
const deleteContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const deletedContact = await Contacts.findByIdAndDelete(contactId);
        
        if (!deletedContact) {
            return res.status(404).json({ success: false, message: "Contact introuvable" });
        }
        
        res.json({ success: true, message: "Contact supprimé avec succès", contact: deletedContact });
    } catch (err) {
        res.status(500).json({ success: false, message: "Erreur lors de la suppression du contact", error: err.message });
    }}
module.exports = { AddContact,GetContact,deleteContact };
