module.exports = (sequelize, DataTypes) => {
    const admin = sequelize.define("admin", {
        mobile_number : {
            type : DataTypes.STRING
        },
        admin_name : {
            type : DataTypes.STRING
         },
         password : {
            type : DataTypes.STRING
         },
         confirm_password : {
            type : DataTypes.STRING
         },
         address : {
            type : DataTypes.STRING
         },
         shop_image : {
            type : DataTypes.STRING
         }
    })
    return admin;
}