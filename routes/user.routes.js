const router=require('express');
const route=router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("dest");
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log("Node");
        let extension = file.mimetype.includes("pdf") && ".pdf" ||".png" || ".jpg" ;
        console.log("=======",file.mimetype);
        cb(null, file.fieldname + '-' + Date.now() + extension);
    }
});

const upload = multer({ storage: storage });


const {insert,post1,getAll,up,up1} = require('../controller/user.controller');
route.post('/',(req,res)=>{
    insert(req.body,(err,result)=>{
        //console.log(req.body)
        if (err){
            res.statusCode=400;
            res.json(err);
            console.log(err);
        }
        else if(result == null){
            res.statusCode=404;
            res.json({msg:"NOT VALID"});
            console.log("Not Valid");
        }
        else {
            res.statusCode=200;
            //res.setHeader(token,result.token);
            res.json(result);
            //console.log(result.token);
        }
    })
});
route.post('/login',(req,res)=>{
    post1(req.body,(err,result)=>{
        if (err){
            res.statusCode=400;
            console.log(err);
            res.json(err);
        }
        else if(result == null){
            res.statusCode=404;
            res.json({msg:"NOT VALID"});

        }
        else {
            res.statusCode=200;
            //res.setHeader(token,result.token);
            res.json(result);
        }
    })
});
route.get('/',(req,res)=> {
    getAll((err, result) => {
        if (err) {
            res.statusCode = 400;
            res.json(err);
        }
        else if(result == null){
            res.statusCode=404;
            res.json({msg:"NOT VALID"});

        }
        else {
            res.statusCode = 200;
            res.json(result);
        }
    })
});
route.put('/:id',(req,res)=>{
    //console.log(req);
    up1(req.params.id,(err,result)=>{
        if(err){
            res.statusCode=400;
            res.json(err);
        }
        else if(result == null){
            res.statusCode=404;
            res.json({msg:"NOT PUT"});
        }
        else {
            res.statusCode=200;
            res.json(result);
        }
    })
});
route.put('/fileupload/:id',upload.single('profile_pic'),(req,res)=>{
    up(req.params.id,req.body,req.file.filename,(err,result)=>{
        if(err){
            res.statusCode=400;
            res.json(err);
        }
        else if(result == null){
            res.statusCode=404;
            res.json({msg:"NOT PUT"});
        }
        else {
            res.statusCode=200;
            res.json(result);
        }
    })
});
route.post('/fileupload', upload.single('file-to-upload'), (req, res) => {
    //console.log(req.body.img._parts);
    console.log(req);
    res.json("Done")
});
module.exports=route;