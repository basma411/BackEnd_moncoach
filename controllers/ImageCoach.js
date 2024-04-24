const ImageCoch = require("../models/ImageCochSchema");

const addImage = async (req, res) => {
  try {
    // Récupérer les données de l'image du corps de la requête
    const userId=req.body.userid
    const {Photo}=req.body
    // Créer une nouvelle instance de l'image du coach
    const imageurl=await Task.create({Photo,ouner:userId})
    res.status(200).json({msg:'image created successfully',Photo:imageurl})
  } catch (error) {
    // Gérer les erreurs
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { addImage };
