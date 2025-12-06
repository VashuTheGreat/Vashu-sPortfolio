const express=require("express");

const PATH=require("path");
const fs = require("fs");
const archiver=require("archiver")

const {project_submit,otherproject_submit}=require("./controllers/submit");

const validator=require("./controllers/checkValidation");
const {project_list,otherproject_list}=require("./controllers/list_projects");


const {delete_by_id,update_by_id,otherdelete_by_id,otherupdate_by_id}=require("./controllers/delete_update");
const {rankFile,otherrankFile}=require("./controllers/rankFile");
const upload=require("./controllers/uploadFile")
const app=express();

ADMIN_PASSWORD="a";


app.set("view engine", "html");
app.set("views", PATH.join(__dirname, "./"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(PATH.join(__dirname, "public")));


app.get("/",(req,res)=>{
    res.sendFile(PATH.join(__dirname, "./templates/index.html"));
});
app.get("/getenv", (req, res) => {
    const filePath = PATH.join(__dirname, "./db/.env.json");
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: "Failed to read JSON file" });
        }
        try {
            const jsonData = JSON.parse(data);
            console.log(jsonData)
            res.json(jsonData); 

        } catch (parseErr) {
            console.error(parseErr);
            res.status(500).send({ error: "Invalid JSON file" });
        }
    });
});
app.get("/download_data",(req,res)=>{
  const files=[
  PATH.join(__dirname,"./db/data.json"),
    PATH.join(__dirname,"./db/otherAct.json"),
  PATH.join(__dirname,"./db/.env.json")

  ]
  res.setHeader('Content-Disposition', 'attachment; filename=all_files.zip');

  const archive=archiver('zip')
  archive.pipe(res)
  files.forEach(file=>{
    archive.file(file,{name:PATH.basename(file)})
  })
  archive.finalize()
})


app.get("/admin", (req, res) => {
    console.log(req.query)
  const { password } = req.query;

  if (password === ADMIN_PASSWORD) {
    res.sendFile(PATH.join(__dirname, "./templates/admin.html"));
  } else {
    res.status(401).send("Invalid user");
  }
});

app.get("/about",(req,res)=>{
    res.sendFile(PATH.join(__dirname,"./templates/about.html"))
})


app.get("/contact",(req,res)=>{
    res.sendFile(PATH.join(__dirname,"./templates/contact.html"))
})

app.get("/otheractivities",(req,res)=>{
    res.sendFile(PATH.join(__dirname,"./templates/otherActivities.html"))
})


app.post("/project/submit", validator,project_submit);

// Backwards-compatible list route
app.get("/fetch/projects", project_list);

// New route used by the front-end UI: returns array of projects
app.get('/projects', project_list);

// Provide POST endpoints for delete/update (frontend uses POST)
app.post('/project/delete/:id', (req,res,next)=>{ req.params = req.params || {}; req.params.id = req.params.id || req.params.id; next(); }, delete_by_id);
app.post('/project/update/:id', (req,res,next)=>{ req.params = req.params || {}; req.params.id = req.params.id || req.params.id; next(); }, update_by_id);

// Existing delete/put (keep for compatibility)
app.delete("/delete/prject/:id",(req,res,next)=>{req.id=req.params.id;next();},delete_by_id);
app.put("/update/project/:id",(req,res,next)=>{req.id=req.params.id;next();},update_by_id)
app.get("/rankFile",rankFile)




// other activities

app.post("/other/project/submit", validator,otherproject_submit);

// Backwards-compatible list route
app.get("/other/fetch/projects", otherproject_list);

// New route used by the front-end UI: returns array of projects
app.get('/other/projects', otherproject_list);

// Provide POST endpoints for delete/update (frontend uses POST)
app.post('/other/project/delete/:id', (req,res,next)=>{ req.params = req.params || {}; req.params.id = req.params.id || req.params.id; next(); }, otherdelete_by_id);
app.post('/other/project/update/:id', (req,res,next)=>{ req.params = req.params || {}; req.params.id = req.params.id || req.params.id; next(); }, otherupdate_by_id);

// Existing delete/put (keep for compatibility)
app.delete("/other/delete/prject/:id",(req,res,next)=>{req.id=req.params.id;next();},otherdelete_by_id);
app.put("/other/update/project/:id",(req,res,next)=>{req.id=req.params.id;next();},otherupdate_by_id)
app.get("/other/rankFile",otherrankFile)

app.post("/upload",upload.single("file"),(req,res)=>{
    console.log(req.file)
    res.send({
      message:"file uploaded",
      file:req.file
    })
})

app.use("/",(req,res)=>{
    res.sendFile(PATH.join(__dirname,"./templates/404.html"))
})




module.exports=app;


