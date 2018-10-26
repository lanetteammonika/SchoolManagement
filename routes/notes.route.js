const router = require('express')
const route = router()
const {insert, getAll, get, remove, update} = require('../controller/notes.controller')
const {verifiedTeacher, verifiedToken} = require('../middleware/verify_token')

route.post('/',verifiedTeacher, (req, res) => {
    const id = req.decoded.id
    req.body.teacher_id = id
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

route.delete("/:id", verifiedTeacher, (req, res) => {
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

route.post('/update/:id', verifiedTeacher, (req, res) => {
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

module.exports = route