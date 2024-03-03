const jwt= require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

const authenticateuser = async(req,res,next)=>{
    try{
        const token=req.cookies.jwtoken;
        const verifytoken=jwt.verify(token,process.env.TOKEN_KEY);
        const admin = await Admin.findOne({_id:verifytoken._id});
        const user=await User.findOne({_id:verifytoken._id});
        if(!user && !admin) {
            throw new Error("No user found");
        }
        if(user){
            req.token=token;
        req.user=user;
        req.userID=user._id;
        }
        if(admin){
            req.token=token;
        req.user=admin;
        req.userID=admin._id;
        }
        next(); 
    }catch(e){
        res.status(401).send('unauthorized user');
        console.log(e);
    }
}
module.exports = authenticateuser;
