const parser=require("body-parser");
const express=require("express");

// Instance
const app=express();

// Body Parser
app.use(parser.urlencoded({extended:false}));
app.use(parser.json());

// EJS
app.set("views","./public") // Public directory
app.set("view engine","ejs"); // Template engine
app.use(express.static("./public")); // Static file

// Check Run
app.listen(3000,()=>{
    console.log("Server started!");
    console.log("Listening on port 3000");
});

// Landing Page
const index=require("./router/index");
app.use("/",index);

// Top 5 Congress
const top5=require("./router/top-5");
app.use("/top-5",top5);

// Voters
const voters=require("./router/voters");
app.use("/voters",voters);

// Kecurangan
const fraud=require("./router/fraud");
app.use("/kecurangan",fraud);
