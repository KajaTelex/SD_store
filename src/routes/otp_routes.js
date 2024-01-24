const express = require("express");
const router = express.Router();


const otpController = require("../controllers/otp_controller");

router.post("/sendOtpApi",otpController.sendOtpApi);
router.post("/otpverifyAPi", otpController.otpverifyAPi);

module.exports =router;