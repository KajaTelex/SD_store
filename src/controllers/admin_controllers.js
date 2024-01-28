const database = require("../../config/database_config");
const { successResponse, failureResponse } = require("../../src/utilities/utilities");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const upload = require("../middleware/multerSetUp");

       
 const createAdminApi = async (req, res) => {
    try {
        upload.single('shop_image'),(req,res) => {
            if(req.file) {
                res.status(200).json(successResponse("success","image uploaded successfully",req.file))
              }

              else{
                res.status(400).json(failureResponse("failure","please upload valid image",req.file))

              }
        }
             const shop_image = req.file;
             const { mobile_number, admin_name, password, confirm_password, address, catagoryId} = req.file;

            const isAdminAvailable = await database.models.admin_model.findOne({
                where: {
                    mobile_number: mobile_number
                }
            })

            console.log("isAdminAvailable--------", isAdminAvailable);

            

            if (!mobile_number) {
                return res.status(404).json(failureResponse("failure", "provide valid mobile number"));
            }


            else if (!admin_name) {
                return res.status(404).json(failureResponse("failure", "provide valid admin"));
            }

            else if (!password) {
                return res.status(404).json(failureResponse("failure", "provide valid password"));
            }

            else if (!confirm_password) {
                return res.status(404).json(failureResponse("failure", "provide valid confirm_password"));
            }
            else if (password !== confirm_password) {
                return res.status(404).json(failureResponse("failure", "provide same password and confirm password"));
            }
            else if (!address) {
                return res.status(404).json(failureResponse("failure", "provide valid address"));
            }
            else if(!catagoryId) { 
                return res.status(404).json(failureResponse("failure", "provide valid address"));

            }
            else if(!shop_image) {

            }


            else if (isAdminAvailable !== null) {
                return res.status(401).json(failureResponse("failure", "admin already exists"))
            }
            

            else {

                const adminData = await database.models.admin_model.create({
                    mobile_number, admin_name, password, confirm_password, address,catagoryId, shop_image
                });
                res.status(200).json(successResponse("success", "admin regisrered successfully", adminData));

            }

        } catch (error) {
            console.log("error isssssssssss",error);
            res.status(500).json(failureResponse("failure", "something went wrong", error));
        }
    }
        
const getAdminByMobileNum = async (req, res) => {
        try {
            const mobile_number = req.params.mobile_number;
            const getAdmindata = await database.models.admin_model.findOne({
                where: {
                    mobile_number: mobile_number
                }
            });
            res.status(201).json(successResponse("success", "found admin details", getAdmindata));


        } catch (error) {
            res.status(500).json(failureResponse("failure", "something Went wrong", error));
        }
    }

    const updateAdminApi = async (req, res) => {
        try {
            const mobile_number = req.params.mobile_number;
            const admin_name = req.body.admin_name;

            const admin = await database.models.admin_model.findOne({
                where: {
                    mobile_number: mobile_number
                }
            });

            console.log("admin------------------", admin);

            if (!mobile_number) {
                res.status(404).json(failureResponse("failure", "Please provide valid mobile number"));

            }

            else if (!admin) {
                res.status(404).json(failureResponse("failure", "admin not found"));

            }

            else {

                const updateVendorData = await database.models.admin_model.update(
                    {
                        admin_name: admin_name,

                    },
                    {
                        where: {
                            mobile_number: mobile_number
                        }
                    }
                );

                res.status(200).json(successResponse("success", "admin data updated successfully", updateVendorData));

            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json(failureResponse("failure", "admin data not updated successfully", error));
        }
    }

    const deleteAdminByMobileNum = async (req, res) => {
        try {
            const mobile_number = req.params.mobile_number;
            const deleteAdmindata = await database.models.admin_model.destroy({
                where: {
                    mobile_number: mobile_number
                }
            });
            res.status(201).json(successResponse("success", "found admin details", deleteAdmindata));


        } catch (error) {
            res.status(500).json(failureResponse("failure", "something Went wrong", error));
        }
    }


    const forgetPassword_otpSendApi = async (req, res) => {

        try {
            const mobile_number = req.body.mobile_number;

            if (!mobile_number) {
                res.status(401).json(failureResponse("failure", "please provide valid mobile number "));
            } else {
                function otpgenerate() {
                    const otp_lenght = 6;
                    let otp = "";
                    for (let i = 0; i < otp_lenght; i++) {
                        otp += Math.floor(Math.random() * 10);
                    }
                    return otp;
                }

                const otp = otpgenerate();
                console.log(`random 6 digits otp is ${otp}`);

                // update the otp for existing mobile number
                const forgetOtpUpdate = await database.models.otp_models.update({ otp }, {
                    where: {
                        mobile_number: mobile_number
                    }
                });

                console.log("FFFFFFFFFF", forgetOtpUpdate.otp);

                // fetch the otp data from database
                const updated_otp = await database.models.otp_models.findOne({
                    where: {
                        mobile_number: mobile_number
                    }
                })

                console.log("UUUUUUUUUUU", updated_otp.otp);
                res.status(201).json(successResponse("success", "Otp Send Successfully", updated_otp));

            }
        } catch (error) {
            res.status(500).json(failureResponse("failure", "something went wrong", error));
        }
    }

    const verifyOTP_resetPasswordApi = async (req, res) => {
        try {
            const { mobile_number, otp, password, confirm_password } = req.body;

            const isExistingOtp = await database.models.otp_models.findOne({
                where: {
                    mobile_number
                }
            });

            console.log("isExistingOtp is==========", isExistingOtp);

            if (!mobile_number) {
                res.status(400).json(failureResponse("failure", "Please provide valid mobile number"));
            }

            else if (!otp) {
                res.status(400).json(failureResponse("failure", "Please provide valid otp"));
            }
            else if (isExistingOtp.otp !== otp) {
                console.log("checking the otpppppppppppppppp", isExistingOtp.otp, otp)
                res.status(400).json(failureResponse("failure", "Please provide valid otp which u got in ur mobile number"));

            } else if (!password) {
                res.status(400).json(failureResponse("failure", "Please provide valid password"));

            }
            else if (!confirm_password) {
                res.status(400).json(failureResponse("failure", "Please provide valid confirm_password"));

            } else if (password !== confirm_password) {
                res.status(400).json(failureResponse("failure", "Please provide same password and confirm_password"));

            } else {

                const updatedPwd_data = await database.models.admin_model.update({
                    password: password,
                    confirm_password: confirm_password
                }, {
                    where: {
                        mobile_number: mobile_number
                    }
                })


                await database.models.otp_models.update({ otp: null }, {
                    where: {
                        mobile_number: mobile_number
                    }
                })

                res.status(201).json(successResponse("success", "reset the password successfully", updatedPwd_data))
            }
        } catch (error) {
            console.log("erorrrrrrrrrrrrrrrrrrr", error);
            res.status(500).json(failureResponse("failure", "something went wrong", error));

        }
    }

    const adminLoginApi = async (req, res) => {
        try {
            const mobile_number = req.body.mobile_number;
            const password = req.body.password;
            let secret_key = process.env.SECRET_KEY;
            console.log("...........", secret_key);

            const admin = await database.models.admin_model.findOne({
                where: {
                    mobile_number: mobile_number
                }
            });

            const expiryOptions = {
                expiresIn: '1h'
            }

            if (!admin) {
                res.status(404).json(failureResponse("failure", "user not found, please sign up first"));

            }
            else if (!password) {
                res.status(401).json(failureResponse("failure", "please enter valid password"));

            }

            else if (password !== admin.password) {
                res.status(401).json(failureResponse("failure", "please enter correct password"));

            }

            else {

                let jwt_token = jwt.sign({ admin }, secret_key, expiryOptions);

                console.log("generetaed token is ", jwt_token);

                // upadte session model 
                await database.models.session_models.create({
                    mobile_number: admin.mobile_number,
                    jwt_token: jwt_token,
                    status: "valid"
                })

                res.status(200).json(successResponse("success", "user is login successfully", jwt_token));

            }
        } catch (error) {
            console.log("error is .............", error);
            res.status(500).json(failureResponse("failure", "something went wrong", error));

        }
    }


    module.exports = { createAdminApi, getAdminByMobileNum, updateAdminApi, deleteAdminByMobileNum, forgetPassword_otpSendApi, verifyOTP_resetPasswordApi, adminLoginApi };