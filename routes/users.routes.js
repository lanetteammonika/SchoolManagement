const router=require('express');
const route=router();
const {insert, postLogin, getUserDetails, update, remove, getUsers, getAllUsers, activateUser} = require('../controller/users.controller');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const {verifiedToken, verifiedRestrictStudent, verifiedAdmin} = require('../middleware/verify_token')
const nodeMailer = require('nodemailer');
const {jwtConfig, transporter, userEmailInfo} = require('../config/general')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'profilepic/')
    },
    filename: function (req, file, cb) {
        let extArray = file.originalname.split(".");
        let extension = extArray[extArray.length - 1];
        console.log(file);
        cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
    }
});

const upload = multer({ storage: storage });
//upload.single('profile_pic')
route.post('/',upload.single('profile_pic'),(req,res)=>{
    if(Boolean(req.file)){
        insert(req.body,req.file.filename,(err,result)=>{
            if (err){
                res.statusCode=400;
                res.json({success:false, error:err,status:400});
                console.log(err);
            }
            else if(result == null){
                res.statusCode=404;
                res.json({success:false, error:"NOT VALID",status:404});
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

                res.json({success:true,response:result.dataValues, token:JWTToken,status:200});
            }
        })
    } else {
        insert(req.body,'',(err,result)=>{
            if (err){
                res.statusCode=400;
                res.json({success:false, error:err,status:400});
                console.log(err);
            }
            else if(result == null){
                res.statusCode=404;
                res.json({success:false, error:"NOT VALID",status:404});
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

                res.json({success:true,response:result.dataValues, token:JWTToken,statusCode: res.statusCode=200});
            }
        })
    }
});

route.post('/update', verifiedToken, upload.single('profile_pic'), (req, res) => {
    const id = req.decoded.id
    if(req.file){
        req.body.profile_pic = req.file.filename
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
                res.json({success: false, error:err,status:400});
            }else if (!user) {
                res.statusCode=404;
                res.json({success: false, error: 'Invalid password',status:404});
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
                res.json({success:true,response:user.dataValues, token:JWTToken,status:200});
            }
        })
    }else {
        res.statusCode=400;
        res.json({success:false, error:"please enter credentials"});
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
        }else if(result == null){
            res.statusCode = 404
            res.json({success:false, error:"No data found"})
        }else {
            res.statusCode = 200;
            /*delete user.dataValues.password;
            delete user.dataValues.id
            delete user.dataValues.createdAt;
            delete user.dataValues.updatedAt;*/
            res.json({success:true,response:user.dataValues});
        }
    })
})

route.post('/deleteUser', verifiedAdmin, (req, res) => {
    const id = req.body.id
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
        }else if(result == null){
            res.statusCode = 404
            res.json({success:false, error:"No data found"})
        } else {
            res.statusCode = 200;
            res.json({success:true,response: result});
        }
    })
})

route.get('/getAllUsers',  (req, res) => {
    getAllUsers((err, user) => {
        if(err){
            res.statusCode=400;
            res.json({success:false, error:err});
        }else if(user.length == 0){
            res.statusCode = 404
            res.json({success:false, error:"No data found"})
        }else {
            res.statusCode = 200;

            res.json({success:true,response:user});
        }
    })
})

route.post('/activateUser',verifiedAdmin, (req, res) => {
    let message = ''

    if(req.body.is_active == 0){
        message = "You are successfully activated by the admin"
    }else {
        message = "Admin deactivated your account"
    }

    activateUser(req.body, (err, result) => {
        if(err){
            res.statusCode=400;
            res.json({success:false, error:err});
        }else {

            var mailOptions = {
                from: userEmailInfo.emailInfo,
                to: req.body.email,
                subject: 'User active status',
                text: message
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ===========\n' + info.response);
                }
            });

            res.statusCode = 200;

            res.json({success:true,response:"User active status changed successfully"});
        }
    })
})

module.exports=route;