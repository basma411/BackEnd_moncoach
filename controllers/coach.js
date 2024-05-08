const Coach = require("../models/CoachSchema");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const Domaines = require("../models/DomaineSchema");

const registre = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.array() });
    } else {
      const {
        NomPrenom, DomainesIntervention, AutreDomaine, Governorat, NumTel, Email, Password, ConfirmPassword, Bio, MethodesDeCoaching, Langues, TypesDeClients, TarifPreferentiel, Site, Youtube, LinkedIn, Facebook, FichierPDF,
      } = req.body;

      if (Password !== ConfirmPassword) {
        res.status(400).json({ msg: "Password and confirmation password do not match." });
      }

      let pdfPath = "";
      let photoPath = "";
      let logoPath = "";

      if (req.files) {
        if (req.files["Photo"] && (req.files["Photo"][0].mimetype === "image/png" || req.files["Photo"][0].mimetype === "image/jpeg")) {
          photoPath = req.files["Photo"][0].path;
        }

        if (req.files["Logo"] && (req.files["Logo"][0].mimetype === "image/png" || req.files["Logo"][0].mimetype === "image/jpeg")) {
          logoPath = req.files["Logo"][0].path;
        }

        if (req.files["FichierPDF"] && req.files["FichierPDF"][0].mimetype === "application/pdf") {
          pdfPath = req.files["FichierPDF"][0].path;
        }
      }

      const coachexist = await Coach.findOne({ Email });

      if (coachexist) {
        res.status(400).json({ msg: "This email already exists." });
      } else {
        const domainesInterventionn = DomainesIntervention.split(",").map((value) => value.trim());
        const domainesPromises = domainesInterventionn.map(async (domaineName) => {
          const domaine = await Domaines.findOne({ NomDomaine: domaineName });
          return domaine;
        });

        const domaines = await Promise.all(domainesPromises);

        if (domaines.some((domaine) => !domaine)) {
          res.status(400).json({ msg: "One or more domains not found." });
        }

        const domaineNom = domaines.map((domaine) => domaine.NomDomaine);

        const decryPaswoerd = await bcrypt.hash(Password, 10);
        const MethDeCoach = MethodesDeCoaching.split(",").map((value) => value.trim());
        const Lang = Langues.split(",").map((value) => value.trim());
        const Types = TypesDeClients.split(",").map((value) => value.trim());

        const coachcreate = await Coach.create({
          NomPrenom, DomainesIntervention: domaineNom, AutreDomaine, Governorat, NumTel, Email, Password: decryPaswoerd, Bio, MethodesDeCoaching: MethDeCoach, Langues: Lang, TypesDeClients: Types, TarifPreferentiel, Photo: photoPath, Site, Logo: logoPath, Youtube, LinkedIn, Facebook, FichierPDF: pdfPath,
        });

        const token = await JWT.sign({ id: coachcreate._id }, process.env.JWT_secret, { expiresIn: "7D" });

        res.status(200).json({ msg: coachcreate, token: token });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "An error occurred while registering the coach." });
  }
};

const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const coachExist = await Coach.findOne({ Email });

    if (!coachExist) {
      res.status(400).json({ msg: "This email does not exist." });
    } else {
      const verif = await bcrypt.compare(Password, coachExist.Password);
      if (!verif) {
        res.status(400).json({ msg: "Incorrect password." });
      } else {
        if (!coachExist.Visible) {
          return res.status(400).json({ msg: "This coach is not visible." });
        }

        const token = await JWT.sign({ id: coachExist._id }, process.env.JWT_secret, { expiresIn: "7D" });
        res.status(200).json({ msg: "Login successful.", token: token, coachExist: coachExist });
      }
    }
  } catch (error) {
    res.status(500).json({ msg: "An error occurred while logging in." });
  }
};

const getcoach = async (req, res) => {
  try {
    const Coachid = req.body.Coachid;
    const coach = await Coach.findOne({ _id: Coachid });

    if (!coach) {
      res.status(200).json({ msg: "no Coach Found" });
    } else {
      res.status(200).json({ msg: "getCoach", coach: coach });
    }
  } catch (error) {
    res.status(500).json({ msg: "error get", error: error });
  }
};

const getCoachesVisible = async (req, res) => {
  try {
    const coaches = await Coach.find({ Visible: true });

    if (!coaches || coaches.length === 0) {
      return res.status(404).json({ message: 'No coaches found.' });
    }

    res.status(200).json({ coaches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const getCoachesInvisible = async (req, res) => {
  try {
    const coaches = await Coach.find({ Visible: false });

    if (!coaches || coaches.length === 0) {
      return res.status(404).json({ message: 'No coaches found.' });
    }

    res.status(200).json({ coaches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const putCoach = async (req, res) => {
  try {
    const CoachId = req.params.id;
    const updatedCoachData = req.body;
    let photoPath = "";

    if (req.files && req.files['imagee']) {
      photoPath = req.files['imagee'][0].path;
      updatedCoachData.Photo = photoPath;
    }

    if (req.body.DomainesIntervention) {
      updatedCoachData.DomainesIntervention = req.body.DomainesIntervention.split(",").map((value) => value.trim());
    }

    if (req.body.MethodesDeCoaching) {
      updatedCoachData.MethodesDeCoaching = req.body.MethodesDeCoaching.split(",").map((value) => value.trim());
    }

    if (req.body.Langues) {
      updatedCoachData.Langues = req.body.Langues.split(",").map((value) => value.trim());
    }

    if (req.body.TypesDeClients) {
      updatedCoachData.TypesDeClients = req.body.TypesDeClients.split(",").map((value) => value.trim());
    }

    const updatedCoach = await Coach.findByIdAndUpdate(CoachId, updatedCoachData, { new: true });

    if (!updatedCoach) {
      return res.status(404).json({ message: 'Coach not found.' });
    }

    return res.status(200).json({ message: 'Coach updated successfully.', updatedCoach });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const putCoachImage = async (req, res) => {
  try {
    const CoachId = req.params.id;
    let photoPath = "";
    const updateImage = req.body;

    if (req.files && req.files['imagee']) {
      photoPath = req.files['imagee'][0].path;
    }

    updateImage.Photo = photoPath;

    const updatedCoach = await Coach.findByIdAndUpdate(CoachId, photoPath, { new: true });

    if (!updatedCoach) {
      return res.status(404).json({ message: 'Coach not found.' });
    }

    return res.status(200).json({ message: 'Coach image updated successfully.', imagePath: photoPath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const updateCoachCredentials = async (req, res) => {
  try {
    const coachId = req.body.Coachid;
    const { oldPassword, newPassword, newEmail } = req.body;

    // Recherche du coach par son ID
    let coach = await Coach.findById(coachId);
    if (!coach) {
      return res.status(404).json({ msg: "Coach not found." });
    }

    // Mise à jour de l'e-mail si un nouvel e-mail est fourni
    if (newEmail) {
      const emailExist = await Coach.findOne({ Email: newEmail });
      if (emailExist && emailExist._id.toString() !== coachId) {
        return res.status(400).json({ msg: "This email is already in use." });
      }
      coach.Email = newEmail;
    }

    // Mise à jour du mot de passe si un nouveau mot de passe est fourni
    if (newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, coach.Password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect old password." });
      }
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      coach.Password = hashedPassword;
    }

    // Utilisation de findByIdAndUpdate pour mettre à jour les informations d'identification du coach
    coach = await Coach.findByIdAndUpdate(coachId, { Password: coach.Password, Email: coach.Email }, { new: true });

    // Répondre avec un message de succès
    res.status(200).json({ msg: "Credentials updated successfully.", coach });
  } catch (error) {
    console.error(error);
    // En cas d'erreur, répondre avec un code d'erreur 500 et un message d'erreur
    res.status(500).json({ msg: "An error occurred while updating credentials." });
  }
};



const deleteCoach = async (req, res) => {
  try {
    const coachId = req.params.id;
    await Coach.findByIdAndDelete(coachId);
    res.status(200).json({ message: 'Coach delete successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const searchCoach = async (req, res) => {
  try {
    const {NomPrenom,DomainesIntervention,Governorat } = req.body;
    const filter = {};
  
    // Vérifier si le paramètre nom est fourni
   
    if (DomainesIntervention) {
      filter.DomainesIntervention = DomainesIntervention;
    }
    if (Governorat) {
      filter.Governorat =Governorat;
    }
    if (NomPrenom) {
      filter.NomPrenom = NomPrenom;
    }
    console.log(filter)

    // const coaches = await Coach.find({filter});
    const coaches = await Coach.find(filter);

    // Répondre avec la liste des coachs correspondants
    res.status(200).json({ coaches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};



module.exports = { registre, login, getcoach, putCoach, deleteCoach, getCoachesInvisible, getCoachesVisible, updateCoachCredentials, putCoachImage ,searchCoach};
