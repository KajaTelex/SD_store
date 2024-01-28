const express = require("express");
const router = express.Router();

const imageController = require("../controllers/images_controller");

router.post("/createImageApi", imageController.createImageApi);



module.exports = router;