const router=require('express');
const route=router();
const {insert, update, getTodayAttendence} = require('../controller/attendance.controller')
const {verifiedAdminOrTeacher} = require('../middleware/verify_token')

route.post('/', verifiedAdminOrTeacher, (req, res) => {
    req.body.user_id = req.decoded.id
    req.body.user_type = req.body.role

    insert(req.body, (err, result) => {
        if(err){
            res.statusCode = 400
            res.json({successs:false, error: err})
        }else {
            res.statusCode = 200

            delete result.dataValues.createdAt
            delete result.dataValues.updatedAt

            res.json({success:true, response: result.dataValues})
        }
    })
})

route.post('/update/:id', verifiedAdminOrTeacher, (req, res) => {
    req.body.user_id = req.decoded.id
    req.body.user_type = req.body.role

    update(req.params.id, req.body, (err, result) => {
        if(err) {
            res.statusCode = 400
            res.json({successs:false, error: err})
        }else {
            res.statusCode = 200

            delete result.dataValues.createdAt
            delete result.dataValues.updatedAt

            res.json({success:true, response: result.dataValues})
        }
    })
})

route.get('/', verifiedAdminOrTeacher, (req, res) => {
    const id = req.decoded.id
    getTodayAttendence(id, (err, result) => {
        if(err) {
            res.statusCode = 400
            res.json({successs:false, error: err})
        }else {
            res.statusCode = 200

            delete result.dataValues.createdAt
            delete result.dataValues.updatedAt

            res.json({success:true, response: result.dataValues})
        }
    })
})

module.exports=route;