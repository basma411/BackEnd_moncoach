const Coach = require("../models/CoachSchema");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const Domaines = require("../models/DomaineSchema");

// Fonction pour s'inscrire en tant que coach
const registre = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // S'il y a des erreurs de validation, renvoyer un message d'erreur
      res.status(400).json({ error: errors.array() });
    } else {
      const {
        NomPrenom,
        DomainesIntervention,
        AutreDomaine,
        Governorat,
        NumTel,
        Email,
        Password,
        ConfirmPassword,
        Bio,
        MethodesDeCoaching,
        Langues,
        TypesDeClients,
        TarifPreferentiel,
        Site,
        Youtube,
        LinkedIn,
        Facebook,
        FichierPDF,
      } = req.body;

      // Vérifier si les mots de passe correspondent
      if (Password !== ConfirmPassword) {
        res.status(400).json({ msg: "Password and confirmation password do not match." });
      }

      // Initialisation des chemins pour les fichiers
      let pdfPath = "";
      let photoPath = "";
      let logoPath = "";

      // Traitement des fichiers téléchargés (photo, logo, PDF)
      if (req.files) {
        // Traitement de la photo
        if (
          req.files["Photo"] &&
          (req.files["Photo"][0].mimetype === "image/png" ||
            req.files["Photo"][0].mimetype === "image/jpeg")
        ) {
          photoPath = req.files["Photo"][0].path;
        }

        // Traitement du logo
        if (
          req.files["Logo"] &&
          (req.files["Logo"][0].mimetype === "image/png" ||
            req.files["Logo"][0].mimetype === "image/jpeg")
        ) {
          logoPath = req.files["Logo"][0].path;
        }

        // Traitement du fichier PDF
        if (
          req.files["FichierPDF"] &&
          req.files["FichierPDF"][0].mimetype === "application/pdf"
        ) {
          pdfPath = req.files["FichierPDF"][0].path;
        }
      }

      // Vérifier si l'email du coach existe déjà dans la base de données
      const coachexist = await Coach.findOne({ Email });

      if (coachexist) {
        res.status(400).json({ msg: "This email already exists." });
      } else {
        // Recherche des domaines d'intervention
        const domainesInterventionn = DomainesIntervention.split(",").map(
          (value) => value.trim()
        );
        const domainesPromises = domainesInterventionn.map(
          async (domaineName) => {
            const domaine = await Domaines.findOne({ NomDomaine: domaineName });
            return domaine;
          }
        );

        const domaines = await Promise.all(domainesPromises);

        // Vérification si tous les domaines existent
        if (domaines.some((domaine) => !domaine)) {
          res.status(400).json({ msg: "One or more domains not found." });
        }

        // Récupération des noms de domaine
        const domaineNom = domaines.map((domaine) => domaine.NomDomaine);

        // Hachage du mot de passe
        const decryPaswoerd = await bcrypt.hash(Password, 10);
        const MethDeCoach = MethodesDeCoaching.split(",").map((value) =>
          value.trim()
        );
        const Lang = Langues.split(",").map((value) => value.trim());
        const Types = TypesDeClients.split(",").map((value) => value.trim());

        // Création du coach dans la base de données
        const coachcreate = await Coach.create({
          NomPrenom,
          DomainesIntervention: domaineNom,
          AutreDomaine,
          Governorat,
          NumTel,
          Email,
          Password: decryPaswoerd,
          Bio,
          MethodesDeCoaching: MethDeCoach,
          Langues: Lang,
          TypesDeClients: Types,
          TarifPreferentiel,
          Photo: photoPath,
          Site,
          Logo: logoPath,
          Youtube,
          LinkedIn,
          Facebook,
          FichierPDF: pdfPath,
        });

        // Génération du token JWT
        const token = await JWT.sign(
          {
            id: coachcreate._id,
          },
          process.env.JWT_secret,
          { expiresIn: "7D" }
        );

        // Renvoi de la réponse avec le coach créé et le token
        res.status(200).json({ msg: coachcreate, token: token });
      }
    }
  } catch (error) {
    // Gestion des erreurs lors de l'enregistrement du coach
    console.error(error);
    res.status(500).json({ msg: "An error occurred while registering the coach." });
  }
};

// Fonction pour se connecter en tant que coach
const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const coachExist = await Coach.findOne({ Email });

    if (!coachExist) {
      // Si l'email n'existe pas dans la base de données
      res.status(400).json({ msg: "This email does not exist." });
    } else {
      // Vérification du mot de passe
      const verif = await bcrypt.compare(Password, coachExist.Password);
      if (!verif) {
        // Si le mot de passe est incorrect
        res.status(400).json({ msg: "Incorrect password." });
      } else {
           // Vérification si le coach est visible
    if (!coachExist.Visible) {
      // Si le coach n'est pas visible, retournez un message d'erreur
      return res.status(400).json({ msg: "This coach is not visible." });
    }
        // Génération du token JWT
      
        const token = await JWT.sign(
          {
            id: coachExist._id,
          },
          process.env.JWT_secret,
          { expiresIn: "7D" }
        );
        // Renvoi de la réponse avec un message de connexion réussie et le token
        res.status(200).json({ msg: "Login successful.", token: token ,coachExist:coachExist});
      }
    }
  } catch (error) {
    // Gestion des erreurs lors de la connexion du coach
    res.status(500).json({ msg: "An error occurred while logging in." });
  }
};
// Fonction pour obtenir un coach
const getcoach = async (req, res) => {
  try {
    const  Coachid  = req.body.Coachid;
    const coach = await Coach.findOne({_id :Coachid});

    if (!coach) {
      res.status(200).json({ msg: "no Coach Found" });
    } else {
      res.status(200).json({ msg: "getCoach", coach: coach });
    }
  } catch (error) {
    res.status(500).json({ msg: "error get",error:error });
  }
};
const getCoachesVisible = async (req, res) => {
  try {
    // Rechercher tous les coachs dans la base de données
    const coaches = await Coach.find({Visible:true});

    // Vérifier si aucun coach n'a été trouvé
    if (!coaches || coaches.length === 0) {
      return res.status(404).json({ message: 'No coaches found.' });
    }

    // Retourner la liste des coachs
    res.status(200).json({ coaches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
const getCoachesInvisible = async (req, res) => {
  try {
    // Rechercher tous les coachs dans la base de données
    const coaches = await Coach.find({Visible:false});

    // Vérifier si aucun coach n'a été trouvé
    if (!coaches || coaches.length === 0) {
      return res.status(404).json({ message: 'No coaches found.' });
    }

    // Retourner la liste des coachs
    res.status(200).json({ coaches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}









// Route pour mettre à jour un coach
const putCoach = async (req, res) => {
  try {
    const CoachId = req.params.id; 
    const updatedCoachData = req.body;
    
    // Fixed coach ID
    let photoPath = "";
    
    // Check if there are uploaded files
    if (req.files && req.files['imagee']) {
      photoPath = req.files['imagee'][0].path; // Get the path of the uploaded image
      updatedCoachData.Photo = photoPath; // Update the Photo field with the new path
    }
     // Vérifie si les domaines d'intervention sont mis à jour
     if (req.body.DomainesIntervention) {
      // Assurez-vous que les domaines d'intervention sont un tableau
      updatedCoachData.DomainesIntervention = req.body.DomainesIntervention.split(",").map((value) => value.trim());
    }
    // Vérifie si les méthodes de coaching sont mises à jour
    if (req.body.MethodesDeCoaching) {
      // Assurez-vous que les méthodes de coaching sont un tableau
      updatedCoachData.MethodesDeCoaching = req.body.MethodesDeCoaching.split(",").map((value) => value.trim());
    }
    // Update the coach data in the database for the specified coach ID
    const updatedCoach = await Coach.findByIdAndUpdate(
      CoachId,
      updatedCoachData, // Update all coach fields
      { new: true } // Return the updated document
    );

    if (!updatedCoach) {
      // If no coach is found with the specified ID, return a 404 error
      return res.status(404).json({ message: 'Coach not found.' });
    }

    // Return a response with a success message and the updated coach data
    return res.status(200).json({ message: 'Coach updated successfully.', updatedCoach });
  } catch (error) {
    // Error handling
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Route pour mettre à jour l'image d'un coach


























const putCoachImage = async (req, res) => {
  try {
    const CoachId = req.params.id; // Fixed coach ID
    let photoPath = "";
    const updateImage = req.body;
    
    // Check if there are uploaded files
    if (req.files && req.files['imagee']) {
      photoPath = req.files['imagee'][0].path; // Get the path of the uploaded image
    }
    
    updateImage.Photo = photoPath;

    // Update the image path in the database for the specified coach ID
    const updatedCoach = await Coach.findByIdAndUpdate(
      CoachId,
       photoPath , // Update the Photo field with the new path
      { new: true } // Return the updated document
    );

    if (!updatedCoach) {
      // If no coach is found with the specified ID, return a 404 error
      return res.status(404).json({ message: 'Coach not found.' });
    }

    // Return a response with a success message and the image path
    return res.status(200).json({ message: 'Coach image updated successfully.', imagePath: photoPath });
  } catch (error) {
    // Error handling
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}





const updateCoachCredentials = async (req, res) => {
  try {
    const coachId = req.body.Coachid; // Récupère l'ID du coach connecté depuis le token JWT
    const { oldPassword, newPassword, newEmail } = req.body; // Récupère les données du corps de la requête
    // Récupère les données actuelles du coach depuis la base de données
    const coach = await Coach.findById(coachId);
    if (!coach) {
      return res.status(404).json({ msg: "Coach not found." });
    }

    // Vérifie si le nouvel email est fourni
    if (newEmail) {
      // Vérifie si l'email est déjà utilisé par un autre coach
      const emailExist = await Coach.findOne({ Email: newEmail });
      if (emailExist && emailExist._id.toString() !== coachId) {
        // Si l'email est déjà utilisé par un autre coach, retourne un message d'erreur
        return res.status(400).json({ msg: "This email is already in use." });
      }
      // Ajoute le nouvel email aux données à mettre à jour
      coach.Email = newEmail;
    }

    // Vérifie si le nouveau mot de passe est fourni
    if (newPassword) {
      // Vérifie si l'ancien mot de passe correspond
      const isMatch = await bcrypt.compare(oldPassword, coach.Password);
      if (!isMatch) {
        // Si l'ancien mot de passe ne correspond pas, retourne un message d'erreur
        return res.status(400).json({ msg: "Incorrect old password." });
      }
      
      // Hache le nouveau mot de passe
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      // Ajoute le nouveau mot de passe aux données à mettre à jour
      coach.Password = hashedPassword;
    }

    // Met à jour le document du coach dans la base de données
    await coach.save();

    // Retourne un message de succès
    res.status(200).json({ msg: "Credentials updated successfully." });
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    res.status(500).json({ msg: "An error occurred while updating credentials." });
  }
};



const deleteCoach= async (req, res) => {
  try {
      const coachId = req.params.id;
      // Mettre à jour le coach avec l'ID spécifié
      await Coach.findByIdAndDelete(coachId);
      res.status(200).json({ message: 'Coach delete successfully.' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
}
module.exports = { registre, login,getcoach ,putCoach,deleteCoach,getCoachesInvisible,getCoachesVisible,updateCoachCredentials,putCoachImage};