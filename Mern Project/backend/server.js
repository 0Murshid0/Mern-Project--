//import dotenv
const dotenv = require("dotenv");
//import express
const express = require("express");




//import cors
const cors = require("cors");
//declare app = to express
const app = express();
// app.use(cors());
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


//============= CONNECT TO DOTENV========
dotenv.config({ path: "./config/config.env" });

//import database
const mongodbconnection = require("./config/database");

//connected with DB
mongodbconnection();

//imort user
// const User = require("./model/userSchema");

// User();

//===============Link with Router file==================
app.use( "/auth" ,require("./routes/auth"));




//============Run On Port====================
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
