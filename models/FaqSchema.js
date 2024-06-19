const mongoose = require('mongoose');

const FaqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    rreponse: {
        type: String,
        required: true,
    },
    dates:
    {
        type:Date,
        default:Date.now
    },
});

const FAQ = mongoose.model('faq1', FaqSchema); 
module.exports = FAQ;
