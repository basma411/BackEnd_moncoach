const mongoose = require('mongoose');

const AtelierSchema = new mongoose.Schema({
    num: {
        type: Number,
        required: true
    },
    titre : {
        type: String,
        required: true

    },
    date : {
        type: String,
        required: true

    },
    heure : {
        type: String,
        required: true

    },
    statut : {
        type: String,
        required: true

    },
    photo : {
        type: String,
        required: true

    },
});

const Atelier = mongoose.model('Atelier', AtelierSchema); 
module.exports = Atelier;
