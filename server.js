const express = require('express')
const app = express()

app.use(express.json());
const cors=require('cors')
app.use(cors());

const dotenv = require('dotenv');
dotenv.config({path:"./config/.env"});
app.use('/upload',express.static('upload'))
const mongoose = require('mongoose');

const RouterCoach=require('./router/coach')
app.use('/api',RouterCoach)
const RouterAtelier = require('./router/atelier');
app.use('/api', RouterAtelier);

const RouterArticle=require('./router/article')
app.use('/api',RouterArticle)
const RouterÉvènement=require('./router/Évènement')
app.use('/api',RouterÉvènement)
const RouterDomaine=require('./router/domaine')
app.use('/api',RouterDomaine)

const RouterAdmin=require('./router/admin')
app.use('/api',RouterAdmin)
const RouterPartenaire=require('./router/Partenaire')
app.use('/api',RouterPartenaire)
const RouterVedio=require('./router/Vedio')
app.use('/api',RouterVedio)
const RouterContact=require('./router/contact')
app.use('/api',RouterContact)
const RouterNewsletter=require('./router/Newsletter')
app.use('/api',RouterNewsletter)
const RouterIcon=require('./router/icon')
app.use('/api',RouterIcon)
const RouterSlide=require('./router/slide')
app.use('/api',RouterSlide)
const RouterTémoignage=require('./router/Témoignage')
app.use('/api',RouterTémoignage)
const RouterBiblio=require('./router/bibio')
app.use('/api',RouterBiblio)
const RouterPubAtelier=require('./router/PubAtelier')
app.use('/api',RouterPubAtelier)
const RouterInterface=require('./router/Interface')
app.use('/api',RouterInterface)
const RouterFaq=require('./router/Faq')
app.use('/api',RouterFaq)
const RouterList=require('./router/ListeEntrepCoach')
app.use('/api',RouterList)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('You are connected to the database');
}).catch((err) => {
    console.error('Error connecting to the database:', err);
});


app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(`Server is not connected on port ${process.env.PORT}`);
    } else {
        console.log(`Server is connected on port ${process.env.PORT}`);
    }
});
