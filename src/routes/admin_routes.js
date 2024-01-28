const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerSetUp");

const adminConrollerApi = require("../controllers/admin_controllers");

router.post("/createAdminApi",adminConrollerApi.createAdminApi);
router.get("/getAdminByMobileNum/:mobile_number",adminConrollerApi.getAdminByMobileNum);
router.put("/updateAdminApi/:mobile_number", adminConrollerApi.updateAdminApi);
router.delete("/deleteAdminByMobileNum/:mobile_number", adminConrollerApi.deleteAdminByMobileNum);

router.post("/forgetPassword_otpSendApi",adminConrollerApi.forgetPassword_otpSendApi);
router.post("/verifyOTP_resetPasswordApi",adminConrollerApi.verifyOTP_resetPasswordApi);

router.post("/adminLoginApi", adminConrollerApi.adminLoginApi);


module.exports = router;