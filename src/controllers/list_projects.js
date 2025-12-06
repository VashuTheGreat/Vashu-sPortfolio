
const fs=require("fs")
const PATH = require('path');

const data_file_path = PATH.join(__dirname, '../db/data.json');
const other_data_file_path=PATH.join(__dirname,"../db/otherAct.json")

const {readFile,writeFile}=require("./readwriteFile")


function project_list(req,res){
    return res.status(200).json(readFile(data_file_path));
}



function otherproject_list(req,res){
    return res.status(200).json(readFile(other_data_file_path));
}


module.exports={project_list,otherproject_list};