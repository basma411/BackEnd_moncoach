const mongoose = require('mongoose');

const EvenementsSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true


    },
    texte: {
        type: String,
        required: true

    },
    lien: {
        type: String,
        required: true

    },
    lieu: {
        type: String,
        required: true

    },
    dates: {
        type: String,
        required: true

    },
    photo: {
        type: String,
        required: true

    },
   
    status: {
        type: Boolean,
        default: false
    }
});

const Evenements = mongoose.model('Evenements', EvenementsSchema);
module.exports = Evenements;
