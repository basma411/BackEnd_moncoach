const Témoignages = require('../models/TémoignageSchema');
const nodemailer = require("nodemailer");

const addTemoignage = async (req, res) => {
    try {
        const { nom, texte } = req.body;
        const Témoignage = await Témoignages.create({
            nom, texte 
         });
             // Configuration of Nodemailer
      const transporter = nodemailer.createTransport({
        host: 'ssl0.ovh.net',
        port: 587,
        auth: {
          user: 'sendcon@moncoach.tn', // SMTP username
          pass: 'yassine123456' // SMTP password
        }
      });

      // Email options
      const mailOptions = {
        from: 'contact@moncoach.tn', // Sender email address
        to: "contact@moncoach.tn",
        subject: 'Nouveau Temoignege',
        html: `<p>Un nouveau temoignege a été ajouté !</p>`
      };

      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ success: false, message: "Erreur lors de l'envoi de l'email", error: error.toString() });
        }
      });
        res.status(201).json({ success: true, message: "Témoignage ajouté avec succès", Témoignage: Témoignage });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de l'ajout du témoignage", error: error.message });
    }
};

const getTemoignageInvisible = async (req, res) => {
    try {
        const témoignages = await Témoignages.find({Visible:false});
        res.status(200).json({ success: true, message: "Témoignages récupérés avec succès", Témoignages: témoignages });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la récupération des témoignages", error: error.message });
    }
};
const getTemoignageVisible = async (req, res) => {
    try {
        const témoignages = await Témoignages.find({Visible:true});
        res.status(200).json({ success: true, message: "Témoignages récupérés avec succès", Témoignages: témoignages });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la récupération des témoignages", error: error.message });
    }
};

const updateTemoignage = async (req, res) => {
    try {
        const témoignageId = req.params.id;
        const updatedTémoignage = req.body;
        await Témoignages.findByIdAndUpdate(témoignageId, updatedTémoignage);
        res.status(200).json({ success: true, message: "Témoignage mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la mise à jour du témoignage", error: error.message });
    }
};

const deleteTemoignage = async (req, res) => {
    try {
        const témoignageId = req.params.id;
        await Témoignages.findByIdAndDelete(témoignageId);
        res.status(200).json({ success: true, message: "Témoignage supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la suppression du témoignage", error: error.message });
    }
};

module.exports = { addTemoignage, getTemoignageVisible,getTemoignageInvisible, updateTemoignage, deleteTemoignage };
