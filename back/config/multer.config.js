const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../upload/');
    },
    filename: function (req, file, cb) {
        const id_produit = req.body.id_produit || 'default';

        const ext = file.originalname.split('.').pop();

        const newFileName = `${id_produit}.${ext}`;

        cb(null, newFileName);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
