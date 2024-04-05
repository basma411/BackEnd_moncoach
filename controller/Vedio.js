const Vedios = require('../model/VedioSchema');

const AddVedio = async (req, res) => {
    try {
        const { Titre, Lien } = req.body;
        let photoPath = '';
        if (req.file) {
            photoPath = req.file.path;
        }

        // Check if the Titre field is present and not empty
        if (!Titre || Titre.trim() === '') {
            return res.status(400).json({ error: 'The Titre field is required' });
        }

        const video = await Vedios.create({
            Titre,
            Lien,
            Photo: photoPath
        });

        res.status(200).json({ video });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const DeleteVedio = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check if the video ID is provided
        if (!id) {
            return res.status(400).json({ error: 'Video ID not provided' });
        }

        const deletedVideo = await Vedios.findByIdAndDelete(id);
        
        if (!deletedVideo) {
            return res.status(404).json({ error: 'Video not found' });
        }

        res.status(200).json({ message: 'Video deleted successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const UpdateVedio = async (req, res) => {
    try {
        const VedioId = req.params.id;
        const updatedVedioData = req.body; // Les données mises à jour de l'article
        let photoPath = '';
        if (req.file) {
            photoPath = req.file.path;
            // Ajoute le chemin de la nouvelle photo à l'objet de mise à jour
            updatedVedioData.Photo = photoPath;
        }
        await Vedios.findByIdAndUpdate(VedioId, updatedVedioData);
        res.status(200).json({ message: 'Vedio updated successfully.' });
   } catch (error) {
       console.error(error);
       res.status(500).json({ message: 'Internal Server Error' });
   }
}
const GetVedios =async(req,res)=>{
    try {
        const vedio=await Vedios.find()
        res.status(200).json({msg:'Articls retrieved successfully ',vedio:vedio})


    } catch (error) {
            res.status(500).json({ msg: error });

    }
}
module.exports = { AddVedio, DeleteVedio, UpdateVedio,GetVedios };
