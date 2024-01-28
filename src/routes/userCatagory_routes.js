const express = require("express");
const router = express.Router();

const userCatagoryApiController = require("../controllers/userCatagory_controller");

router.post("/createUserCatagoryApi", userCatagoryApiController.createUserCatagoryApi);
router.get("/getAllAssociations",userCatagoryApiController.getAllAssociations);
router.get("/getAssociationsById/:userId", userCatagoryApiController.getByIdUsercatagory);

module.exports = router;