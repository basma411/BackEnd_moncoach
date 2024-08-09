const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: "./config/.env" });

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/upload', express.static('upload'));

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
const Evenements = require('./models/EvenementsSchema');
app.use('/api', RouterList);

// Example: Dynamic route for social media sharing
app.get('/Evenement/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const event = await Evenements.findById(id);

        if (!event) {
            return res.status(404).send('Event not found');
        }

        const filePath = path.resolve(__dirname, '..', 'client', 'build', 'index.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return console.error(err);
            }

            // Replace placeholders with event data
            data = data.replace(/\$OG_TITLE/g, event.titre);
            data = data.replace(/\$OG_IMAGE/g, `https://ce28-197-15-129-6.ngrok-free.app/${event.photo}`);
            data = data.replace(/\$OG_URL/g, `http://localhost:3000/Evenement/${event._id}`);
            res.send(data);
        });
    } catch (err) {
        console.error('Error fetching event:', err);
        res.status(500).send('Server error');
    }
});

// Serve the React app
app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return console.error(err);
        }

        // Replace placeholders with event data
        data = data.replace(/\$OG_TITLE/g, "MonCoach");
        data = data.replace(/\$OG_DESCRIPTION/g, " ");
        data = data.replace(/\$OG_IMAGE/g, "http://www.moncoach.tn/images/logoo.png");
        data = data.replace(/\$OG_URL/g, `http://localhost:3000`);

        res.send(data);
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(`Server failed to start on port ${PORT}`);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});
