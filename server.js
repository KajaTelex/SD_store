const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const dotenv =require("dotenv");


const database = require("./config/database_config");

const userRoutes = require("./src/routes/user_routes");
const otpRoutes = require("./src/routes/otp_routes");
const catagoryRoutes = require("./src/routes/catagory_routes");
const userCatagoryRoutes = require("./src/routes/userCatagory_routes");



corsOptions = {
  origin : "*",
  corsSuccessStatus : 200
};

const PORT = 5001 || process.env.PORT;
const app = express();
dotenv.config();

app.use(bodyParser.json());

app.use("/api",userRoutes);
app.use("/api",otpRoutes);
app.use("/api", catagoryRoutes);
app.use("/api",userCatagoryRoutes);

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
.catch(()=> {
    console.log("model is unable to synchronised with databse ");

});

init();