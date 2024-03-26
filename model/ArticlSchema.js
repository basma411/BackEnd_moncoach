const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    Auteur: {
        type: String,
        required: true
    },
    Titre: {
        type: String,
        required: true

    },
    Texte: {
        type: String,
        required: true

    },
    Photo : {
        type: String,
        required: true

    },
    Lien: {
        type: String,

    }, Visible: {
        type: Boolean, 
        default: false,
    },
   
});

const Article = mongoose.model('Article', ArticleSchema); 
module.exports = Article;
