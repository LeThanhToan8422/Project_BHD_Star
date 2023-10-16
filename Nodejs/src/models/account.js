'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.User, {targetKey : 'userID', foreignKey : 'userID', as : 'user'})
    }
  }
  Account.init({
    accountID: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      unique : true,
      validate : {
        isEmail : {
          msg : 'Email không hợp lệ...'
        }
      },
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        is : {
          args : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
          msg : 'Mật khẩu từ 6 đến 20 ký tự chứa ít nhất một chữ số , một chữ hoa và một chữ thường.'
        },
        len : {
          args : [6, 20],
          msg : 'Mật khẩu từ 6 đến 20 ký tự.'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};