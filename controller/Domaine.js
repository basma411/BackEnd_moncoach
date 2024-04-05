const Domaines = require('../model/DomaineSchema');

const AddDomaine= async (req, res) => {
    try {
        const {NomDomaine} = req.body;


        const Domaine = await Domaines.create({
            NomDomaine
        });

        res.status(200).json({ Domaine });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const GetDomaine =async(req,res)=>{
    try {
        const Domaine=await Domaines.find()
        res.status(200).json({msg:'Domaine retrieved successfully ',Domaine:Domaine})


    } catch (error) {
            res.status(500).json({ msg: error });

    }
}
module.exports = { AddDomaine,GetDomaine };
