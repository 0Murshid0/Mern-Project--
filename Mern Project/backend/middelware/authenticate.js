const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");


const authenticate = async (req, res, next) => {
  
  try {
    const token = req.headers.authorization; // Check the cookies for the JWT token
    // console.log(token)
    if (!token)
    {
      throw new Error("Unauthorized: No Token Provided");
    }

    const verifiedToken = jwt.verify(token, process.env.PRIVATE_KEY); // Verify the token using the secret key
  //  console.log(verifiedToken)
    req.userId = verifiedToken.userId;
   // Move to the next middleware
   

    next();   

  } catch (error)
  {
    res.status(420).json({ error: "Unauthorized: No Token Provided" });
    
    console.log(error);
  }
};
module.exports= authenticate;

