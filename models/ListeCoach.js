const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema({
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
    annee: {
        type: String,
        required: true

    }
    ,
    probono: {
        type: String,
        required: true

    },
    proposition: {
        type: String,
        required: true

    }
});

const PubAteliers = mongoose.model('coach_atelier',coachSchema);
module.exports = PubAteliers;
