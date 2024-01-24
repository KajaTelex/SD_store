const {Sequelize, DataTypes } = require("sequelize");

const userModel = require("../src/models/user_models");
const otpModel = require("../src/models/otp_model");
const sessionModel = require("../src/models/session_model");
const catagoryModel = require("../src/models/catagory_model");
const userCatagoryModel = require("../src/models/userCatagory_model")


const instanceSequelize = new Sequelize("sdstore", "root", "Khaja05$", {
    host : "localhost",
    dialect: "mysql"
});

const models = {
    user_models : userModel(instanceSequelize, DataTypes),
    otp_models : otpModel(instanceSequelize, DataTypes),
    session_models : sessionModel(instanceSequelize, DataTypes),
    catagory_model : catagoryModel(instanceSequelize, DataTypes),
    userCatagory_model :userCatagoryModel(instanceSequelize, DataTypes)
}

models.user_models.hasMany(models.userCatagory_model);
models.userCatagory_model.belongsTo(models.user_models);

models.catagory_model.hasMany(models.userCatagory_model);
models.userCatagory_model.belongsTo(models.catagory_model);

module.exports = { instanceSequelize, models};