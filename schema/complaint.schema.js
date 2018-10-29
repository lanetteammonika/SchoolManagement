var Sequelize = require('sequelize');
const {db} = require('../config/database');
const users = require('./users.schema')

const complaint = db.define('tbl_complaints', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    user_id: {
        type: Sequelize.INTEGER,
        required: true
    },
    complaint: {
        type: Sequelize.STRING,
        required: true
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
    }
})

complaint.belongsTo(users,{foreignKey:'user_id'})

complaint.sync({force:false}).then((res)=>{
    console.log("complaints table created");
}).catch((err)=>{
    console.log(err);
});

module.exports = complaint;