const mongoose = require('mongoose');

const PubAtelierSchema = new mongoose.Schema({
    Titre : {
        type: String,
        required: true
    },
    texte: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true

    }
});

const PubAteliers = mongoose.model('PubAtelier', PubAtelierSchema);
module.exports = PubAteliers;
