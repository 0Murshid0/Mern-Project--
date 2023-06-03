const mongoose = require("mongoose");

//==============get mongo db url=========
const DB_URI = process.env.DATABASE;
const mongodbconnection = () => {
  mongoose
    .connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongodbconnection;
