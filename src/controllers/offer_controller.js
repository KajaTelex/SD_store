const database = require("../../config/database_config");
const { successResponse , failureResponse } = require("../../src/utilities/utilities");

const createOfferApi = async (req, res ) => {
    try {
     
        res.status(200).json(successResponse("success", " creates offers successfully"));

    }catch(error) {
        res.status(500).json(failureResponse("failure", "something went wrong", error));
    }
}


module.exports = {createOfferApi};