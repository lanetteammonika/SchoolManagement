var Sequelize = require('sequelize');
var {db} = require('../config/database');
const file = db.define('tbl_file',{
        file_id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        file_name:{
            type:Sequelize.STRING
        },
        file_type:{
            type:Sequelize.STRING
        },
        file:{
            type:Sequelize.STRING
        },
        file_description:{
            type:Sequelize.STRING
        },
        user_id:{
            type:Sequelize.INTEGER
        },
        state_temp:{
            type:Sequelize.INTEGER,
            defaultValue:0
        }
    }
)


file.sync({force:false}).then((res)=>{
    console.log("file Table Created");
}).catch((err)=>{
    console.log(err);
})

module.exports = file;