const router=require('express');
const route=router();
const {post, get, getAllComplaints} = require('../controller/complaint.controller')
const {verifiedAdmin, verifiedParent} = require('../middleware/verify_token')

route.post('/', verifiedParent, (req, res) => {
    req.body.user_id = req.decoded.id
    post(req.body, (err, result) => {
        if(err) {
            res.statusCode = 400
            res.json({success: false, error: err})
        }else {
            res.statusCode = 200

            delete result.dataValues.createdAt
            delete result.dataValues.updatedAt

            res.json({success: true, response: result.dataValues})
        }
    })
})

route.get('/getAll', verifiedAdmin, (req, res) => {
    getAllComplaints((err, result) => {
        if(err){
            res.statusCode = 400
            res.json({success: false, error: err})
        }else if(result.length == 0){
            res.statusCode = 404
            res.json({success: false, error: "No data found"})
        }else {
            res.statusCode = 200
            res.json({success: true, response: result})
        }
    })
})

route.get('/myComplaints', verifiedParent, (req, res) => {
    const id = req.decoded.id
    get(id, (err, result) => {
        if(err){
            res.statusCode = 400
            res.json({success: false, error: err})
        }else if(result.length == 0){
            res.statusCode = 404
            res.json({success: false, error: "No data found"})
        }else {
            res.statusCode = 200
            res.json({success: true, response: result})
        }
    })
})

module.exports = route