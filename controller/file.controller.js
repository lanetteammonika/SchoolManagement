const file=require('./../schema/file.schema');
const {db} = require('../config/database');
exports.insert =(body,path,done)=>{
    body.file=path;
    file.create(body).then((d)=>{
        console.log("=====");
        console.log("File");
        done(null,d);
    }).catch((err)=>{
        done(err);
    })
};
exports.getAll = (done) => {
    file.findAll().then((file) => {
        if(file){
            done(null,file)
        }
        else
            done("no data found")
    })
};