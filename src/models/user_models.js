module.exports = (sequelize, DataTypes)  => {
    const user = sequelize.define("user", {
        mobile_number : {
            type : DataTypes.STRING,
            unique : true
        },
        user_name : {
        type : DataTypes.STRING,
        },
        password  :{
            type : DataTypes.STRING
        },
        confirm_password : {
            type : DataTypes.STRING
         },
        
    })

    return user;
}