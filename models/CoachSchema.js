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
        required: true
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
        required: true
    },
    Langues: {
        type: [String], 
        enum: ['Arabe', 'Français', 'Anglais'],
        required: true
    },
    TypesDeClients: {
        type: [String],
        enum: ['Personne', 'Organisation'],
        required: true
    },
    TarifPreferentiel: {
        type: Boolean, 
        required: true
    },
    Photo: {
        type: String, 
        required: true
    },
    Site: {
        type: String,
    },
    Logo: {
        type: String, 
        default: '/default-photo.jpg',
        required: true
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
        required: true
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
