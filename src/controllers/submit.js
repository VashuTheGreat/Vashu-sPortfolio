const fs=require("fs")

const PATH=require("path")

const data_file_path = PATH.join(__dirname, '../db/data.json');
const other_data_file_path = PATH.join(__dirname, '../db/otherAct.json');
const {readFile,writeFile}=require("./readwriteFile")






function project_submit(req,res){
    console.log("received");
    console.log(req.body);

const {
  projectName = null,
  videoLink= null,
  
} = req.body;

const entry = {
    id:readFile(data_file_path).length+1,
  projectName,
  videoLink,
};






writeFile(entry,data_file_path);

            res.redirect("/");

    
}



function otherproject_submit(req,res){
    console.log("received");
    console.log(req.body);

const {
  headline = null,
  
  videoLink= null,
} = req.body;

const entry = {
    id:readFile(other_data_file_path).length+1,
  headline,
  videoLink,
};






writeFile(entry,other_data_file_path);

            res.redirect("/");

    
}


module.exports={project_submit,otherproject_submit};