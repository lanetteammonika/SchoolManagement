const router=require('express');
const route=router();
const {insert,post1,getParentId,getAll,del} = require('../controller/student.controller');

route.post('/',(req,res)=> {
    insert(req.body, (err, result) => {
        if (err) {
            res.statusCode = 400;
            res.json(err);
        }
        else if (result == null) {
            res.statusCode = 404;
            res.json({msg: "NOT VALID"});
        }
        else {
            getParentId(req.body,(err, result) => {
                if (err) {
                    res.statusCode = 400;
                    res.json(err);
                }
                else if(result == null){
                    res.statusCode=404;
                    res.json({msg:"NOT VALID"});

                }
                else {
                   post1(req.body,result.parent_id,(err,result)=>{
                       if (err) {
                           res.statusCode = 400;
                           res.json(err);
                       }
                       else if (result == null) {
                           res.statusCode = 404;
                           res.json({msg: "NOT VALID"});
                           console.log("Not Valid");
                       }
                       else {
                           res.statusCode=200;
                           res.json(result);
                       }
                   })
                }
            });
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
route.delete('/:id',(req,res)=>{
    del(req.params.id,(err,result)=>{
        if(err){
            res.statusCode=400;
            res.json(err);
        }
        else if (result.length == 0){
            res.statusCode=404;
            res.json({msg:"NOT DELETE"});
        }
        else {
            res.statusCode=200;
            res.json(result);
        }
    })
});
module.exports=route;