var Sequelize = require('sequelize');
var {db} = require('../config/database');

const attendance = db.define('tbl_attendance',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        user_type:{
            type: Sequelize.ENUM('Admin', 'Teacher'),
        },
        present:{
            type:Sequelize.STRING
        },
        absent:{
            type:Sequelize.STRING
        }
    }
)

attendance.sync({force:false}).then((res)=>{
    console.log("attendence table created");
}).catch((err)=>{
    console.log(err);
});

module.exports = attendance;
