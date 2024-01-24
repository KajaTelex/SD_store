module.exports = (sequelize, DataTyeps) => {
    const otp = sequelize.define("otp", {
         mobile_number : {
            type : DataTyeps.STRING,
         }, 

         otp : {
            type : DataTyeps.STRING
         } ,
         isVerified : {
            type : DataTyeps.BOOLEAN,
            defaultValue : false
         }
    });
    return otp;
}