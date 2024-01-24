const database = require("../../config/database_config");
const { successResponse, failureResponse } = require("../utilities/utilities");

const createUserCatagoryApi = async (req, res) => {
  try {

    const { userId, catagoryId, user_name, catagory_name } = req.body;

    console.log(req.body);

    const isexistingAssociation = await database.models.userCatagory_model.findOne({
      where: {
        userId: userId,
        catagoryId: catagoryId
      }
    });

    if (isexistingAssociation) {
      return res.status(400).json(failureResponse("failure", "already assocition exists", isexistingAssociation));

    }
    else {
      const newAssociation = await database.models.userCatagory_model.create({
        userId, catagoryId, user_name, catagory_name
      });
      return res.status(201).json(successResponse("suceess", "new association is created", newAssociation));


    }

  } catch (error) {
    console.log("error::::::::::;",error);
    res.status(500).json(failureResponse("failure", "somethimg went wromg", error));
  }
}

const getAllAssociations = async(req, res) => {
  try {
    
    const allAssociations = await database.models.userCatagory_model.findAll();
    res.status(200).json(successResponse("success", "all associations found",allAssociations));

  }catch(error) {
    console.log("error::::::::::;",error);
    res.status(500).json(failureResponse("failure", "somethimg went wromg", error));
  }
}

const getByIdUsercatagory = async(req, res) => {
  try {
    const userId = req.params.userId;
    const catagories = await database.models.userCatagory_model.findAll({
      where : {
        userId : userId
      }
    });
    res.status(200).json(successResponse("success", "found users all catatagories",catagories));

  }catch(error) {
    console.log("error::::::::::;",error);
    res.status(400).json(failureResponse("failure", "not found users catagory", error));
  }
}

const updateByUserId_usercatagories = async(req, res) => {
  try {
    const id = req.params.id;
    const catagory_name = req.body.catagory_name;

    const updated_data = await database.models.userCatagory_model.update(
      {catagory_name :catagory_name
      },{
      where : {
        id : id
      }
    });
    res.status(200).json(successResponse("success", "update user catatagories",updated_data));

  }catch(error) {
    console.log("error::::::::::;",error);
    res.status(400).json(failureResponse("failure", "not update users catagory", error));
  }
}

const deletebyId_usercatagories = async(req, res) => {
  try {
    const id = req.params.id;

    const deleted_data = await database.models.userCatagory_model.destroy({
      where : {
        id : id
      }
    });
    res.status(200).json(successResponse("success", "update user catatagories",deleted_data));

  }catch(error) {
    console.log("error::::::::::;",error);
    res.status(400).json(failureResponse("failure", "not update users catagory", error));
  }
}

module.exports = { createUserCatagoryApi , getAllAssociations, getByIdUsercatagory,updateByUserId_usercatagories,deletebyId_usercatagories};