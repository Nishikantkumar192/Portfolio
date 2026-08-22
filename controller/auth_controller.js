const ExpressError = require("../ExpressError");
const User = require("../models/user_model");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs")

module.exports.login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user) return next(new ExpressError(404,"Invalid Credentials"));
        const isValid=bcrypt.compareSync(password,user.password);
        if(!isValid) return next(new ExpressError(404,"Invalid Credentials"));
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.TOKEN_EXPIRE});
        res.cookie("proToken",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000
        })
        res.redirect("/portfolio");
    }catch(err){
        next(err);
    }
}
module.exports.signUp=async(req,res,next)=>{
    try{
        const {username,email,password}=req.body;
        if(!username || !email || !password) return next(new ExpressError(400,"credentials missing"));
        const user=await User.findOne({email});
        if(user) return next(new ExpressError(403,"please choose another email"))
        const salt=bcrypt.genSaltSync(10);
        const hashPasssword=bcrypt.hashSync(password,salt);
        const newUser=await User.create({
            ...req.body,
            password:hashPasssword
        })
        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:process.env.TOKEN_EXPIRE});
        res.cookie("proToken",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000
        })
        res.redirect("/portfolio");
    }catch(err){
        next(err);
    }
}
module.exports.Logout=(req,res)=>{
    res.clearCookie("proToken",{
        httpOnly:true,
        secure:true,
        sameSite:"none",
    })
    res.redirect("/")
}