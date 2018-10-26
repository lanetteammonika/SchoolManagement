const router=require('express');
const route=router();
const {insert, postLogin, getUserDetails, update, remove, getUsers} = require('../controller/users.controller');
const multer = require('multer');
const {jwtConfig} = require('../config/general')
const jwt = require('jsonwebtoken');
const {verifiedToken, verifiedRestrictStudent} = require('../middleware/verify_token')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("dest");
        cb(null, 'profilepic/')
    },
    filename: function (req, file, cb) {
        console.log("Node");
        let extArray = file.originalname.split(".");
        let extension = extArray[extArray.length - 1];
        console.log(file);
        cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
    }
});

const upload = multer({ storage: storage });

route.post('/',upload.single('profile_pic'),(req,res)=>{
    console.log("Hi");
    insert(req.body,req.file.filename,(err,result)=>{
        if (err){
            res.statusCode=400;
            res.json({success:false, error:err});
            console.log(err);
        }
        else if(result == null){
            res.statusCode=404;
            res.json({sucess:false, error:"NOT VALID"});
            console.log("Not Valid");
        }
        else {
            res.statusCode=200;

            const JWTToken = jwt.sign({
                    email: result.email,
                    id: result.id,
                    role:result.user_type
                },
                jwtConfig.secret,
            );

            delete result.dataValues.password;
            delete result.dataValues.id
            delete result.dataValues.createdAt;
            delete result.dataValues.updatedAt;

            res.json({success:true,response:result.dataValues, token:JWTToken});
        }
    })
});

route.post('/update', verifiedToken, upload.single('profile_pic'), (req, res) => {
    const id = req.decoded.id
    if(req.file){
        req.body.profile_pic = req.file.fiename
    }
    update(id, req.body, (err, result) => {
        if (err){
            res.statusCode=400;
            res.json({success: false, error:err});
            console.log({success:false, error:err});
        }
        else if(result == null){
            res.statusCode=404;
            res.json({success: false,error:"NOT VALID"});
            console.log("Not Valid");
        }
        else {
            res.statusCode=200;

            const JWTToken = jwt.sign({
                    email: result.email,
                    id: result.id,
                    role:result.user_type
                },
                jwtConfig.secret,
            );

            delete result.dataValues.password;
            delete result.dataValues.id
            delete result.dataValues.createdAt;
            delete result.dataValues.updatedAt;

            res.json({success:true,response:result.dataValues, token:JWTToken});
        }
    })
})

route.post('/loginUser', (req,res) => {
    if(req.body.email && req.body.password){
        postLogin(req.body.email, req.body.password, (err, user) => {
            if(err){
                res.statusCode=400;
                res.json({success: false, error:err});
            }else if (!user) {
                res.statusCode=404;
                res.json({success: false, error: 'Invalid password'});
            }else {
                res.statusCode = 200;

                const JWTToken = jwt.sign({
                        email: user.email,
                        id: user.id,
                        role:user.user_type
                    },
                    jwtConfig.secret,
                );
                delete user.dataValues.password;
                delete user.dataValues.id
                delete user.dataValues.createdAt;
                delete user.dataValues.updatedAt;
                res.json({success:true,response:user.dataValues, token:JWTToken});
            }
        })
    }else {
        res.statusCode=400;
        res.json({success:false, error:"please enter password"});
    }
})

route.get('/userDetail', verifiedToken, (req, res) => {
    console.log(req.decoded)
    const id = req.decoded.id
    getUserDetails(id, (err, user) => {
        if(err){
            res.statusCode=400;
            res.json({success:false, error:err});
        }else if (!user) {
            res.statusCode=404;
            res.json({success: false, error: 'User not found'});
        }else {
            res.statusCode = 200;
            delete user.dataValues.password;
            delete user.dataValues.id
            delete user.dataValues.createdAt;
            delete user.dataValues.updatedAt;
            res.json({success:true,response:user.dataValues});
        }
    })
})

route.get('/deleteUser', verifiedToken, (req, res) => {
    const id = req.decoded.id
    remove(id, (err, result) => {
        if(err){
            res.statusCode=400;
            res.json({success:false, error:err});
        } else if(result.affectedRows <= 0){
            res.statusCode=400;
            res.json({success:false, error:"No user available with this id"});
        }else {
            res.statusCode = 200;
            res.json({success:true,response: "Deleted user successfully"});
        }
    })
})

route.get('/roleBasedUsers', verifiedRestrictStudent, (req, res) => {
    const role = req.decoded.role
    getUsers(role, (err, result) => {
        if(err){
            res.statusCode=400;
            res.json({success:false, error:err});
        } else {
            res.statusCode = 200;
            res.json({success:true,response: result});
        }
    })
})

module.exports=route;