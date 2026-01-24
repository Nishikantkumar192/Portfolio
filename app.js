const express=require("express");
const port=8080;
const app=express();
const engine=require("ejs-mate");

const path=require("path");
app.use(express.static(path.join(__dirname,"public")));
app.engine("ejs",engine);
app.set("view-engine","ejs");

app.listen(port,()=>{
    console.log(`app is listening through port ${port}`);
})

app.get("/",(req,res)=>{
    res.redirect("/portfolio")
})
app.get("/portfolio",(req,res)=>{
    res.render("Home/home.ejs");
})