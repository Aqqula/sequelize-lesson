const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, "../public/images"));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix =
        Date.now() + "-" + Math.round(Math.random() * 100) + "-";
      cb(null, uniqueSuffix + file.originalname);
    },
  });

  const upload = multer({ storage });

  module.exports = upload;