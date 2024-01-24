/* const jwt = require("jsonwebtoken");
const { failureResponse, successResponse } = require("../utilities/utilities");
const dotenv = require('dotenv');

dotenv.config();

let secret_key = process.env.SECRET_KEY;

// let secret_key = "jnckdbuisdfhduasihnfi851";

function verifyToken(req, res, next) {

    // check headers
    let bearerHeader = req.headers["authorization"];

    console.log("----------bearerHeader", bearerHeader);

    if (typeof bearerHeader === undefined) {
        return res.status(400).json(failureResponse("failure", "invalid token"));
    }
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    console.log("token issssssssss", token);
    req.toeken = token;
    next();

    jwt.verify(req.toeken, secret_key, (err, decoded) => {
        if (err) {
            return res.status(401).json(failureResponse("failure", "session is expired , please login again", err))
        }

        console.log("decoded user data is ", decoded);

        return res.status(200).json(successResponse("success","successfully authorised ", "decoded"));
    })

}


module.exports = verifyToken; */

const jwt = require("jsonwebtoken");
const { failureResponse, successResponse } = require("../utilities/utilities");
const dotenv = require('dotenv');

dotenv.config();

let secret_key = process.env.SECRET_KEY;

async function verifyToken(req, res, next) {
    try {
        // Check headers
        let bearerHeader = req.headers["authorization"];
        console.log("----------bearerHeader", bearerHeader);

        if (typeof bearerHeader === "undefined") {
            return res.status(400).json(failureResponse("failure", "Invalid token"));
        }

        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        console.log("Token is:", token);

        // Attach token to req.token (not req.toeken)
        req.token = token;

        // Verify the token using async/await
        const decoded = await jwt.verify(req.token, secret_key);

        console.log("Decoded user data is", decoded);

        // Attach decoded data to req.userData
        req.userData = decoded;
        return res.status(200).json(successResponse("success","successfully authorised ", req.userData));


        // Continue to the next middleware or route handler
        next();
    } catch (err) {
        return res.status(401).json(failureResponse("failure", "Session is expired, please login again", err));
    }
}

module.exports = verifyToken;

