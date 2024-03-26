const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (file.mimetype === 'application/pdf') {
            cb(null, 'upload/pdfs/');
        } else if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
            cb(null, 'upload/images/');
        } else {
            cb({ message: 'Type de fichier non pris en charge' }, false);
        }
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 
    },
    fileFilter: function(req, file, cb) {
        if (file.mimetype === 'application/pdf' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            cb({ message: 'Seuls les fichiers PDF, PNG, JPEG et JPG sont autorisés.' }, false);
        }
    }
});

module.exports = { upload };
