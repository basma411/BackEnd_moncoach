const mongoose = require('mongoose');

const BiblioSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    auteur1: {
        type: String,
        required: true
    },
    auteur2: {
        type: String,
    },
    annee: {
        type: String,
        required: true
    }
});

const Biblio = mongoose.model('Biblio', BiblioSchema);
module.exports = Biblio;
