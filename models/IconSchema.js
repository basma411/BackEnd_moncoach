const mongoose = require('mongoose');

const IconSchema = new mongoose.Schema({
    Titre: {
        type: String,
        required: true


    },
    Texte: {
        type: String,
        required: true

    },
    image: {
        type: String,
        required: true

    },


});

const Icon = mongoose.model('Icon', IconSchema);
module.exports = Icon;
