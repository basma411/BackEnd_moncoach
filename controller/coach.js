const Coach = require("../model/CoachSchema");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const Domaines = require("../model/DomaineSchema");

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
        Liens,
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
          Liens,
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
    const coachId = req.params.id;
    const updatedCoachData = req.body; // Les données mises à jour du coach

    // Vérifie si une nouvelle photo a été téléchargée et met à jour le chemin du fichier
    let photoPath = "";
    if (req.files && req.files['Photo']) {
      photoPath = req.files['Photo'][0].path;
      // Ajoute le chemin de la nouvelle photo aux données mises à jour du coach
      updatedCoachData.Photo = photoPath;
    }

    // Vérifie si un nouveau logo a été téléchargé et met à jour le chemin du fichier
    let logoPath = "";
    if (req.files && req.files['Logo']) {
      logoPath = req.files['Logo'][0].path;
      // Ajoute le chemin du nouveau logo aux données mises à jour du coach
      updatedCoachData.Logo = logoPath;
    }

    // Vérifie si un nouveau PDF a été téléchargé et met à jour le chemin du fichier
    let pdfPath = "";
    if (req.files && req.files['FichierPDF']) {
      pdfPath = req.files['FichierPDF'][0].path;
      // Ajoute le chemin du nouveau PDF aux données mises à jour du coach
      updatedCoachData.FichierPDF = pdfPath;
    }

    console.log(updatedCoachData);

    // Mettre à jour le coach avec l'ID spécifié
    await Coach.findByIdAndUpdate(coachId, updatedCoachData);
    res.status(200).json({ message: 'Coach updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


const deleteCoach= async (req, res) => {
  try {
      const coachId = req.params.id;
      const deleteCoachData = req.body; // Les données mises à jour du coach
      // Mettre à jour le coach avec l'ID spécifié
      await Coach.findByIdAndDelete(coachId, deleteCoachData);
      res.status(200).json({ message: 'Coach delete successfully.' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
}
module.exports = { registre, login,getcoach ,putCoach,deleteCoach,getCoachesInvisible,getCoachesVisible};
