/*$ npm install --save sequelize

# And one of the following:
    $ npm install --save pg pg-hstore
$ npm install --save mysql // For both mysql and mariadb dialects
$ npm install --save sqlite3
$ npm install --save tedious // MSSQL  */




const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',   //choose anyone between them

    // To create a pool of connections
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    // For SQLite only
    storage: 'path/to/database.sqlite'
});










/*{
    "development": {
    "username": "root",
        "password": "root",
        "database": "articles",
        "host": "localhost",
        "dialect": "mysql"
},
    "test": {
    "username": "root",
        "password": "root",
        "database": "articles",
        "host": "127.0.0.1",
        "dialect": "mysql"
},
    "production": {
    "username": "root",
        "password": "root",
        "database": "articles",
        "host": "127.0.0.1",
        "dialect": "mysql"
}
} */


'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('SecurityAll/sequelize');
const basename  = path.basename(module.filename);
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/config.json')[env];
const db        = {};

if (config.use_env_variable) {
    const sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    const sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.log('Unable to connect to the database:', err);
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import Models such that I can use them in the api just by importing 'db'
db.user = require('./user')(sequelize, Sequelize);
db.admin = require('./admin')(sequelize, Sequelize);
db.articles = require('./articles')(sequelize, Sequelize);

module.exports = db;