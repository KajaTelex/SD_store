
const multer = require("multer");
const path = require("path");

const diskstorage = multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, cb) {
        cb(null, Date.now()+'-'+file.originalname);
    }
});

       const upload = multer(
        { 
        storage: diskstorage,
       
        });

       module.exports = upload;