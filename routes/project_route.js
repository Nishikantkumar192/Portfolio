const express = require("express");
const router = express.Router();
const storage = require("../cloudinaryConfig.js");
const multer = require("multer");
const upload = multer({ storage: storage });
const Project = require("../models/project_model.js");
const ExpressError = require("../ExpressError.js");
const Resume = require("../models/resume_model.js");

async function getPortfolioDetails(req,res,next) {
  try{
    const projects=await Project.find();
    const resume=await Resume.findOne();
    res.render("Home/home.ejs",{projects,resume,user:res.locals.user});
  }catch(err){
    next(err);
  }
}
// fetching projects
router.get("/", async (req, res,next) => {
  try {
    getPortfolioDetails(req,res,next);
  } catch (err) {
    return next(err);
  }
});

router.get("/particular-project/:id", async (req, res,next) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    res.render("Home/particularProject.ejs", { project });
  } catch (err) {
    return next(err)
  }
});
router.get("/add-new-resume",(req,res)=>{
  res.render("Home/addResume.ejs")
})
router.post("/add-new-resume",upload.single("resume"),async(req,res,next)=>{
  try{
    const user=res.locals.user;
    if(!user || user?.role!=="admin") return next(new ExpressError(403,"Only Admin Uploads"));
    if(!req.file) return next(new ExpressError(404,"Upload Resume"));
    await Resume.findOneAndDelete();
    const url=req.file.path;
    const filename=req.file.filename;
    await Resume.create({
      ...req.body,
      resume:{url,filename}
    })
    getPortfolioDetails(req,res,next);
  }catch(err){
    next(err);
  }
})
// Add new project
router.get("/add-project", (req, res) => {
  res.render("Home/addProject.ejs");
});

router.post("/new-project", upload.array("images", 5), async(req, res) => {
  try {
      const user=res.locals.user;
      if(!user || user?.role!=="admin") return next(new ExpressError(403,"Only Admin Uploads"));
      const imageCollection=req.files.map((image)=>({
          url:image.path,
          filename:image.filename
      }))
      await Project.create({
          ...req.body,
          images:imageCollection
      })
      res.redirect("/portfolio");
  } catch (err) {
    next(err);
  }
});
module.exports = router;
