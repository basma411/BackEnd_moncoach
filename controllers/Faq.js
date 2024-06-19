const FAQ = require('../models/FaqSchema');

const AddFaq = async (req, res) => {
    try {
        const { question, rreponse } = req.body;

     
        const faq = await FAQ.create({
            question, rreponse
        });

        res.status(200).json({ faq });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




const GetFaq=async(req,res)=>{
    try {
        const Faqs=await FAQ.find()
        res.status(200).json({msg:'Articls retrieved successfully ',FAQs:Faqs})


    } catch (error) {
            res.status(500).json({ msg: error });

    }
}

module.exports = { AddFaq,GetFaq };
