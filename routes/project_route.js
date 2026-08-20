const express = require("express");
const router = express.Router();
const storage = require("../cloudinaryConfig.js");
const multer = require("multer");
const upload = multer({ storage: storage });
const Project = require("../models/project_model.js");

// fetching projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.render("Home/home.ejs", { projects });
  } catch (err) {
    res.send(err);
  }
});

router.get("/particular-project/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    res.render("Home/particularProject.ejs", { project });
  } catch (err) {
    res.send(err);
  }
});
// Add new project
// router.get("/add-project", (req, res) => {
//   res.render("Home/addProject.ejs");
// });

// router.post("/new-project", upload.array("images", 5), async(req, res) => {
//   try {
//     const imageCollection=req.files.map((image)=>({
//         url:image.path,
//         filename:image.filename
//     }))
//     const new_project=await Project.create({
//         ...req.body,
//         images:imageCollection
//     })
//     res.redirect("/portfolio");
//   } catch (err) {
//     console.log(err);
//   }
// });
module.exports = router;
