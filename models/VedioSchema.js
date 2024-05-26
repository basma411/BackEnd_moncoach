const mongoose = require('mongoose');

const VedioSchema = new mongoose.Schema({
    titre : {
        type: String,
        required: true


    },
   
   
    images: {
        type: String,
        required: true

    },
    lien: {
        type: String,
        required: true


    },
 
});

const Vedios = mongoose.model('Vedios', VedioSchema);
module.exports = Vedios;
