const express = require("express");
const router = express.Router();

const  verifyToken  = require("../../src/middleware/auth_middleware");

const userController = require("../controllers/user_controllers");

router.post("/userSignUp", userController.userSignUp);
router.get("/getAlluserAPi",verifyToken, userController.getAlluser);
router.get("/getUserByMobileNumberApi/:mobile_number", userController.getUserByMobileNumber);
router.put("/UpdateUserByMObilenumberAPi/:mobile_number", userController.UpdateUserByMObilenumber);
router.delete("/deleteUserByMObilenumberApi/:mobile_number",userController.deleteUserByMObilenumber);

router.post("/forgetPasswordApi",userController.forgetPasswordApi);
router.post("/verifyOTP_resetPasswordApi", userController.verifyOTP_resetPasswordApi);

router.post("/userLoginApi",userController.userLoginApi);

module.exports = router;
