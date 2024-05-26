const mongoose = require('mongoose');

const PartenaireSchema = new mongoose.Schema({
    statut: {
        type: String,
        required: true


    },
   
   
    photo: {
        type: String,
        required: true

    },
    nom: {
        type: String,
        required: true


    },
 
});

const Partenaires = mongoose.model('Partenaires', PartenaireSchema);
module.exports = Partenaires;
