module.exports = (sequelize, DataTypes) => {
    const offer = sequelize.define("offer", {
        offer_type : {
            type : DataTypes.STRING
        },

        title : {
            type : DataTypes.STRING
        },
        description : {
            type : DataTypes.TEXT
        },
        price : {
            type : DataTypes.DOUBLE
        },
        offer_start_date : {
            type : DataTypes.DATE,
          },
          
          offer_end_date : {
            type : DataTypes.DATE
          },
          image : {
            type : DataTypes.STRING
          },

    })

    return offer;

}