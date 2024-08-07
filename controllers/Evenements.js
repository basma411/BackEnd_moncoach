const Evenements  = require("../models/EvenementsSchema");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const path = require('path');
const fs = require('fs');
const { decode } = require('html-entities');
const AddEvenements = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({ error: errors.array() });
        } else { 
            const { titre, texte, lien, lieu, dates } = req.body;
            let photoPath = '';
            if (req.file) {
                photoPath = req.file.path;
            }
            const evenement = await Evenements.create({
                titre,
                texte,
                lien,
                lieu,
                dates,
                photo: photoPath
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
        subject: 'Nouveau Evenement',
        html: `<p>Un nouveau évenement a été ajouté !</p>`
      };

      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ success: false, message: "Erreur lors de l'envoi de l'email", error: error.toString() });
        }
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
            UpdateEvenement.photo = photoPath;
        }

        console.log("UpdateEvenement",photoPath);
        
        await Evenements.findByIdAndUpdate(EvenementId, UpdateEvenement);
        res.status(200).json({ message: 'Evenement updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
const deleteEvenements = async (req, res) => {
    try {
        const EvenementId = req.params.id;
        
      
        
        await Evenements.findByIdAndDelete(EvenementId);
        res.status(200).json({ message: 'Evenement delete successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}



  
module.exports = { AddEvenements ,GetEvenements,PutEvenements,deleteEvenements};
