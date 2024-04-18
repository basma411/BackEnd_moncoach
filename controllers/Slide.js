const Slides = require('../models/SlideSchema');

const addSlide = async (req, res) => {
    try {
        const { titre1, titre2, photo } = req.body;    
        let photoPath = '';
        if (req.file) {
            photoPath = req.file.path;
        }
     const Slide=await Slides.create({
        titre1, titre2, photo :photoPath
     });

        res.status(201).json({ success: true, message: "slide ajoutée avec succès", Slide: Slide });
    } catch (err) {
        res.status(500).json({ success: false, message: "Erreur lors de l'ajout de la slide", error: err.message });
    }
};

const getSlide = async (req, res) => {
    try {
     
     const Slide =await Slides.find();

        res.status(201).json({ success: true, message: "Slide  retrieved successfully", Slide : Slide  });
    } catch (err) {
        res.status(500).json({ msg: error });
    }
};
const updateSlide  = async (req, res) => {
    try {
        const SlideID = req.params.id;
      
        const SlideUpdate = req.body;
        let photoPath = '';
        if (req.file) {
            photoPath = req.file.path;
        }
        SlideUpdate.photo=photoPath
        await Slides.findByIdAndUpdate(SlideID, SlideUpdate);

        res.status(201).json({ success: true, message: "Slide   updated successfully"});
    } catch (err) {
        res.status(500).json({ msg: error });
    }
};
const deleteSlide  = async (req, res) => {
    try {
        const SlideID = req.params.id;
        await Slides.findByIdAndDelete(SlideID);

        res.status(201).json({ success: true, message: "Slide   delete successfully"});
    } catch (err) {
        res.status(500).json({ msg: error });
    }
};
module.exports = { addSlide,getSlide ,updateSlide,deleteSlide};
