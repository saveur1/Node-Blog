const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const swaggerDocumantation = require("./helper/documantation");

const mainRouter = require("./routes/blog");
const User = require("./routes/user");

//configurations
app = express();
require("dotenv").config();

//middle wares
app.use(bodyParser.urlencoded({"extended":false}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors({origin:"*"}));



//connecting to database
mongoose.set("strictQuery",true);
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:false
})
.then(result => {
    console.log("database connected successfully");
})
.catch(error => {
    console.log(error);
});

//routes
swaggerDocumantation(app);
app.use("/public",express.static("./public"));
app.use("/user",User);
app.use("/blogs",mainRouter);


//404 error handling after routers
app.use("/**",(req,res,next) => {
   const error = new Error("Page Not Found");
   error.status = 404;
   next(error);
});

//handling error
app.use((error,req,res,next) =>{
    const status = error.status || 500;
    console.log(error);
    res.status(error.status || 500).json({
        status:status,
        error:error.message
    });
});

module.exports = app;
