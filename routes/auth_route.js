const express=require("express");
const { login, signUp, Logout } = require("../controller/auth_controller");
const router=express.Router();

router.get("/login",(req,res)=>{
  res.render("Home/login.ejs");
})
router.post("/login",login)
router.get("/signup",(req,res)=>{
  res.render("Home/signup.ejs");
})
router.post("/signup",signUp);
router.get("/logout",Logout);
module.exports=router