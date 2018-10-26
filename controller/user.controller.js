const user=require('./../schema/user.schema');
const {db} = require('../config/database');
exports.insert =(body,done)=>{
    user.create(body).then((d)=>{
        done(null,d);
    }).catch((err)=>{
        done(err);
    })
};
exports.post1 = (body,done) =>{
    user.find({where:{email:body.email,password:body.password}}).then((d)=>{
            if(d.status === 1){
                done(null,d);
            }else {
                done(null,{msg:'Not verified'});
            }
    }).catch(err=>{
        done(err);
    })
};
exports.getAll = (done) => {
    user.findAll().then((user) => {
        if(user){
            done(null,user)
        }
        else
            done("no data found")
    })
};
exports.up = (id,body,path,done) =>{
    body.profile_pic=path;
    user.update(body,{where:{user_id:id}}).then((d)=>{
        done(null,d);
    }).catch((err)=>{
        done(err);
    });
};

exports.up1 = (id,done) =>{
    user.find({where:{user_id:id}}).then((d)=>{
            if(d.status==0){
                d.updateAttributes({status:1}).then((d1)=>{
                    done(null,d1);
                }).catch((err)=>{
                    done(err);
                })
            }
            else {
                d.updateAttributes({status:0}).then((d1)=>{
                    done(null,d1);
                }).catch((err)=>{
                    done(err);
                })
            }
        }

    ).catch((err)=>{
        done(err);
    })
};