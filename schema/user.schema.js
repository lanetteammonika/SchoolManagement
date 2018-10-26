var Sequelize = require('sequelize');
const {db} = require('../config/database');
const user=db.define('tbl_user',{
    user_id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:Sequelize.STRING

    },
    user_role:{
        type:Sequelize.STRING
    },
    mobile_no:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING

    },
    password:{
        type:Sequelize.STRING
    },
    profile_pic:{
      type:Sequelize.STRING
    },
    state_temp:{
        type:Sequelize.INTEGER,
        defaultValue:0

    },
    status:{
        type:Sequelize.INTEGER,
        defaultValue:0
    }
});

user.sync({force:false}).then((res)=>{
    console.log("user table created");
}).catch((err)=>{
    console.log(err);
});

module.exports = user;
