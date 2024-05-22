const mongoose = require('mongoose');
const CoachSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    domain: {
        type: mongoose.Schema.Types.Mixed,
        ref: 'Domaine',
        required: true

    },
    AutreDomaine: {
        type: String,
    },
    gouv: {
        type: String,

        enum: ['Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana', 'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kébili', 'Gabès', 'Medenine', 'Tataouine', 'Tozeur', 'Gafsa'],
        required: true

    },
    num: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    ConfirmPassword: {
        type: String,
    },
    bio: {
        type: String,
        // maxlength: 500,
        required: true
    },
    method: {
        type: [String], 
        enum: ['Face à face', 'En ligne'],
        required: true

        
    },
    langue: {
        type: [String], 
        enum: ['Arabe', 'Français', 'Anglais'],
        required: true

    },
    type_client: {
        type: [String],
        enum: ['Personne', 'Organisation'],
        required: true

    },
    tarif: {
        type: Boolean, 
        required: true

    },
    image: {
        type: String, 
        required: true

    },
    site: {
        type: String,
        
    },
    logo: {
        type: String, 
        default: '/default-photo.jpg',
    },

    fb: {
        type: String,
    },
    In: {
        type: String,
    },
    yt: {
        type: String,
    },
    piece: {
        type: String,
    },
    activ: {
        type: Boolean,
        default: false,
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
});

const Coach = mongoose.model('Coach', CoachSchema);
module.exports = Coach;
