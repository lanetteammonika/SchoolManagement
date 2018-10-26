var Sequelize = require('sequelize');
var {db} = require('../config/database');
const parent = db.define('tbl_parent',{
        parent_id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        parent_name:{
            type:Sequelize.STRING
        },
        parent_mno:{
            type:Sequelize.STRING
        },
        state_temp:{
            type:Sequelize.INTEGER,
            defaultValue:0
        }
    }
);


parent.sync({force:false}).then((res)=>{
    console.log("Parent Table Created");
}).catch((err)=>{
    console.log(err);
});

module.exports = parent;