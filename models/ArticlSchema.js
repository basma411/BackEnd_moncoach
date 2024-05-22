const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    auteur: {
        type: String,
        required: true
    },
    titre: {
        type: String,
        required: true

    },
    texte: {
        type: String,
        required: true

    },
    photo : {
        type: String,
        required: true

    },
    lien: {
        type: String,

    }, Visible: {
        type: Boolean, 
        default: false,
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
});

const Article = mongoose.model('Article', ArticleSchema); 
module.exports = Article;
