const express=require("express");
const router=express.Router();

const Fraud=require("../model/fraud");

router.get("/",(req,res)=>{
    Fraud.getFraud().then((rows)=>{
        res.render("fraud",{rows:rows});
    }).catch((err)=>{
        res.send(err);
    });
});

module.exports=router;
