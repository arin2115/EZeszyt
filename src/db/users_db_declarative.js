const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database_users');

class User extends Model {};

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  ban: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  ban_reason: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
}, {
  sequelize,
  modelName: "User"
});

module.exports = User;