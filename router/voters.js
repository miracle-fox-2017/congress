const express=require("express");
const router=express.Router();

const Voters=require("../model/voters");

router.get("/",(req,res)=>{
    res.render("voters",{alert:"",data:[]});
});
router.post("/",(req,res)=>{
    switch(req.body.type){
        case "name":
            if(req.body.name === ""){
                res.render("voters",{alert:"Harap isi field nama!",data:[]});
            }else{
                Voters.searchByName(req.body.name).then((rows)=>{
                    res.render("voters",{alert:"",data:rows});
                }).catch((err)=>{
                    res.send(err);
                });
            }
            break;
        case "gender":
            if(req.body.gender === ""){
                res.render("voters",{alert:"Harap pilih gender yang sesuai!",data:[]});
            }else{
                Voters.searchByGender(req.body.gender).then((rows)=>{
                    res.render("voters",{alert:"",data:rows});
                }).catch((err)=>{
                    res.send(err);
                });
            }
            break;
        case "age":
            if(req.body.minAge === "" && req.body.maxAge === ""){ // Jika kedua kolom kosong
                res.render("voters",{alert:"Harap isi salah satu kolom (Min Age)!",data:[]});
            }else if(req.body.minAge !== "" && req.body.maxAge === ""){ // Jika hanya kolom minAge yang terisi
                Voters.searchByMinAge(req.body.minAge).then((rows)=>{
                    res.render("voters",{alert:"",data:rows});
                }).catch((err)=>{
                    res.send(err);
                });
            }else if(req.body.minAge === "" && req.body.maxAge !== ""){ // Jika hanya mengisi maxAge
                res.render("voters",{alert:"Harap isi salah satu kolom (Min Age)!",data:[]});
            }else if(req.body.minAge !== "" && req.body.maxAge !== ""){ // Jika kedua kolom tidak kosong
                if(req.body.minAge > req.body.maxAge){
                    res.render("voters",{alert:"Usia min tidak bisa melebihi usia max!",data:[]});
                }else{
                    Voters.searchBetweenAge(req.body.minAge,req.body.maxAge).then((rows)=>{
                        res.render("voters",{alert:"",data:rows});
                    }).catch((err)=>{
                        res.send(err);
                    });
                }
            }
            break;
        default:
            res.render("voters",{alert:"Please select from combobox!",data:[]});
    }
});

module.exports=router;
