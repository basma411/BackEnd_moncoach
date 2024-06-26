const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const Admin = require("../models/AdminSchema");
const JWT = require("jsonwebtoken");

const AddAdmin = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // S'il y a des erreurs de validation, renvoyer un message d'erreur
            res.status(400).json({ error: errors.array() });
        } else {
            const { nom_utilisateur,  mot_de_passe ,email} = req.body;
            const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
            
            const admin = await Admin.create({
                nom_utilisateur,
                mot_de_passe: hashedPassword,
                email
            });

            const token = JWT.sign(
                {
                    id: admin._id,
                },
                process.env.JWT_secret,
                // { expiresIn: "7D" }
            );

            res.status(200).json({ msg: admin, token });
        }
    } catch (error) {
        res.status(500).json({ msg: "An error occurred while registering the Admin." });
    }
};

const LoginAdmin = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array() });
        } else {
            const { nom_utilisateur, mot_de_passe } = req.body;
            const admin = await Admin.findOne({ nom_utilisateur });

            if (!admin) {
                return res.status(404).json({ msg: "Admin not found." });
            }

            const passwordMatch = await bcrypt.compare(mot_de_passe, admin.mot_de_passe);

            if (!passwordMatch) {
                return res.status(401).json({ msg: "Incorrect password." });
            }

            const token = JWT.sign({ id: admin._id }, process.env.JWT_secret, { expiresIn: "7D" });

            res.status(200).json({ msg: "Login successful.", token });
        }
    } catch (error) {
        res.status(500).json({ msg: "An error occurred while logging in." });
    }
};
const GetAdmin=async(req,res)=>{
    try {
        const  adminID  =req.body.admin;
        console.log(adminID)
        const admin = await Admin.findOne({_id :adminID});
    
        if (!Admin) {
          res.status(200).json({ msg: "no Admin Found" });
        } else {
          res.status(200).json({ msg: "getAdmin", Admin: admin });
        }
      } catch (error) {
        res.status(500).json({ msg: "error get",error:error });
      }
}

module.exports = { AddAdmin, LoginAdmin,GetAdmin };
