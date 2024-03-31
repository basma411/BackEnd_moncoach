// middlewares/AutoAdmin.js

const jwt = require('jsonwebtoken');
const Admin = require('../model/AdminSchema'); // Assurez-vous d'importer votre modèle Admin

const adminAuthMiddleware = async (req, res, next) => {
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

        if (!admin) {
            return res.status(401).json({ message: 'Unauthorized. User is not an admin.' });
        }

        // Ajouter l'objet admin à la requête pour une utilisation ultérieure dans les routes protégées par ce middleware
        req.admin = admin;

        // Passer la requête au middleware suivant
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = adminAuthMiddleware;
