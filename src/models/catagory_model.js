module.exports = (sequelize, DataTypes ) => {
    const catagory = sequelize.define("catagory", {
       
        catagory_name : {
            type : DataTypes.STRING,
        },
        catagory_image : {
            type : DataTypes.STRING
        },
        catagory_possition : {
            type : DataTypes.STRING
        },
        
    })

    return catagory;
}