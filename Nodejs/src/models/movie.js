'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.hasOne(models.DetailMovie, {sourceKey : 'movieID', foreignKey : 'movieID', as : 'movie'})
      Movie.hasMany(models.Ticket, {sourceKey : 'movieID'}),
      Movie.hasMany(models.MovieDate, {sourceKey : 'movieID'}),
      Movie.belongsToMany(models.Cinema, {through : 'MovieDate' ,sourceKey : 'movieID'})
    }
  }
  Movie.init({
    movieID: DataTypes.STRING,
    nameEN: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Vui lòng nhập tên EN..."
        }
      }
    },
    nameVN: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Vui lòng nhập tên VN..."
        }
      }
    },
    evaluate: DataTypes.INTEGER,
    time: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Vui lòng nhập thời gian chiếu..."
        }
      }
    },
    actor: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Vui lòng nhập diễn viên..."
        }
      }
    },
    director: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Vui lòng nhập đạo diễn..."
        }
      }
    },
    producer: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Vui lòng nhập nhà sản xuất..."
        }
      }
    },
    category: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Vui lòng nhập thể loại phim..."
        }
      }
    },
    country: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Vui lòng nhập quốc gia..."
        }
      }
    },
    premiereDate: {
      type : DataTypes.DATE,
      validate : {
        notEmpty : {
          msg : "Vui lòng nhập ngày khởi chiếu..."
        }
      }
    },
    image: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Vui lòng chọn poster..."
        }
      }
    },
    contentFilm : {
      type : DataTypes.TEXT,
    }

  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};