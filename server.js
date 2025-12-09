const express=require("express");
const axios =require("axios")
const url="https://vashu-sportfolio.onrender.com/";

const interval_time=30000;

setInterval(()=>{
    axios.get(url).then((data)=>{
        console.log("website loaded");
    })
    .catch((err)=>{
        console.log("error occured")
    })


},interval_time);



const app=require("./src/app")



const PORT=3000;



app.listen(PORT,()=>{
    console.log(`server is listening at http://localhost:${PORT}`);
})