var Sequelize = require('sequelize');
const {db} = require('../config/database');
const bcrypt = require('bcrypt');

const users=db.define('tbl_users',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    first_name:{
        type:Sequelize.STRING

    },
    last_name:{
        type:Sequelize.STRING

    },
    user_type:{
        type: Sequelize.ENUM('Admin', 'Teacher', 'Parent', 'Student'),
    },
    mobile_no:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING,
        unique: true,
        required: true
    },
    password:{
        type:Sequelize.STRING
    },
    profile_pic:{
        type:Sequelize.STRING
    },
    DOB:{
        type:Sequelize.DATE
    },
    parent_id:{
        type:Sequelize.INTEGER
    },
    is_active:{
        type:Sequelize.INTEGER,
        defaultValue: 0
    }
},
    {
        hooks: {
            beforeCreate: function(user, options) {
                return new Promise((resolve, reject) => {
                    bcrypt.hash(user.password, 10, (err, data) => {
                        if (err) reject(err);
                        user.password = data;
                        resolve();
                    })
                });
            },
        },
    });

users.belongsTo(users,{foreignKey:'parent_id'})

users.sync({force:false}).then((res)=>{
    console.log("users table created");
}).catch((err)=>{
    console.log(err);
});

module.exports = users;
