const router=require('express');
const route=router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("dest");
        cb(null, 'fileUploads/')
    },
    filename: function (req, file, cb) {
        console.log("Node");
        let extArray = file.originalname.split(".");
        let extension = extArray[extArray.length - 1];
        console.log(file);
        cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
        // let extension = file.mimetype.includes("pdf") && ".pdf" ||".png" || ".jpg" ;
        // cb(null, file.fieldname + '-' + Date.now() + extension);
    }
});

const upload = multer({ storage: storage });

const {insert,getAll} = require('../controller/file.controller');
route.post('/',upload.single('file_info'),(req,res)=>{
    console.log("Hi");
    insert(req.body,req.file.filename,(err,result)=>{
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
            console.log(result);
        }
    })
});

route.get('/',(req,res)=>{
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
module.exports=route;