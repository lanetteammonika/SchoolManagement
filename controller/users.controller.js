const users=require('./../schema/users.schema');
const {db} = require('../config/database');
var bcrypt = require('bcrypt');
const {userAttributes} = require('../config/general')

var validPassword = (password,hash) => {
    return bcrypt.compare(password, hash);
}

var generateHash = (password) => {
    return bcrypt.hash(password, 10);
}

exports.insert =(body,path,done)=> {
    users.find({
        where: {
            email: body.email
        }
    }).then((user) => {
        if(user){
            done("This email is already registered");
        }else {
            body.profile_pic=path;
            users.create(body).then((d) => {
                done(null, d);
            }).catch((err) => {
                done(err);
            })
        }
    }).catch((err) => {
        done(err);
    })
}

exports.postLogin = (email, password, done) => {
    users.find({where:{email:email}}).
    then(async (user) => {
        if(!user){
            done('Email is not registered')
        }else if(user.is_active == 0){
            done('You are either not verified or deleted by Admin')
        }else if(!await validPassword(password, user.password)){
            done(null, false)
        }else {
            done(null, user)
        }
    }).catch((err) => {
        done(err.message, err);
    })
}

exports.getUserDetails = (id, done) => {
    users.find({
        where: {
            id: id,
            is_active: 1
        }
    }).then((user) => {
        done(null, user)
    }).catch((err) => {
        done(err)
    })
}

exports.update = async (id, body, done) => {
    if(body.password){
        body.password = await generateHash(body.password)
    }
    users.update(body, {where: {id: id, is_active:1}}).
    then((updatedUser) => {
        if(updatedUser){
            users.find({where: {
                id: id
                }
            }).then((user) => {
                done(null, user)
            }).catch((err) => {
                done(err)
            })

        }else {
            done("Problem updating user")
        }
    }).catch((err) => {
        done(err)
    })
}

exports.remove = (id, done) => {
    db.query("UPDATE tbl_users set is_active = 0 WHERE (parent_id = "+ id +" and is_active = 1) or (id = "+ id +" and is_active = 1)").
    spread((data) => {
        done(null, data)
    }).catch((err) => {
        done(err)
    })
}

exports.getUsers = (role, done) => {
    var query = ''
    if(role == 'Admin'){
        query = ("\"Teacher\",\"Parent\"")
    }else if(role == 'Teacher'){
        query = ("\"Student\",\"Parent\"")
    }else if( role == 'Parent'){
        query = ("\"Teacher\"")
    }

    db.query("SELECT first_name, last_name, user_type, mobile_no, email, profile_pic, DOB FROM `tbl_users` WHERE user_type in ("+ query +") and is_active = 1").
    spread((seletedData) => {
        done(null, seletedData)
    }).
    catch((err) => {
        done(err)
    })
}

exports.getAllUsers = (done) => {
    users.findAll({
        where:{
            $or: [
                {
                    user_type: {
                        $eq: "Teacher"
                    }
                },
                {
                    user_type: {
                        $eq: "Parent"
                    }
                },
                {
                    user_type: {
                        $eq: "Student"
                    }
                }
            ]
        },
        attributes: userAttributes
    }).then((usersData) => {
        done(null, usersData)
    }).catch((err) => {
        done(err)
    })
}

exports.activateUser = (body, done) => {
    let activated = 0

    if(body.is_active == 0){
        activated = 1
    }else {
        activated = 0
    }

    users.find({
        where:{
            id: body.id
        }
    }).then((user) => {
        if(user){
            user.updateAttributes({
                is_active: activated
            }).then((updatedUser) => {
                users.find({
                    where:{
                        id: body.id
                    }
                }).then((userData) => {
                    done(null, userData)
                }).catch((err) => {
                    done(err)
                })
            }).catch((err) => {
                done(err)
            })
        }else {
            done("No user available with this id")
        }
    }).catch((err) => {
        done(err)
    })
}