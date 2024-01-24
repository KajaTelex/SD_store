const express = require("express");
const router = express.Router();

const userCatagoryApiController = require("../controllers/userCatagory_controller");

router.post("/createUserCatagoryApi", userCatagoryApiController.createUserCatagoryApi);
router.get("/getAllAssociations",userCatagoryApiController.getAllAssociations);
router.get("/getAssociationsById/:userId", userCatagoryApiController.getByIdUsercatagory);
router.put("/updateByUserId_usercatagories/:id", userCatagoryApiController.updateByUserId_usercatagories)
router.delete("/deletebyId_usercatagories/:id",userCatagoryApiController.deletebyId_usercatagories);
module.exports = router;