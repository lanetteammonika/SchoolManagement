var Sequelize = require('sequelize');
const {db} = require('../config/database');

const news = db.define('tbl_news',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
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

news.sync({force:false}).then((res)=>{
    console.log("news table created");
}).catch((err)=>{
    console.log(err);
});

module.exports = news;
