module.exports = (sequelize, DataTypes) => {
    const image = sequelize.define("image", {
        
        product_name : {
            type : DataTypes.BLOB

        },
        product_image : {
            type : DataTypes.STRING
        
        }
    })
    return image;
}