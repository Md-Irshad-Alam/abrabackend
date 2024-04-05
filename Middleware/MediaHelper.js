const multer = require('multer');

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploaderror = new Error('Invalid file');
    if (isValid) {
    }

    return cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const filename = file.originalname.split(' ').join('_');
    const extention = FILE_TYPE_MAP[file.mimetype];

    return cb(null, `${filename + '-' + Date.now()}.${extention}`);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
