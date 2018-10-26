const Notes = require('../schema/notes.schema')
const User = require('../schema/users.schema')

const {notesAttributes, userAttributes} = require('../config/general')

User.hasMany(Notes, {foreignKey: 'teacher_id'})
Notes.belongsTo(User, {foreignKey: 'teacher_id'})

exports.insert = (body, done) =>{
    Notes.create(body).then((newCourse) => {
        done(null,newCourse)
    }).catch((err) => {
        done(err)
    })
}

exports.getAll = (done) => {
    Notes.findAll({
        where: {
            is_active: 1
        },
        include: [{model:User, attributes: userAttributes}],
        attributes: notesAttributes
    }).then((notesDetail) => {
        done(null, notesDetail)
    }).catch((err) => {
        done(err)
    })
}

exports.get = (id, done) => {
    Notes.find({
        where:{
            id: id,
            is_active: 1
        },
        include: [{model:User, attributes: userAttributes}],
        attributes: notesAttributes
    }).then((noteDetail) => {
        done(null, noteDetail)
    }).catch((err) => {
        done(err)
    })
}

exports.remove = (id, done) => {
    Notes.find({
        where: {
            id: id,
            is_active: 1
        }
    }).then((notes) => {
      if(notes){
          notes.updateAttributes({
              is_active: 0
          }).then((deletedNote) => {
              done(null, "Notes deleted successfully")
          }).catch((err) => {
              done(err)
          })
      }  else {
          done("No notes available")
      }
    }).catch((err) => {
        done(err)
    })
}

exports.update = (id, body, done) => {
    Notes.update(body,{
        where:{
            id: id,
            is_active: 1
        }
    }).then((updatedNote) => {
        if(updatedNote){
            Notes.find({
                where:{
                    id:id
                }
            }).then((data) => {
                done(null, data)
            }).catch((err) => {
                done(err)
            })
        }else {
            done("Problem updating note")
        }
    }).catch((err) => {
        done(err)
    })
}