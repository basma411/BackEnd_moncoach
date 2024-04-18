const mongoose = require('mongoose');

const NewsletterSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
    },
});

const Newsletters = mongoose.model('Newsletter', NewsletterSchema); 
module.exports = Newsletters;
