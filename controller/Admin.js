const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const Admin = require("../model/AdminSchema");
const JWT = require("jsonwebtoken");

const   AddAdmin = async (req, res) => {
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        // S'il y a des erreurs de validation, renvoyer un message d'erreur
        res.status(400).json({ error: errors.array() });
      } else{
        const {login,password}=req.body
        const decryPaswoerd = await bcrypt.hash(password, 10);
        console.log(decryPaswoerd)
        const admincreate = await Admin.create({
            login,password:decryPaswoerd

        })
        const token = await JWT.sign(
            {
              id: admincreate._id,
            },
            process.env.JWT_secret,
            { expiresIn: "7D" }
          );
  
          res.status(200).json({ msg: admincreate, token: token });
      }
    } catch (error) {
    
      res.status(500).json({ msg: "An error occurred while registering the Admin." });
    }
  };
  module.exports = { AddAdmin };
