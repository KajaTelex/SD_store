module.exports = (sequelize, DataTypes) => {
    const userCatagory = sequelize.define("userCatagory", {
        
        user_name: {
            type: DataTypes.STRING,
        },
        catagory_name: {
            type: DataTypes.STRING,
        }

    })

    return userCatagory;
}