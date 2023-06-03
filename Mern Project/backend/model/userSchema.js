const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please enter email"],
  },
  phone: {
    type: Number,
    required: [true, "please enter Number"],
  },
  work: {
    type: String,
    required: [true, "please enter work details"],
  },
  password: {
    type: String,
    required: [true, "please enter password"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  messages: [
    {
      any: mongoose.Mixed,  
    },
  ],
});
   





const User = mongoose.model("USERS", userSchema);
//this mean we can anywhere access User
module.exports = User;



// name: {
//   type: String,
//   required: [true, "please enter name"],
  
// },
// email: {
//   type: String,
//   required: [true, "please enter email"],
// },
// phone: {
//   type: Number,
//   required: [true, "please enter Number"],
// },
// message: {
//   type: String,
//   required: [true, "please enter work details"],
// },