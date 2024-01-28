module.exports = (sequelize, DataTypes) => {
    const product = sequelize.define("product", {
        product_name : {
            type : DataTypes.STRING,
            allowNUll: false

        }, 
        price : {
            type : DataTypes.DOUBLE,
            allowNUll: false

        },
        Description : {
            type : DataTypes.TEXT,
            allowNUll: false

        },
    
        discount : {
            type : DataTypes.DOUBLE,
          }
        
    })

    return product;
}