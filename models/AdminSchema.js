const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({

    nom_utilisateur: {
        type: String,
        required: true,
        unique: true
    },
    mot_de_passe: {
        type: String,
        required: true
    }
    ,
    email: {
        type: String,
        required: true
    }
   
});

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
