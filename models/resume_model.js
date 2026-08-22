const mongoose=require("mongoose");

const resumeSchema=new mongoose.Schema({
    resume:{
        url:{type:String,required:true},
        filename:{type:String,requied:true}
    }
})
const Resume=mongoose.model("Resume",resumeSchema);
module.exports=Resume