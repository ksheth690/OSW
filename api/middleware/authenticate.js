const jwt= require("jsonwebtoken");
const Admin = require("../models/Admin");

const authenticate = async(req,res,next)=>{
    try{
        const token=req.cookies.jwtoken;
        const verifytoken=jwt.verify(token,process.env.TOKEN_KEY);
        const admin=await Admin.findOne({_id:verifytoken._id});
        if(!admin) {
            throw new Error("No admin found");
        }
        req.token=token;
        req.admin=admin;
        req.userID=admin._id;
        next(); 
    }catch(e){
        res.status(401).send('unauthorized user');
        console.log(e);
    }
}
module.exports = authenticate;
