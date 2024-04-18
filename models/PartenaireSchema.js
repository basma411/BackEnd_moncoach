const mongoose = require('mongoose');

const PartenaireSchema = new mongoose.Schema({
    Statut: {
        type: String,
        required: true


    },
   
   
    Photo: {
        type: String,
        required: true

    },
    Nom: {
        type: String,
        required: true


    },
 
});

const Partenaires = mongoose.model('Partenaires', PartenaireSchema);
module.exports = Partenaires;
