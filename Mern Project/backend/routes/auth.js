const express = require("express");
const jwt = require("jsonwebtoken");
const authenticate = require("../middelware/authenticate");
const router = express.Router();
const bcrypt = require("bcryptjs");

require("../config/database");

const User = require("../model/userSchema");

const privateKey = process.env.PRIVATE_KEY;

//Home page

router.get("/", (req, res) => {
  res.send(`Hello i working router.js`);
});

//user register

router.post("/register", async (req, res) => {
  //============================================================================================
  //  destruter the body

  const { name, email, phone, work, password, cpassword } = req.body;

  //**if user miss field it show a error

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(420).json({ error: "please fill all fields" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ error: "Email Already Exist" });
    } else if (password !== cpassword) {
      return res.status(400).json({ error: "password are not matching " });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hashSync(password, salt); //hashing the password

      const user = new User({
        name,
        email,
        phone,
        work,
        password: hashPassword,
      });

      const userSaved = await user.save();

      res.status(200).json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

//login user
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "plz filled valid data" });
    }

    const userlogin = await User.findOne({ email: email });
    // console.log(userlogin);
    //now we check the password user enter is matched with already present in db or not
    if (userlogin) {
      const isMatch = await bcrypt.compareSync(   //sync used to avoid the promise
        password /* req.body wala password jo user enter kare ga*/,

        userlogin.password
      );

      if (!isMatch) {
        res.json({ error: "password does not match " });
      } else {

       const token = jwt.sign({
           userId:userlogin._id
       } ,privateKey)
      //  console.log(token);

        res.status(200).json({ token });
      }
    } else {
      res.status(400).json({ error: "Invalid CredIentialS  " });
    }
  } catch (error) {
    console.log(error);
  }
});




//--------------- get user data-----------

router.get("/getdata", authenticate, async(req, res) => {
  
       try{
        // console.log(req.userId)
        // Find the user based on the token and ID
        const rootUser = await User.findOne({_id: req.userId})
        .select({password:0}); //0 means fales

          //  console.log(rootUser);

        if (!rootUser._id) {
          throw new Error("Unauthorized: User not found");
        }

        res.json(rootUser)
       }
       catch(error){
              res.json(error);
       }
});
//============for contact ===================

router.post("/contact",authenticate, async (req,res)=>{
  try {
      const {name,email,phone,message} = req.body;
      if(!name || !email || !phone || !message){
        console.log("Error in contact form")
         return res.json({error:"plz fill the contact form"})
        }
        // console.log(req.userId);
        const userContact = await User.findOne({_id:req.userId})
        // console.log(userContact);
        if(userContact) { 
          const userMessage = await User.updateOne({_id:req.userId},{
           $push: { messages : {name,email,phone,message} }
          })
          console.log(userMessage)
          await userContact.save();
          res.status(200).json({message:"User Contact"}); 
        }
  //for logout page
   
  router.get("/Logout", (req,res) =>{
    // console.log("Hello logout")
    // localStorage.removeItem('token');
    res.status(200).send("User logout")
  })

  } catch (error) {
       console.log(error)
  }
})
module.exports = router;
