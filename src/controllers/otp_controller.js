const database = require("../../config/database_config");
const {successResponse, failureResponse} = require("../../src/utilities/utilities");


const sendOtpApi = async (req, res) => {
    try {
        const {mobile_number} = req.body;

      if(!mobile_number) {
            res.status(401).json(failureResponse("failure", "please provide valid mobile number"));
         }

         else  {

            function otpgenerate() {
                const otp_length = 6;
                let otp = "";
                for(let i=0; i<otp_length; i++) {
                    otp += Math.floor(Math.random() * 10);
                }
                return otp;
            }

            const otp = otpgenerate();
            console.log(`six digit otp is ${otp}`);

            const isDataExists = await database.models.otp_models.findOne({
                where : {
                    mobile_number : mobile_number
                }
            })

            console.log("isDataExists;;;;;;;;   is ",isDataExists);

            if(isDataExists === null) {
                

            // create otp for new users
            const create_otp = await database.models.otp_models.create({mobile_number, otp});
            res.status(201).json(successResponse("success","otp created suucessfully",create_otp));
            }
           
            else {
                //updating the otp for existing mobile number
             await database.models.otp_models.update({otp},{
                where : {
                    mobile_number : mobile_number
                }
            })
            //fetch the updated otp from the database

            const updated_otp_data = await database.models.otp_models.findOne({
                where : {
                    mobile_number : mobile_number
                }
            })
             res.status(201).json(successResponse("success","otp created suucessfully", updated_otp_data)); 

            }



        
 }
     } catch(error) {
        console.log("error***********",error);
        res.status(500).json(failureResponse("failure", "something went wrong", error));
    }
}

const otpverifyAPi = async (req, res) => {
    try {
         const mobile_number = req.body.mobile_number;
         const otp = req.body.otp;

         if(!mobile_number) {
            res.status(401).json(failureResponse("failure", "please provide valid mobile number"));

         }
         else if(!otp) {
            res.status(401).json(failureResponse("failure", "please provide valid otp"));
 
         } else {
            await database.models.otp_models.findOne({
                mobile_number : mobile_number
            })
             
            const verifyOtpData = await database.models.otp_models.update({
                isVerified : true
            },{
                where : {
                    mobile_number : mobile_number
                }
            })

            await database.models.otp_models.update({otp : null},{
                where : {
                    mobile_number : mobile_number
                }
            }); 

           res.status(201).json(successResponse("success",'otp updated successfully on existing mbile number', verifyOtpData));  
         }
    } catch(error) {
        res.status(500).json(failureResponse("failure", "something went wrong", error));

    }
}


module.exports = {sendOtpApi, otpverifyAPi};