
const { validationResult } = require("express-validator");
const Newsletters = require("../models/NewsletterSchema");


const AddNewsletter = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({ error: errors.array() });
        } else { 
            const {email } = req.body;
           
            const Newsletter = await Newsletters.create({
                email
            });
            res.status(200).json({ Newsletter });
        }
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};
const GetNewsletter = async (req, res) => {
    try {
        const Newsletter=await Newsletters.find()
        res.status(200).json({msg:'Newsletter retrieved successfully ',Newsletters:Newsletter})


    } catch (error) {
            res.status(500).json({ msg: error });

    }
};

const DeleteNewsletter = async (req, res) => {
    try {
        const NewsletterID=req.params.id
        console.log('NewsletterID',NewsletterID)
       await Newsletters.findOneAndDelete(NewsletterID)
       res.status(200).json({ message: 'Newsletter delete successfully.' });


    } catch (error) {
            res.status(500).json({ msg: error });

    }
};
module.exports = { AddNewsletter,GetNewsletter ,DeleteNewsletter};
