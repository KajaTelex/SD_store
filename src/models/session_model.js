module.exports = (sequelize, DataTypes)  => {
    const session = sequelize.define("session", {
        mobile_number : {
            type : DataTypes.STRING,
        },
        jwt_token  :{
            type : DataTypes.TEXT,
            allowNull : false
        },
        status : {
            type : DataTypes.STRING,

         }
        
    })

    return session;
}