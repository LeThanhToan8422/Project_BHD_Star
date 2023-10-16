'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Account, {sourceKey : 'userID', foreignKey : 'userID', as : 'user'})
      User.hasOne(models.Fare, {sourceKey : 'userID'})
      User.hasMany(models.Ticket, {sourceKey : 'userID'})
    }
  }
  User.init({
    userID : {
      type : DataTypes.STRING,
      primaryKey : true,
      unique : true,
      validate : {
        is : {
          args : /^US[0-9]{0,}$/,
          msg : 'ID không hợp lệ...'
        },
        notEmpty : {
          msg : 'Vui lòng nhập ID...'
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Vui lòng nhập email..."
        },
        isEmail : {
          msg : 'Email không hợp lệ...'
        },
      },
    },
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Vui lòng nhập tên..."
        },
      }
    },
    phone: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Vui lòng nhập số điện thoại..."
        },
        is : {
          args : /^0[1-9][0-9]{8,9}$/,
          msg : 'Số điện thoại không hợp lệ'
        }
      },
    },
    dateOfBirth: {
      type : DataTypes.DATE,
      validate : {
        notEmpty : {
          msg : "Vui lòng nhập ngày sinh..."
        },
      },
    },
    gender: {
      type : DataTypes.BOOLEAN,
      validate : {
        notEmpty : {
          msg : "Vui lòng chọn giới tính..."
        },
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};