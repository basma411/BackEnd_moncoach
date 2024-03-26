const Coach = require("../model/CoachSchema");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const Domaines = require("../model/DomaineSchema");

const registre = async (req, res) => {
    try {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        } else { 
            const {  NomPrenom, Domaine, AutreDomaine ,Governorat,NumTel,Email,Password,Bio,MethodesDeCoaching,Langues,TypesDeClients,TarifPreferentiel,Site,Liens,FichierPDF} = req.body;
            
            let pdfPath = ''; 
            let photoPath='';
            let logoPath='';

            if (req.files) {
                // Traitement du fichier photo
           // Traitement du fichier photo
if (req.files['Photo'] && (req.files['Photo'][0].mimetype === 'image/png' || req.files['Photo'][0].mimetype === 'image/jpeg')) {
    photoPath = req.files['Photo'][0].path;
}

// Traitement du fichier logo
if (req.files['Logo'] && (req.files['Logo'][0].mimetype === 'image/png' || req.files['Logo'][0].mimetype === 'image/jpeg')) {
    logoPath = req.files['Logo'][0].path;
}

                // Traitement du fichier PDF
                if (req.files['FichierPDF'] && req.files['FichierPDF'][0].mimetype === 'application/pdf') {
                    pdfPath = req.files['FichierPDF'][0].path;
                }
            }

            const coachexist = await Coach.findOne({ Email });

            if (coachexist) {
                res.status(400).json({ msg: "This email already exists." });
            } else {
                const domaine = await Domaines.findOne({ NomDomaine: Domaine });

                if (!domaine) {
                    return res.status(400).json({ msg: "Domaine not found." });
                }

                // Récupération de l'ID ObjectId du domaine
                const domaineId = domaine._id;
                const decryPaswoerd = await bcrypt.hash(Password, 10);

                const coachcreate = await Coach.create({
                    NomPrenom, DomainesIntervention:domaineId, AutreDomaine ,Governorat,NumTel,Email,Password: decryPaswoerd,Bio,MethodesDeCoaching,Langues,TypesDeClients,TarifPreferentiel,Photo: photoPath,Site,Logo: logoPath,Liens,FichierPDF: pdfPath
                });
                const token = await JWT.sign(
                    {
                        id: coachcreate._id,
                    },
                    process.env.JWT_secret,
                    { expiresIn: "7D" }
                );

                res.status(200).json({ msg: coachcreate, token: token });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "An error occurred while registering the coach." });
    }
};

const login = async(req,res) => {
    try {
        const {Email,Password} = req.body;
        const coachExist = await Coach.findOne({Email});
        if (!coachExist){
            res.status(400).json({msg:'This email does not exist.'});
        } else {
            const verif = await bcrypt.compare(Password,coachExist.Password);
            if(!verif){
                res.status(400).json({ msg: "Incorrect password." });
            } else {
                const token = await JWT.sign(
                    {
                        id: coachExist._id,
                    },
                    process.env.JWT_secret,
                    { expiresIn: "7D" }
                );
                res.status(200).json({ msg: "Login successful.", token: token });
            }
        }
    } catch (error) {
        res.status(500).json({ msg: "An error occurred while logging in." });
    }
};

module.exports = { registre, login };
