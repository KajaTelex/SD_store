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



module.exports = { createUserCatagoryApi , getAllAssociations, getByIdUsercatagory};