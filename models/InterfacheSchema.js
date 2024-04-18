const mongoose = require('mongoose');

const InterfaceSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    texte: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    lien: {
        type: String
    },
    page: {
        type: String
    }
});

const Interface = mongoose.model('Interface', InterfaceSchema);
module.exports = Interface;
