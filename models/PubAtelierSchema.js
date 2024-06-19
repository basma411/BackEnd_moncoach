const mongoose = require('mongoose');

const PubAtelierSchema = new mongoose.Schema({
    titre : {
        type: String,
        required: true
    },
    texte: {
        type: String,
    },
    img: {
        type: String,
        required: true

    },
    ouner:{type:mongoose.Schema.Types.ObjectId,
        ref:'Atelier'
    }
});

const PubAteliers = mongoose.model('atelier_degustation', PubAtelierSchema);
module.exports = PubAteliers;
