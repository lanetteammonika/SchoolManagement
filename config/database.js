var Sequelize = require('sequelize');
/*exports.db=new Sequelize('SchoolManagement','root','',{
    port:3306,
    host:'localhost',
    dialect:'mysql'
});*/

exports.db = new Sequelize('SchoolManagement','root','root',{
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
        multipleStatements: true
    },
});