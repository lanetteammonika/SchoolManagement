const jwt = require('jsonwebtoken');
const {jwtConfig} = require('../config/general');

const roles = {
    ADMIN : 'Admin',
    TEACHER : 'Teacher',
    PARENT: 'Parent'
}

exports.verifiedToken = (req,res,next) => {
    const token = req.headers['authorization'];
    if(token){
        jwt.verify(token,jwtConfig.secret,(err, decoded) => {
            if(err){
                res.statusCode = 400
                return res.json({error:err.message})
            }
            req.decoded = decoded;
            next();
        })
    }else{
        res.statusCode = 403
        res.json({error:"Token is required"})
    }
}

exports.verifiedAdmin = (req,res,next) => {
    const token = req.headers['authorization'];
    if(token){
        jwt.verify(token,jwtConfig.secret,(err, decoded) => {
            if(err){
                res.statusCode = 400
                return res.json({error:err.message})
            }else if(decoded.role == roles.ADMIN){
                req.decoded = decoded
                next();
            }else{
                res.statusCode = 400
                res.json({error:"You do not have access to this route"})
            }
        })
    }else{
        res.statusCode = 403;
        res.json({error:"Token is required"})
    }
}

exports.verifiedTeacher = (req,res,next) => {
    const token = req.headers['authorization'];
    if(token){
        jwt.verify(token,jwtConfig.secret,(err, decoded) => {
            if(err){
                res.statusCode = 400
                return res.json({error:err.message})
            }else if(decoded.role == roles.TEACHER){
                req.decoded = decoded
                next();
            }else{
                res.statusCode = 400
                res.json({error:"You do not have access to this route"})
            }
        })
    }else{
        res.statusCode = 403;
        res.json({error:"Token is required"})
    }
}

exports.verifiedAdminOrTeacher = (req,res,next) => {
    const token = req.headers['authorization'];
    if(token){
        jwt.verify(token,jwtConfig.secret,(err, decoded) => {
            if(err){
                res.statusCode = 400
                return res.json({error:err.message})
            }else if(decoded.role == roles.TEACHER || decoded.role == roles.ADMIN){
                req.decoded = decoded
                next();
            }else{
                res.statusCode = 400
                res.json({error:"You do not have access to this route"})
            }
        })
    }else{
        res.statusCode = 403;
        res.json({error:"Token is required"})
    }
}

exports.verifiedRestrictStudent = (req,res,next) => {
    const token = req.headers['authorization'];
    if(token){
        jwt.verify(token,jwtConfig.secret,(err, decoded) => {
            if(err){
                res.statusCode = 400
                return res.json({error:err.message})
            }else if(decoded.role == roles.TEACHER || decoded.role == roles.ADMIN || decoded.role == roles.PARENT){
                req.decoded = decoded
                next();
            }else{
                res.statusCode = 400
                res.json({error:"You do not have access to this route"})
            }
        })
    }else{
        res.statusCode = 403;
        res.json({error:"Token is required"})
    }
}