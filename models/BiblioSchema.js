const mongoose = require('mongoose');

const BiblioSchema = new mongoose.Schema({
    photo_c: {
        type: String,
        required: true
    },
    descrip: {
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
    auteur3: {
        type: String,
    },
    annee: {
        type: String,
        required: true
    }
});

const Biblio = mongoose.model('Biblio', BiblioSchema);
module.exports = Biblio;
