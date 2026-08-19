const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  image: [
    {
      url: { type: String, required: true },
      filename: { type: String, required: true },
    },
  ],
  projectLink: { type: String, required: true },
  githubLink: { type: String, required: true },
});

const Project=mongoose.model("Project",projectSchema);
module.exports=Project;