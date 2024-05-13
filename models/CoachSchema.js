const mongoose = require('mongoose');
const CoachSchema = new mongoose.Schema({
    NomPrenom: {
        type: String,
        required: true
    },
    DomainesIntervention: {
        type: mongoose.Schema.Types.Mixed,
        ref: 'Domaine',
    },
    AutreDomaine: {
        type: String,
    },
    Governorat: {
        type: String,

        enum: ['Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana', 'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kébili', 'Gabès', 'Medenine', 'Tataouine', 'Tozeur', 'Gafsa']

    },
    NumTel: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    ConfirmPassword: {
        type: String,
    },
    Bio: {
        type: String,
        // maxlength: 500,
        required: true
    },
    MethodesDeCoaching: {
        type: [String], 
        enum: ['Face à face', 'En ligne'],
        
    },
    Langues: {
        type: [String], 
        enum: ['Arabe', 'Français', 'Anglais'],
    },
    TypesDeClients: {
        type: [String],
        enum: ['Personne', 'Organisation'],
    },
    TarifPreferentiel: {
        type: Boolean, 
    },
    Photo: {
        type: String, 
    },
    Site: {
        type: String,
    },
    Logo: {
        type: String, 
        default: '/default-photo.jpg',
    },

    Facebook: {
        type: String,
    },
    LinkedIn: {
        type: String,
    },
    Youtube: {
        type: String,
    },
    FichierPDF: {
        type: String,
    },
    Visible: {
        type: Boolean,
        default: false,
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
});

const Coach = mongoose.model('Coach', CoachSchema);
module.exports = Coach;
