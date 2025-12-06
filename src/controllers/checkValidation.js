

function validator(req,res,next){

    const {projectName,headline}=req.body;

    if(!projectName &&!headline){
        return res.status(400).json({message:"please enter projectName or headline"});
    }
    next();
  
}


module.exports=validator;