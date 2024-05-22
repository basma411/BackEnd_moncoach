const mongoose = require('mongoose');

const BiblioSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    texte: {
        type: String,
        required: true
    },
    editeur: {
        type: String,
        required: true
    },
  
    annee: {
        type: String,
        required: true
    }
});

const Biblio = mongoose.model('Biblio', BiblioSchema);
module.exports = Biblio;
