const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config({ path: "./config/.env" });

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/upload', express.static('upload'));

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to the database');
}).catch((err) => {
    console.error('Error connecting to the database:', err);
});

// Import Routes
const RouterCoach = require('./router/coach');
app.use('/api', RouterCoach);

const RouterAtelier = require('./router/atelier');
app.use('/api', RouterAtelier);

const RouterArticle = require('./router/article');
app.use('/api', RouterArticle);

const RouterÉvènement = require('./router/Évènement');
app.use('/api', RouterÉvènement);

const RouterDomaine = require('./router/domaine');
app.use('/api', RouterDomaine);

const RouterAdmin = require('./router/admin');
app.use('/api', RouterAdmin);

const RouterPartenaire = require('./router/Partenaire');
app.use('/api', RouterPartenaire);

const RouterVedio = require('./router/Vedio');
app.use('/api', RouterVedio);

const RouterContact = require('./router/contact');
app.use('/api', RouterContact);

const RouterNewsletter = require('./router/Newsletter');
app.use('/api', RouterNewsletter);

const RouterIcon = require('./router/icon');
app.use('/api', RouterIcon);

const RouterSlide = require('./router/slide');
app.use('/api', RouterSlide);

const RouterTémoignage = require('./router/Témoignage');
app.use('/api', RouterTémoignage);

const RouterBiblio = require('./router/bibio');
app.use('/api', RouterBiblio);

const RouterPubAtelier = require('./router/PubAtelier');
app.use('/api', RouterPubAtelier);

const RouterInterface = require('./router/Interface');
app.use('/api', RouterInterface);

const RouterFaq = require('./router/Faq');
app.use('/api', RouterFaq);

const RouterList = require('./router/ListeEntrepCoach');
app.use('/api', RouterList);

// Event model
const Evenements = require("./models/EvenementsSchema");

// Event Route to Render EJS Template with Open Graph Meta Tags
const { opengraph } = require('./controllers/Evenements');
app.get('/Events/:id', opengraph);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(`Server failed to start on port ${PORT}`);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});
