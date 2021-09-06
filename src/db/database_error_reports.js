const { Sequelize } = require('sequelize');

const error_reports = new Sequelize({
    dialect: 'sqlite',
    storage: './db/db/error_reports.db',
    logging: false
});

module.exports = error_reports;