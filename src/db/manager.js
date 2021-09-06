const users = require('./database_users');
const error_reports = require('./database_error_reports');
const User = require('./users_db_declarative');
const ErrorReport = require('./error_reports_db_declarative');

async function db_setup() {
    try {
        await users.authenticate();
        console.log('Connection to users has been established successfully.');
        User.sync({ alter: true })
    } catch (error) {
        console.error('Unable to connect to the users database:', error);
    }

    try {
        await error_reports.authenticate();
        console.log('Connection to error_reports has been established successfully.');
        ErrorReport.sync({ alter: true })
    } catch (error) {
        console.error('Unable to connect to the error_reports database:', error);
    }
}

module.exports = { db_setup, users, error_reports, User, ErrorReport };