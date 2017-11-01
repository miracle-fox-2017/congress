const express=require("express");
const router=express.Router();

const Top5=require("../model/top-5");

router.get("/",(req,res)=>{
    Top5.getData().then((rows)=>{
        let politikus=[];
        let jumlahPemilih=[];
        for(let i=0;i < rows.length;i++){
            if(!politikus.includes(rows[i].name)){
                politikus.push(rows[i].name);
                jumlahPemilih.push(rows[i].sort);
            }
        };
        let pemilih=[];
        for(let i=0;i < politikus.length;i++){
            let tampung=[];
            for(let j=0;j < rows.length;j++){
                if(rows[j].name == politikus[i]){
                    tampung.push(rows[j].first_name);
                }
            }
            pemilih.push(tampung);
        };
        res.render("top-5",{politikus:politikus,jumlahPemilih:jumlahPemilih,pemilih:pemilih});
    }).catch((err)=>{
        res.send(err);
    });
});

module.exports=router;
