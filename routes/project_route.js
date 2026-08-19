const express=require("express");
const router=express.Router();
const storage=require("../cloudinaryConfig.js");
const multer=require("multer");
const upload=multer(storage);


router.get("/",(req,res)=>{
    res.render("Home/home.ejs");
})
router.get("/add-project",(req,res)=>{
    res.render("Home/addProject.ejs");
})
router.post("/new-project",upload.array("images",5),(req,res)=>{
    try{
        console.log(req.files)
        console.log("req.body---------------->>>>>>>>>>")
        console.log(req.body)
        res.send("work successfully")
    }catch(err){
        console.log(err);
    }
})
module.exports=router;