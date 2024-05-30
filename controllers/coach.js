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
        nom, domain, AutreDomaine, gouv, num, email, pwd, ConfirmPassword, bio, method, langue, type_client, tarif, site, yt, In, fb, piece,
      } = req.body;
if (!domain || domain.length === 0) {
  return res.status(400).json({ msg: "Veuillez sélectionner au moins un domaine d'intervention." });
}
      if (pwd !== ConfirmPassword) {
        res.status(400).json({ msg: "Password and confirmation password do not match." });
      }

      let pdfPath = "";
      let photoPath = "";
      let logoPath = "";

      if (req.files) {
        if (req.files["imagee"] && (req.files["imagee"][0].mimetype === "image/png" || req.files["imagee"][0].mimetype === "image/jpeg")) {
          photoPath = req.files["imagee"][0].path;
        }

        if (req.files["logo"] && (req.files["logo"][0].mimetype === "image/png" || req.files["logo"][0].mimetype === "image/jpeg")) {
          logoPath = req.files["logo"][0].path;
        }

        if (req.files["piece"] && req.files["piece"][0].mimetype === "application/pdf") {
          pdfPath = req.files["piece"][0].path;
        }
      }

      const coachexist = await Coach.findOne({ email });

      if (coachexist) {
        res.status(400).json({ msg: "This email already exists." });
      } else {
   // Si DomainesIntervention est une chaîne, convertissez-la en tableau
   const domainI = Array.isArray(domain)
   ? domain
   : domain.split(",").map((domaine) => domaine.trim());    
   
   const domainesPromises = domainI.map(async (domaineName) => {
          const domaine = await Domaines.findOne({ domaines: domaineName });
          return domaine;
        });

        const domaines = await Promise.all(domainesPromises);

        if (domaines.some((domaine) => !domaine)) {
          res.status(400).json({ msg: "One or more domains not found." });
        }

        const domaineNom = domaines.map((domaine) => domaine.domaines);

        const decryPaswoerd = await bcrypt.hash(pwd, 10);
        const MethDeCoach = method.split(",").map((value) => value.trim());
        const Lang = langue.split(",").map((value) => value.trim());
        const Types = type_client.split(",").map((value) => value.trim());

        const coachcreate = await Coach.create({
          nom, domain:domaineNom, AutreDomaine, gouv, num, email, pwd: decryPaswoerd, bio, method: MethDeCoach, langue: Lang, type_client: Types, tarif, image: photoPath,
          site, logo: logoPath, yt, In, fb, piece:pdfPath
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
    const { email, pwd } = req.body;
    const coachExist = await Coach.findOne({ email });
console.log(coachExist)
    if (!coachExist) {
      res.status(400).json({ msg: "This email does not exist." });
    } else {
      const verif = await bcrypt.compare(pwd, coachExist.pwd);
      if (!verif) {
        res.status(400).json({ msg: "Incorrect password." });
      } else {
        if (!coachExist.activ) {
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
    const coachesVisible = await Coach.find({ activ: true });

    if (!coachesVisible || coachesVisible.length === 0) {
      return res.status(404).json({ message: 'No coaches found.' });
    }

    res.status(200).json({ coachesVisible });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const getCoachesInvisible = async (req, res) => {
  try {
    const coachesInviseble = await Coach.find({ activ: false });

    if (!coachesInviseble || coachesInviseble.length === 0) {
      return res.status(404).json({ message: 'No coaches found.' });
    }

    res.status(200).json({ coachesInviseble:coachesInviseble });
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
      updatedCoachData.image = photoPath;
    }

    if (req.body.domain) {
      updatedCoachData.domain = req.body.domain.split(",").map((value) => value.trim());
    }

    if (req.body.method) {
      updatedCoachData.method = req.body.method.split(",").map((value) => value.trim());
    }

    if (req.body.langue) {
      updatedCoachData.langue = req.body.langue.split(",").map((value) => value.trim());
    }

    if (req.body.type_client) {
      updatedCoachData.type_client = req.body.type_client.split(",").map((value) => value.trim());
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

// const putCoachImage = async (req, res) => {
//   try {
//     const CoachId = req.params.id;
//     let photoPath = "";
//     const updateImage = req.body;

//     if (req.files && req.files['imagee']) {
//       photoPath = req.files['imagee'][0].path;
//     }

//     updateImage.Photo = photoPath;

//     const updatedCoach = await Coach.findByIdAndUpdate(CoachId, photoPath, { new: true });

//     if (!updatedCoach) {
//       return res.status(404).json({ message: 'Coach not found.' });
//     }

//     return res.status(200).json({ message: 'Coach image updated successfully.', imagePath: photoPath });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// }

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
      const emailExist = await Coach.findOne({ email: newEmail });
      if (emailExist && emailExist._id.toString() !== coachId) {
        return res.status(400).json({ msg: "This email is already in use." });
      }
      coach.email = newEmail;
    }

    // Mise à jour du mot de passe si un nouveau mot de passe est fourni
    if (newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, coach.pwd);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect old password." });
      }
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      coach.pwd = hashedPassword;
    }

    // Utilisation de findByIdAndUpdate pour mettre à jour les informations d'identification du coach
    coach = await Coach.findByIdAndUpdate(coachId, { pwd: coach.pwd, email: coach.email }, { new: true });

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
    const { nom, domain, gouv } = req.body;
    const filter = {};

    if (domain) {
      filter.domain = domain;
    }
    if (gouv) {
      filter.gouv = gouv;
    }
    if (nom) {
      filter.nom = { $regex: nom, $options: 'i' }; 
    }
    filter.activ = true;

    console.log(filter);

    const coaches = await Coach.find(filter);

    res.status(200).json({ coaches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};




module.exports = { registre, login, getcoach, putCoach, deleteCoach, getCoachesInvisible, getCoachesVisible, updateCoachCredentials ,searchCoach};
