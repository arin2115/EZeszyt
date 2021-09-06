const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database_error_reports');

class ErrorReport extends Model {};

ErrorReport.init({
  errorType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  errorContext: {
    type: DataTypes.STRING,
    allowNull: true
  },
  messageTitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true
  },
  timestamp: {
    type: DataTypes.TIME,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "ErrorReport"
});

module.exports = ErrorReport;