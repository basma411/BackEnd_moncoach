const mongoose = require('mongoose');

const NewsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
});

const Newsletters = mongoose.model('Newsletter', NewsletterSchema); 
module.exports = Newsletters;
