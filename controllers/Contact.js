const Contacts = require('../models/ContactSchema');
const nodemailer = require('nodemailer');

const AddContact = async (req, res) => {
    try {
        // Récupérer les données du corps de la requête
        const { nom_prenom, tel, email, mssg } = req.body;

        // Sauvegarder le nouveau contact dans la base de données
        const savedContact = await Contacts.create({
            nom_prenom, tel, email, mssg
        });

        // Configuration de Nodemailer
        const transporter = nodemailer.createTransport({
            host: 'ssl0.ovh.net',
            port: 587,
            auth: {
                user: 'sendcon@moncoach.tn', // Adresse email ou identifiant SMTP
                pass: 'yassine123456'   // Mot de passe associé
            }
        });
        

        // Options de l'email
        const mailOptions = {
            from: '	contact@moncoach.tn', // L'adresse email de l'expéditeur
            to: "sabkhi.basma89@gmail.com",
            subject:  'Nouveau Contact',
            html: `
            <p>Un nouveau contact a été ajouté !</p>:<link>http://localhost:3000/admin/Contact</link>
       
        `        };

        // Envoyer l'email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ success: false, message: "Erreur lors de l'envoi de l'email", error: error.toString() });
            }
            res.status(201).json({ success: true, message: "Contact ajouté avec succès et email envoyé", contact: savedContact });
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Erreur lors de l'ajout du contact", error: err.message });
    }
};

const GetContact=async(rq,res)=>{
    try {
        const Contact=await Contacts.find()
        res.status(200).json({msg:'Contacts retrieved successfully ',Conts:Contact})


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
