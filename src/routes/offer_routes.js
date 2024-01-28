const express = require("express");
const router = express.Router();

const offerController = require("../controllers/offer_controller");

router.post("/createOfferApi", offerController.createOfferApi);



module.exports = router;