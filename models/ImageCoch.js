const mongoose = require('mongoose');

const ImageCochschema = new mongoose.Schema({
    Photo: {
        type: String,
        required: true
    },
    
    ouner:{type:mongoose.Schema.Types.ObjectId,
        ref:'Coach'
    }

});

const ImageCoch = mongoose.model('ImageCoch', ImageCochschema);
module.exports = ImageCoch;
