const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    Nom_Prénom: {
        type: String,
        required: true


    },
   
   
    Téléphone: {
        type: String,
        required: true

    },
    Email: {
        type: String,
        required: true

    },
    Date:
{
    type:Date,
    default:Date.now
},
    Message: {
        type: String,
        required: true


    },
});

const  Contacts = mongoose.model(' Contacts',  ContactSchema);
module.exports =  Contacts;
