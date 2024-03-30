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
      return res.status(400).json({ error: errors.array() });
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
        return res
          .status(400)
          .json({ msg: "Password and confirmation password do not match." });
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
        return res.status(400).json({ msg: "This email already exists." });
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
          return res
            .status(400)
            .json({ msg: "One or more domains not found." });
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
        return res.status(200).json({ msg: coachcreate, token: token });
      }
    }
  } catch (error) {
    // Gestion des erreurs lors de l'enregistrement du coach
    console.error(error);
    return res
      .status(500)
      .json({ msg: "An error occurred while registering the coach." });
  }
};

// Fonction pour se connecter en tant que coach
const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const coachExist = await Coach.findOne({ Email });

    if (!coachExist) {
      // Si l'email n'existe pas dans la base de données
      return res.status(400).json({ msg: "This email does not exist." });
    } else {
      // Vérification du mot de passe
      const verif = await bcrypt.compare(Password, coachExist.Password);
      if (!verif) {
        // Si le mot de passe est incorrect
        return res.status(400).json({ msg: "Incorrect password." });
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
        return res.status(200).json({ msg: "Login successful.", token: token });
      }
    }
  } catch (error) {
    // Gestion des erreurs lors de la connexion du coach
    return res.status(500).json({ msg: "An error occurred while logging in." });
  }
};

module.exports = { registre, login };
