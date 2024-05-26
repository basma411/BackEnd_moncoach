const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    nom_prenom: {
        type: String,
        required: true


    },
   
   
    tel: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true

    },
    dates:
{
    type:Date,
    default:Date.now
},
    mssg: {
        type: String,
        required: true


    },
});

const  Contacts = mongoose.model(' Contacts',  ContactSchema);
module.exports =  Contacts;
