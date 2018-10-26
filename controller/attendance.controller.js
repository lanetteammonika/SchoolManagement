const attendance=require('./../schema/attendance.schema');
const {db} = require('../config/database');
const sequelize = require('sequelize')

const date = new Date()
const todayDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()

exports.insert = (body, done) => {
    attendance.create(body).
    then((newAttendenceRecord) => {
        done(null, newAttendenceRecord)
    }).
    catch((err) => {
        done(err)
    })
}

exports.update = (id, body, done) => {
    attendance.update(body, {where:{
            id: id
        }
    }).then((updatedAttendence) => {
        if(updatedAttendence){
            attendance.find({
                where: {
                    id: id
                }
            }).then((attendenceData) => {
                done(null, attendenceData)
            }).catch((err) => {
                done(err)
            })
        }else {
            done("Problem updating attendence")
        }
    }).catch((err) => {
        done(err)
    })
}

exports.getTodayAttendence = (id,done) => {
    attendance.find({
        where:{
            $and: [
                sequelize.where(sequelize.fn('date', sequelize.col('createdAt')), '<=', todayDate),
                { user_id: id }
            ]
        }
    }).then((todayAttendence) => {
        if(todayAttendence){
            done(null, todayAttendence)
        }else {
            done("No data available for today")
        }
    }).catch((err) => {
        done (err)
    })
}