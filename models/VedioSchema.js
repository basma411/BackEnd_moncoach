const mongoose = require('mongoose');

const VedioSchema = new mongoose.Schema({
    Titre : {
        type: String,
        required: true


    },
   
   
    Photo: {
        type: String,
        required: true

    },
    Lien: {
        type: String,
        required: true


    },
 
});

const Vedios = mongoose.model('Vedios', VedioSchema);
module.exports = Vedios;
