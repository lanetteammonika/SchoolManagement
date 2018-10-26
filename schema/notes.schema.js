var Sequelize = require('sequelize');
const {db} = require('../config/database');
const User = require('./users.schema')

const notes =db.define('tbl_notes',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    teacher_id:{
      type: Sequelize.INTEGER
    },
    title:{
        type:Sequelize.STRING

    },
    description:{
        type: Sequelize.STRING
    },
    is_active:{
        type:Sequelize.INTEGER,
        defaultValue: 1
    }
});

notes.belongsTo(User, {foreignKey: 'teacher_id'})

notes.sync({force:false}).then((res)=>{
    console.log("notes table created");
}).catch((err)=>{
    console.log(err);
});

module.exports = notes;
