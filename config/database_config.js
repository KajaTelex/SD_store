const {Sequelize, DataTypes } = require("sequelize");

const adminModel = require("../src/models/admin_model");
const offerModel = require("../src/models/offers_model");



const userModel = require("../src/models/user_models");
const otpModel = require("../src/models/otp_model");
const sessionModel = require("../src/models/session_model");
const catagoryModel = require("../src/models/catagory_model");
const userCatagoryModel = require("../src/models/userCatagory_model");
const productModel = require("../src/models/products_model");
const imageModel = require("../src/models/image_model");


const instanceSequelize = new Sequelize("sdstore", "root", "Khaja05$", {
    host : "localhost",
    dialect: "mysql"
});


const models = {
    
    admin_model : adminModel(instanceSequelize,DataTypes),


    user_models : userModel(instanceSequelize, DataTypes),
    otp_models : otpModel(instanceSequelize, DataTypes),
    session_models : sessionModel(instanceSequelize, DataTypes),
    catagory_model : catagoryModel(instanceSequelize, DataTypes),
    userCatagory_model :userCatagoryModel(instanceSequelize, DataTypes),

    products_model : productModel(instanceSequelize, DataTypes),
    image_model : imageModel(instanceSequelize, DataTypes),
    offer_model : offerModel(instanceSequelize, DataTypes)

}


models.catagory_model.hasMany(models.admin_model);
models.admin_model.belongsTo(models.catagory_model);

models.userCatagory_model.hasMany(models.offer_model);
models.offer_model.belongsTo(models.userCatagory_model);



models.user_models.hasMany(models.userCatagory_model);
models.userCatagory_model.belongsTo(models.user_models);

models.catagory_model.hasMany(models.userCatagory_model);
models.userCatagory_model.belongsTo(models.catagory_model);

models.products_model.hasMany(models.catagory_model);
models.catagory_model.belongsTo(models.products_model);

models.image_model.hasMany(models.products_model);
models.products_model.belongsTo(models.image_model); 

module.exports = { instanceSequelize, models};