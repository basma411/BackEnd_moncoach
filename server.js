const express = require('express')
const app = express()
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config({path:"./config/.env"});
app.use('/upload',express.static('upload'))
const mongoose = require('mongoose');

const RouterCoach=require('./router/coach')
app.use('/api',RouterCoach)

const RouterArticle=require('./router/article')
app.use('/api',RouterArticle)
const RouterÉvènement=require('./router/Évènement')
app.use('/api',RouterÉvènement)
const RouterDomaine=require('./router/domaine')
app.use('/api',RouterDomaine)

const RouterAdmin=require('./router/admin')
app.use('/api',RouterAdmin)
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
