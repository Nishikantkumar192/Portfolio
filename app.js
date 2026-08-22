const dotenv=require("dotenv");
dotenv.config();
const express=require("express");
const port=process.env.PORT;
const app=express();
const engine=require("ejs-mate");
const mongoose=require("mongoose");
const cookieParser=require("cookie-parser");
const path=require("path");
const ExpressError = require("./ExpressError");

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));
app.engine("ejs",engine);
app.set("view-engine","ejs");

// Router
const project=require("./routes/project_route.js");
const auth=require("./routes/auth_route.js");
const { isUserExist } = require("./middleware.js");

// Connecting data-base
const dbUrl=process.env.MONGODB_URL;
main().then(()=>{
    console.log("Connected successfully");
}).catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect(dbUrl);
}
app.use(isUserExist);

app.get("/",(req,res)=>{
    res.redirect("/portfolio");
})
app.use("/portfolio",project);
app.use("/auth",auth)
// Error handling
app.use((req,res,next)=>{
    return next(new ExpressError(404,"Page not found"));
})
app.use((err,req,res,next)=>{
    const {status=500,message="Server Error"}=err;
    res.status(status).send(message);
})

app.listen(port,()=>{
    console.log(`app is listening through port ${port}`);
})