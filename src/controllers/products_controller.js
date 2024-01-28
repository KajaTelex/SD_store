const database = require("../../config/database_config");
const { successResponse , failureResponse } = require("../utilities/utilities");


const createProductsApi = async (req, res ) => {
    try {
     
        res.status(200).json(successResponse("success", "creates products successfully"));

    }catch(error) {
        res.status(500).json(failureResponse("failure", "something went wrong", error));
    }
}


module.exports = {createProductsApi};