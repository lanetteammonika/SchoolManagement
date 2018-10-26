var Sequelize = require('sequelize');
exports.db=new Sequelize('SchoolManagement','root','',{
    port:3306,
    host:'localhost',
    dialect:'mysql'
});