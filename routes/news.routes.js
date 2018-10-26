const router=require('express');
const route=router();
const {insert, getAll, remove, get, update} = require('../controller/news.controller')
const {verifiedAdmin, verifiedToken} = require('../middleware/verify_token')

route.post('/',verifiedAdmin, (req, res) => {
    insert(req.body, (err, result) => {
        if(err){
            res.statusCode = 400
            res.json({success:false, error:err})
        }else {
            res.statusCode = 200

            delete result.dataValues.createdAt
            delete result.dataValues.updatedAt

            res.json({success:true, response: result.dataValues})
        }
    })
})

route.get('/', verifiedToken, (req, res) => {
    getAll((err, result) => {
        if(err){
            res.statusCode = 400
            res.json({success:false, error:err})
        }else {
            res.statusCode = 200

            res.json({success:true, response: result})
        }
    })
})

route.get('/:id', verifiedToken, (req, res) => {
    get(req.params.id, (err, result) => {
        if(err){
            res.statusCode = 400
            res.json({success:false, error:err})
        }else {
            res.statusCode = 200
            res.json({success:true, response: result})
        }
    })
})

route.delete("/:id", verifiedAdmin, (req, res) => {
    remove(req.params.id, (err, result) => {
        if(err){
            res.statusCode = 400
            res.json({success:false, error:err})
        }else {
            res.statusCode = 200
            res.json({success:true, response: result})
        }
    })
})

route.post('/update/:id', verifiedAdmin, (req, res) => {
    update(req.params.id, req.body, (err, result) => {
        if(err){
            res.statusCode = 400
            res.json({success:false, error:err})
        }else {
            res.statusCode = 200

            delete result.dataValues.createdAt
            delete result.dataValues.updatedAt

            res.json({success:true, response: result})
        }
    })
})

module.exports=route;