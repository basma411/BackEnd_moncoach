const mongoose = require('mongoose');

const DomaineSchema = new mongoose.Schema({
    domaines: {
        type: String,
        required: true,
        unique: true
    },
});

const Domaines = mongoose.model('Domaine', DomaineSchema); 
module.exports = Domaines;
