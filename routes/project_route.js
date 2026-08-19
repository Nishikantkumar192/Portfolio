const express=require("express");
const router=express.Router();
const multer=require("multer");
const storage=require("../cloudinaryconfig.js");
const upload=multer(storage);

router.get("/",(req,res)=>{
    res.render("Home/home.ejs");
})
router.get("/add-project",(req,res)=>{
    res.render("Home/addProject.ejs");
})
router.post("/new-project",upload.single("images"),(req,res)=>{
    try{

    }catch(err){
        console.log(err);
    }
})
module.exports=router;