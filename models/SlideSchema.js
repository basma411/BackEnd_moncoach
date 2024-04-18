const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true
    },
    titre1: {
        type: String,
        required: true
    },
    titre2: {
        type: String,
    }
});

const Slides = mongoose.model('Slide', SlideSchema);
module.exports = Slides;
