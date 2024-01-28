const express = require("express");
const router = express.Router();

const verifyToken = require("../../src/middleware/auth_middleware");
const upload = require("../middleware/multerSetUp");

const catagoryApiController = require("../controllers/catagory_conrollers");

router.post("/createCatagoryApi",upload.single('catagory_image'),catagoryApiController.createCatagoryApi);
router.get("/getAllCatagoriesApi",verifyToken,catagoryApiController.getAllCatagoriesApi);
router.get("/getCategoryByIdApi/:id", catagoryApiController.getCategoryByIdApi);
router.put("/updateCategoryApi/:id",catagoryApiController.updateCategoryApi);
router.delete("/deleteCategoryApi/:id",catagoryApiController.deleteCategoryApi);

module.exports = router;