const Domaines = require('../models/DomaineSchema');

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
const DeleteDomain=async(req,res)=>{
    try {
        const DomainID=req.params.id
        const deletedDomaine = await Domaines.findByIdAndDelete(DomainID);
        if (!deletedDomaine) {
            return res.status(404).json({ message: "Domaine not found" });
        }

        res.status(200).json({ message: "Domaine deleted successfully" })
    } catch (error) {
        
    }
}
const updateDomain=async(req,res)=>{
    try {
        const DomainID=req.params.id;
        const UpdateDomaine = req.body;

        const updatedDomaine = await Domaines.findByIdAndUpdate(DomainID,UpdateDomaine);
        if (!updatedDomaine) {
            return res.status(404).json({ message: "update not found" });
        }

        res.status(200).json({ message: "Domaine update successfully" })
    } catch (error) {
        
    }
}
module.exports = { AddDomaine,GetDomaine ,DeleteDomain,updateDomain};
