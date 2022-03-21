const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('multer des');
    cb(null, path.join(`${__dirname}/../images/`));
  },
  filename: function(req, file, cb) {
    console.log('multer filename');
    cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname);
  }
});

module.exports = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);  
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});