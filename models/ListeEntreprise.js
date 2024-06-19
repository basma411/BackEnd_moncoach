const mongoose = require('mongoose');

const atelier2Schema = new mongoose.Schema({
    nom : {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true

    }
    ,
    mail: {
        type: String,
        required: true

    }
    ,
    entreprise: {
        type: String,
        required: true

    }
    ,
    poste: {
        type: String,
        required: true

    },
    proposition: {
        type: String,
        required: true

    }
});

const PubAteliers = mongoose.model('atelier2', atelier2Schema);
module.exports = PubAteliers;
