const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const dotenv =require("dotenv");
const helmet = require("helmet");


const database = require("./config/database_config");

const adminRoutes = require("./src/routes/admin_routes");

const userRoutes = require("./src/routes/user_routes");
const otpRoutes = require("./src/routes/otp_routes");
const catagoryRoutes = require("./src/routes/catagory_routes");
const userCatagoryRoutes = require("./src/routes/userCatagory_routes");

const offerRoutes = require("./src/routes/offer_routes"); 
const productROutes  =require("./src/routes/products_routes");
const imageRoutes = require("./src/routes/image_routes");


corsOptions = {
  origin : "*",
  corsSuccessStatus : 200
};

const PORT = 5001 || process.env.PORT;
const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true , limit : "100mb"}));
app.use(helmet());

app.use("/api", adminRoutes);
app.use("/api",userRoutes);
app.use("/api",otpRoutes);
app.use("/api", catagoryRoutes);
app.use("/api",userCatagoryRoutes);
app.use(" /api",offerRoutes);
app.use("/api",productROutes);
app.use("/api",imageRoutes);

async function init() {
  try {
  
    await database.instanceSequelize.authenticate();
    console.log("mysql database successfully connected");

    app.use(compression());
    app.use(cors(corsOptions));

    app.listen(PORT, () => {
        console.log(`server starts to connected successfully  ${PORT}`);
    })
  }catch(error){
     console.log("unable to connect mysql database");
  }
}


database.instanceSequelize.sync({force:false})
.then(() => {
    console.log("model is synchronised with databse successfully");
})
.catch((error)=> {
    console.log("model is unable to synchronised with databse ", error);

});

init();