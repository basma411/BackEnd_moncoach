const mongoose = require('mongoose');

const EvenementsSchema = new mongoose.Schema({
    Titre: {
        type: String,
        required: true


    },
    Texte: {
        type: String,
        required: true

    },
    Lien: {
        type: String,
        required: true

    },
    Lieu: {
        type: String,
        required: true

    },
    Date: {
        type: String,
        required: true

    },
    Photo: {
        type: String,
        required: true

    },
   
    Visible: {
        type: Boolean,
        default: false
    }
});

const Evenements = mongoose.model('Evenements', EvenementsSchema);
module.exports = Evenements;
