const { Sequelize } = require('sequelize');

const users = new Sequelize({
    dialect: 'sqlite',
    storage: './db/db/users.db',
    logging: true
});

module.exports = users;