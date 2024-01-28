const express = require("express");
const router = express.Router();

const productController = require("../controllers/products_controller");

router.post("/createProductsApi", productController.createProductsApi);



module.exports = router;