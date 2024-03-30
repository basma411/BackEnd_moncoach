const mongoose = require('mongoose');

const DomaineSchema = new mongoose.Schema({
    NomDomaine: {
        type: String,
        required: true,
        unique: true
    },
});

const Domaines = mongoose.model('Domaine', DomaineSchema); 
module.exports = Domaines;
