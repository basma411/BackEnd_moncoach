const mongoose = require('mongoose');

const TémoignageSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    texte: {
        type: String,
        required: true
    }, Date:
    {
        type:Date,
        default:Date.now
    },
    Visible: {
        type: Boolean,
        default: false,
    },
});

const Témoignages = mongoose.model('Témoignage', TémoignageSchema);
module.exports = Témoignages;
