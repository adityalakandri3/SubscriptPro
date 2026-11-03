const Sequelize = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(process.env.DBNAME,process.env.DBUSER,process.env.DBPASS,{
    host:process.env.DBHOST||'localhost',
    port:process.env.DBPORT||3306,
    dialect:process.env.DBDIALECT||'mysql',
    timezone:'+05:30',
    pool:{
        max:30,
        min:0,
        acquire:50000,
        idle:10000
    },
    logging:process.env.DBLOGGING==="true"?console.log:false
    
})

const db={};

db.Sequelize=Sequelize;
db.sequelize=sequelize;

module.exports=db;