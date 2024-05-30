const jwt = require('jsonwebtoken');
const Coach = require('../models/CoachSchema'); // Assurez-vous d'importer votre modèle Coach
const Admin = require('../models/AdminSchema'); // Assurez-vous d'importer votre modèle Admin

const autoCoachAdmin = async (req, res, next) => {
  try {
    // Vérifier si le token d'authentification est présent dans les en-têtes de la requête
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing.' });
    }

    // Vérifier si le token est valide
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Vérifier si l'utilisateur correspondant au token est un administrateur
    const admin = await Admin.findById(decodedToken.id);
    if (admin) {
      req.body.admin = admin.id;
      console.log(`Admin ID: ${admin.id}`);
      return next(); // Passer la requête au middleware suivant si c'est un admin
    }

    // Vérifier si l'utilisateur correspondant au token est un coach
    const coach = await Coach.findById(decodedToken.id);
    if (coach) {
      req.body.coach = coach.id;
      console.log(`Coach ID: ${coach.id}`);
      return next(); // Passer la requête au middleware suivant si c'est un coach
    }

    // Si ni un administrateur ni un coach n'est trouvé, renvoyer une erreur
    return res.status(401).json({ message: 'Unauthorized. User is not an admin or a coach.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = autoCoachAdmin;
