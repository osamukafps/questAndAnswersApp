const Sequelize = require('sequelize');

const connection = new Sequelize('questAnswerApp', 'root', 'samuel123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;