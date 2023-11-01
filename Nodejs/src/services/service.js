import db, { sequelize } from "../models/index";
const { QueryTypes, DataTypes } = require("sequelize");
const { Op, Sequelize } = require("sequelize");

// API POST
let apiPostInsertUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      await sequelize.query(
        "INSERT INTO `Users` (userID,email,name,phone,dateOfBirth,gender) VALUES (:userID,:email,:name,:phone,:dateOfBirth,:gender)",
        {
          type: QueryTypes.INSERT,
          replacements: {
            userID: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            dateOfBirth: user.date,
            gender: user.gender,
          },
        }
      );
      resolve({
        isInsert: true,
        announceInsert: `insert ${user.id} is success`,
      });
    } catch (error) {
      // reject(error)
      resolve({
        isInsert: false,
        announceInsert: `insert ${user.id} is fail`,
        messageError: error.errors.map((err) => {
          if (err.message === "email must be unique") {
            return "Email đã tồn tại";
          } else if (err.message === "phone must be unique") {
            return "Số điện thoại đã tồn tại";
          } else {
            return err.message;
          }
        }),
        pathError: error.errors.map((err) => err.path),
      });
    }
  });
};

let apiPostInsertMovie = (movie) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Movie.create({
        movieID: movie.id,
        nameEN: movie.nameEN,
        nameVN: movie.nameVN,
        category: movie.category,
        time: movie.time,
        premiereDate: movie.premiereDate,
        director: movie.director,
        producer: movie.producer,
        actor: movie.actor,
        country: movie.country,
        image: movie.poster,
      });
      resolve({
        isInsert: true,
        announceInsert: `insert ${movie.id} is success`,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let apiPostInsertCinema = (cinema) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Cinema.create({
        cinemaID: cinema.id,
        name: cinema.name,
        address: cinema.address,
        phone: cinema.phone,
        image: cinema.image,
        placeID: cinema.city,
      });
      resolve({
        isInsert: true,
        announceInsert: `insert ${cinema.id} is success`,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let apiPostInsertAccount = (account) => {
  return new Promise(async (resolve, reject) => {
    try {
      await sequelize.query(
        "INSERT INTO `Accounts` (accountID,email,password,userID) VALUES (:accountID,:email,:password,:userID)",
        {
          type: QueryTypes.INSERT,
          replacements: {
            accountID : account.id,
            email : account.email,
            password : account.password,
            userID : account.userID
          },
        }
      );
      resolve({
        isInsert: true,
        announceInsert: `insert ${account.accountID} is success`,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let apiPostInsertMovieDate = (movieDate) => {
  return new Promise(async (resolve, reject) => {
    try {
      await sequelize.query(
        "INSERT INTO moviedates (movieDateID, date, cinemaID, movieID) VALUES (:movieDateID, :date, :cinemaID, :movieID);",
        {
          type: QueryTypes.INSERT,
          replacements: {
            movieDateID: movieDate.id,
            date: movieDate.movieDate,
            cinemaID: movieDate.cinema,
            movieID: movieDate.movie,
          },
        }
      );
      resolve({
        isInsert: true,
        announceInsert: `insert ${movieDate.id} is success`,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let apiPostInsertShowTime = (showTime) => {
  return new Promise(async (resolve, reject) => {
    let id = await apiGetShowTimeID();
    let showTimeID = `ST${id + 1}`;
    try {
      await sequelize.query(
        "INSERT INTO showtimes (showTimeID, time, quality, movieDateID) VALUES (:showTimeID, :time, :quality, :movieDateID);",
        {
          type: QueryTypes.INSERT,
          replacements: {
            showTimeID: showTimeID,
            time: showTime.time,
            quality: showTime.quality,
            movieDateID: showTime.movieDateID,
          },
        }
      );
      resolve({
        showTimeID: showTimeID,
        isInsert: true,
        announceInsert: `insert ${showTimeID} is success`,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let apiPostInsertTicket = (ticket) => {
  return new Promise(async (resolve, reject) => {
    try {
      let totalPrices = 0
      let showtime = await apiGetShowTimeByID(ticket.showTime)
      let moviedate = await apiGetMovieDateByID(ticket.movieDate)
      let combosChosen = ticket.combos.length > 0 ? await apiGetCombosChosen(ticket.combos) : []
      let weekDay = await apiGetWeekDay(`${moviedate.dataValues.date.getFullYear()}-${moviedate.dataValues.date.getMonth()+1}-${moviedate.dataValues.date.getDate()}`)
      let ticketPrices = await apiGetTicketPrices(weekDay[0].weekday, showtime.dataValues.time < '17:00')

      combosChosen.forEach(combo => totalPrices += combo.price)
      totalPrices += ticketPrices*ticket.quantityTickets

      await sequelize.query(
        "INSERT INTO tickets (ticketID,quantityTickets,seats,combos,totalPrices,userID,cinemaID,movieID,movieDateID,showTimeID) VALUES (:ticketID,:quantityTickets,:seats,:combos,:totalPrices,:userID,:cinemaID,:movieID,:movieDateID,:showTimeID);",
        {
          type: QueryTypes.INSERT,
          replacements: {
            ticketID: ticket.id,
            quantityTickets: ticket.quantityTickets,
            seats: ticket.seats.join(";"),
            combos: ticket.combos.join(";"),
            totalPrices : ticket.totalPrices,
            userID : ticket.userID,
            cinemaID: ticket.cinema,
            movieID: ticket.movie,
            movieDateID: ticket.movieDate,
            showTimeID: ticket.showTime,
          },
        }
      );
      resolve({
        isInsert: true,
        announceInsert: `insert ${ticket.id} is success`,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let apiPostInsertCombo = (combo) => {
  return new Promise(async (resolve, reject) => {
    try {
      await sequelize.query(
        "INSERT INTO combos (comboID, name, price, cinemaID) VALUES (:comboID, :name, :price, :cinemaID);",
        {
          type: QueryTypes.INSERT,
          replacements: {
            comboID: combo.id,
            name: combo.name,
            price: combo.price,
            cinemaID: combo.cinema,
          },
        }
      );
      resolve({
        isInsert: true,
        announceInsert: `insert ${combo.id} is success`,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let apiPostInsertFare = (fare) => {
  return new Promise(async (resolve, reject) => {
    try {
      await sequelize.query(
        "INSERT INTO fares (fareID, isAdult, isBeforeFiveHours, pricesOfMonWednesThursDay, pricesOfTuesDay, pricesOfFriSaturSunHoliDay, pricesOfGratitudeDay, cinemaID) VALUES (:fareID, :isAdult, :isBeforeFiveHours, :pricesOfMonWednesThursDay, :pricesOfTuesDay, :pricesOfFriSaturSunHoliDay, :pricesOfGratitudeDay, :cinemaID);",
        {
          type: QueryTypes.INSERT,
          replacements: {
            fareID: fare.id,
            isAdult: fare.isAdult === 'true' ? true : false,
            isBeforeFiveHours: fare.isBeforeFiveHours=== 'true' ? true : false,
            pricesOfMonWednesThursDay: fare.pricesOfMonWednesThursDay,
            pricesOfTuesDay: fare.pricesOfTuesDay,
            pricesOfFriSaturSunHoliDay: fare.pricesOfFriSaturSunHoliDay,
            pricesOfGratitudeDay: fare.pricesOfGratitudeDay,
            cinemaID: fare.cinema,
          },
        }
      );
      resolve({
        isInsert: true,
        announceInsert: `insert ${fare.id} is success`,
      });
    } catch (error) {
      reject(error);
    }
  });
};

// API GET
let apiGetListCinema = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let cinemas = await db.Cinema.findAll({
        attributes: ["cinemaID", "name"],
        order: [["cinemaID", "DESC"]],
      });
      resolve(cinemas ? cinemas : []);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetListMovie = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // let userID = await sequelize.query(`SELECT id FROM users ORDER BY id DESC LIMIT 1`, {type : QueryTypes.SELECT})
      let movies = await db.Movie.findAll({
        attributes: ["movieID", "nameVN"],
        order: [["movieID", "DESC"]],
      });
      resolve(movies ? movies : []);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetAllShowTimeByMovieDateID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let showTimes = await db.ShowTime.findAll({
        attributes: ["showTimeID", "time", "quality"],
        where: { movieDateID: id },
        order: [["id", "ASC"]],
      });
      resolve(showTimes ? showTimes : []);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetSeatsChosen = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let seats = [];
      let tickets = await db.Ticket.findAll({
        attributes: ["seats"],
        order: [["seats", "DESC"]],
      });
      tickets.forEach((ticket) => {
        seats = [...seats, ...ticket.dataValues.seats.split(";")];
      });
      resolve(seats ? seats : []);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetCombos = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let combos = await db.Combo.findAll({
        attributes: ["comboID", "name", "price"],
        order: [["comboID", "ASC"]],
      });
      console.log(combos.map((combo) => combo.dataValues));
      resolve(
        combos.map((combo) => combo.dataValues)
          ? combos.map((combo) => combo.dataValues)
          : []
      );
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetUserID = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let userID = await db.User.findOne({
        attributes: ["id"],
        order: [["id", "DESC"]],
        limit: 1,
      });
      resolve(userID === null ? 0 : userID.dataValues.id);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetAccountID = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let accountID = await db.User.findOne({
        attributes: ["id"],
        order: [["id", "DESC"]],
        limit: 1,
      });
      resolve(accountID === null ? 0 : accountID.dataValues.id);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetMovieID = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // let userID = await sequelize.query(`SELECT id FROM users ORDER BY id DESC LIMIT 1`, {type : QueryTypes.SELECT})
      let movieID = await db.Movie.findOne({
        attributes: ["id"],
        order: [["id", "DESC"]],
        limit: 1,
      });
      resolve(movieID === null ? 0 : movieID.dataValues.id);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetCinemaID = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // let userID = await sequelize.query(`SELECT id FROM users ORDER BY id DESC LIMIT 1`, {type : QueryTypes.SELECT})
      let cinemaID = await db.Cinema.findOne({
        attributes: ["id"],
        order: [["id", "DESC"]],
        limit: 1,
      });
      resolve(cinemaID === null ? 0 : cinemaID.dataValues.id);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetMovieDateID = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // let userID = await sequelize.query(`SELECT id FROM users ORDER BY id DESC LIMIT 1`, {type : QueryTypes.SELECT})
      let movieDateID = await db.MovieDate.findOne({
        attributes: ["id"],
        order: [["id", "DESC"]],
        limit: 1,
      });
      resolve(movieDateID === null ? 0 : movieDateID.dataValues.id);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetShowTimeID = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // let userID = await sequelize.query(`SELECT id FROM users ORDER BY id DESC LIMIT 1`, {type : QueryTypes.SELECT})
      let showTimeID = await db.ShowTime.findOne({
        attributes: ["id"],
        order: [["id", "DESC"]],
        limit: 1,
      });
      resolve(showTimeID === null ? 0 : showTimeID.dataValues.id);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetTicketID = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let ticketID = await db.Ticket.findOne({
        attributes: ["id"],
        order: [["id", "DESC"]],
        limit: 1,
      });
      resolve(ticketID === null ? 0 : ticketID.dataValues.id);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetComboID = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let comboID = await db.Combo.findOne({
        attributes: ["id"],
        order: [["id", "DESC"]],
        limit: 1,
      });
      resolve(comboID === null ? 0 : comboID.dataValues.id);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetFareID = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let fareID = await db.Fare.findOne({
        attributes: ["id"],
        order: [["id", "DESC"]],
        limit: 1,
      });
      resolve(fareID === null ? 0 : fareID.dataValues.id);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetUserByPage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let listusers = await sequelize.query(
        `SELECT * FROM users WHERE ${
          data.columnSearch === undefined ? "userID" : data.columnSearch
        } like '%${
          data.value === undefined ? "" : data.value
        }%' ORDER BY id ASC LIMIT 10 OFFSET ${(data.quantity - 1) * 10}`,
        { type: QueryTypes.SELECT }
      );
      resolve(
        listusers.map((user) => {
          user.dateOfBirth = `${user.dateOfBirth.getDate()}-${
            user.dateOfBirth.getMonth() + 1
          }-${user.dateOfBirth.getFullYear()}`;
          return user;
        })
      );
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetMovieByPage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let listMovies = await sequelize.query(
        `SELECT * FROM movies WHERE ${
          data.columnSearch === undefined ? "movieID" : data.columnSearch
        } like '%${
          data.value === undefined ? "" : data.value
        }%' ORDER BY id ASC LIMIT 10 OFFSET ${(data.quantity - 1) * 10}`,
        { type: QueryTypes.SELECT }
      );
      resolve(
        listMovies.map((movie) => {
          movie.premiereDate = `${movie.premiereDate.getDate()}-${
            movie.premiereDate.getMonth() + 1
          }-${movie.premiereDate.getFullYear()}`;
          return movie;
        })
      );
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetCinemaByPage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let listCinemas = await sequelize.query(
        `SELECT * FROM cinemas WHERE ${
          data.columnSearch === undefined ? "cinemaID" : data.columnSearch
        } like '%${
          data.value === undefined ? "" : data.value
        }%' ORDER BY id ASC LIMIT 10 OFFSET ${(data.quantity - 1) * 10}`,
        { type: QueryTypes.SELECT }
      );
      resolve(listCinemas);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetMovieDateByPage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let listMovieDates = await sequelize.query(
        `SELECT md.movieDateID, md.date, c.name as cinema, m.nameVN as movie FROM cinemas as c INNER JOIN moviedates as md ON c.cinemaID = md.cinemaID INNER JOIN movies as m ON md.movieID = m.movieID WHERE ${
          data.columnSearch === undefined ? "md.movieDateID" : data.columnSearch
        } like '%${
          data.value === undefined ? "" : data.value
        }%' ORDER BY md.movieDateID ASC LIMIT 10 OFFSET ${
          (data.quantity - 1) * 10
        }`,
        { type: QueryTypes.SELECT }
      );
      resolve(
        listMovieDates.map((movieDate) => {
          movieDate.date = `${movieDate.date.getDate()}-${
            movieDate.date.getMonth() + 1
          }-${movieDate.date.getFullYear()}`;
          return movieDate;
        })
      );
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetTicketByPage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let listTickets = await sequelize.query(
        `SELECT * FROM tickets WHERE ${
          data.columnSearch === undefined ? "ticketID" : data.columnSearch
        } like '%${
          data.value === undefined ? "" : data.value
        }%' ORDER BY id ASC LIMIT 10 OFFSET ${(data.quantity - 1) * 10}`,
        { type: QueryTypes.SELECT }
      );
      resolve(listTickets);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetComboByPage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let combos = await sequelize.query(
        `SELECT cb.comboID, cb.name, cb.price, cn.name as cinema FROM combos as cb INNER JOIN cinemas as cn ON cb.cinemaID = cn.cinemaID WHERE ${
          data.columnSearch === undefined ? "cb.comboID" : data.columnSearch
        } like '%${
          data.value === undefined ? "" : data.value
        }%' ORDER BY cb.id ASC LIMIT 10 OFFSET ${(data.quantity - 1) * 10}`,
        { type: QueryTypes.SELECT }
      );
      resolve(combos);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetFareByPage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let fares = await sequelize.query(
        `SELECT f.fareID, f.isAdult, f.isBeforeFiveHours, f.pricesOfMonWednesThursDay, f.pricesOfTuesDay, f.pricesOfFriSaturSunHoliDay, f.pricesOfGratitudeDay, cn.name as cinema FROM fares as f INNER JOIN cinemas as cn ON f.cinemaID = cn.cinemaID WHERE ${
          data.columnSearch === undefined ? "f.fareID" : data.columnSearch
        } like '%${
          data.value === undefined ? "" : data.value
        }%' ORDER BY f.id ASC LIMIT 10 OFFSET ${(data.quantity - 1) * 10}`,
        { type: QueryTypes.SELECT }
      );
      resolve(fares);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetUserByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        attributes : ["userID", "email", "name", "phone", "dateOfBirth", "gender"],
        where: { userID: id },
      });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetMovieByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let movie = await db.Movie.findOne({
        where: { movieID: id },
      });
      resolve(movie);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetCinemaByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cinema = await db.Cinema.findOne({
        where: { cinemaID: id },
      });
      resolve(cinema);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetMovieDateByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let movieDate = await db.MovieDate.findOne({
        attributes: ["movieDateID", "date", "cinemaID", "movieID"],
        where: { movieDateID: id },
      });
      resolve(movieDate);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetShowTimeByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let showTime = await db.ShowTime.findOne({
        attributes: ["time", "quality"],
        where: { showTimeID: id },
      });
      resolve(showTime);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetTicketByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let ticket = await db.Ticket.findOne({
        attributes: [
          "ticketID",
          "quantityTickets",
          "seats",
          "combos",
          "movieID",
          "cinemaID",
          "movieDateID",
          "showTimeID",
        ],
        where: { ticketID: id },
      });
      resolve(ticket);
    } catch (error) {
      reject(error);
    }
  });
};

let apiCheckAccountByEmailPassword = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let acocunt = await db.Account.findOne({
        attributes: ["userID"],
        where: { email: email , password : password},
      });
      let user = await apiGetUserByID(acocunt.dataValues.userID)
      resolve({accountContains : true, ...user.dataValues});
    } catch (error) {
      resolve({accountContains : false})
      reject(error);
    }
  });
};

let apiGetComboByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let combo = await db.Combo.findOne({
        where: { comboID: id },
      });
      resolve(combo);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetFareByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let fare = await db.Fare.findOne({
        attributes : ['fareID', 'isAdult', 'isBeforeFiveHours', 'pricesOfMonWednesThursDay', 'pricesOfTuesDay', 'pricesOfFriSaturSunHoliDay', 'pricesOfGratitudeDay', 'cinemaID'],
        where: { fareID: id },
      });
      resolve(fare);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetQuantityUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let quantitys = await sequelize.query(
        `SELECT COUNT(*) as quantity FROM users WHERE ${
          data.columnSearch === undefined ? "userID" : data.columnSearch
        } like '%${data.value === undefined ? "" : data.value}%'`,
        { type: QueryTypes.SELECT }
      );
      let arrayQuantity = [];
      if (quantitys[0].quantity % 10 === 0) {
        for (let i = 1; i <= quantitys[0].quantity / 10; i++) {
          arrayQuantity.push(i);
        }
      } else {
        for (let i = 1; i <= Math.ceil(quantitys[0].quantity / 10); i++) {
          arrayQuantity.push(i);
        }
      }
      resolve(arrayQuantity);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetQuantityMovie = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let quantitys = await sequelize.query(
        `SELECT COUNT(*) as quantity FROM movies WHERE ${
          data.columnSearch === undefined ? "movieID" : data.columnSearch
        } like '%${data.value === undefined ? "" : data.value}%'`,
        { type: QueryTypes.SELECT }
      );
      let arrayQuantity = [];
      if (quantitys[0].quantity % 10 === 0) {
        for (let i = 1; i <= quantitys[0].quantity / 10; i++) {
          arrayQuantity.push(i);
        }
      } else {
        for (let i = 1; i <= Math.ceil(quantitys[0].quantity / 10); i++) {
          arrayQuantity.push(i);
        }
      }
      resolve(arrayQuantity);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetQuantityCinema = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let quantitys = await sequelize.query(
        `SELECT COUNT(*) as quantity FROM cinemas WHERE ${
          data.columnSearch === undefined ? "cinemaID" : data.columnSearch
        } like '%${data.value === undefined ? "" : data.value}%'`,
        { type: QueryTypes.SELECT }
      );
      let arrayQuantity = [];
      if (quantitys[0].quantity % 10 === 0) {
        for (let i = 1; i <= quantitys[0].quantity / 10; i++) {
          arrayQuantity.push(i);
        }
      } else {
        for (let i = 1; i <= Math.ceil(quantitys[0].quantity / 10); i++) {
          arrayQuantity.push(i);
        }
      }
      resolve(arrayQuantity);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetQuantityMovieDate = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let quantitys = await sequelize.query(
        `SELECT COUNT(*) as quantity FROM moviedates WHERE ${
          data.columnSearch === undefined ? "movieDateID" : data.columnSearch
        } like '%${data.value === undefined ? "" : data.value}%'`,
        { type: QueryTypes.SELECT }
      );
      let arrayQuantity = [];
      if (quantitys[0].quantity % 10 === 0) {
        for (let i = 1; i <= quantitys[0].quantity / 10; i++) {
          arrayQuantity.push(i);
        }
      } else {
        for (let i = 1; i <= Math.ceil(quantitys[0].quantity / 10); i++) {
          arrayQuantity.push(i);
        }
      }
      resolve(arrayQuantity);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetQuantityTicket = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let quantitys = await sequelize.query(
        `SELECT COUNT(*) as quantity FROM tickets WHERE ${
          data.columnSearch === undefined ? "ticketID" : data.columnSearch
        } like '%${data.value === undefined ? "" : data.value}%'`,
        { type: QueryTypes.SELECT }
      );
      let arrayQuantity = [];
      if (quantitys[0].quantity % 10 === 0) {
        for (let i = 1; i <= quantitys[0].quantity / 10; i++) {
          arrayQuantity.push(i);
        }
      } else {
        for (let i = 1; i <= Math.ceil(quantitys[0].quantity / 10); i++) {
          arrayQuantity.push(i);
        }
      }
      resolve(arrayQuantity);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetQuantityCombo = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let quantitys = await sequelize.query(
        `SELECT COUNT(*) as quantity FROM combos WHERE ${
          data.columnSearch === undefined ? "comboID" : data.columnSearch
        } like '%${data.value === undefined ? "" : data.value}%'`,
        { type: QueryTypes.SELECT }
      );
      let arrayQuantity = [];
      if (quantitys[0].quantity % 10 === 0) {
        for (let i = 1; i <= quantitys[0].quantity / 10; i++) {
          arrayQuantity.push(i);
        }
      } else {
        for (let i = 1; i <= Math.ceil(quantitys[0].quantity / 10); i++) {
          arrayQuantity.push(i);
        }
      }
      resolve(arrayQuantity);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetQuantityFare = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let quantitys = await sequelize.query(
        `SELECT COUNT(*) as quantity FROM fares WHERE ${
          data.columnSearch === undefined ? "fareID" : data.columnSearch
        } like '%${data.value === undefined ? "" : data.value}%'`,
        { type: QueryTypes.SELECT }
      );
      let arrayQuantity = [];
      if (quantitys[0].quantity % 10 === 0) {
        for (let i = 1; i <= quantitys[0].quantity / 10; i++) {
          arrayQuantity.push(i);
        }
      } else {
        for (let i = 1; i <= Math.ceil(quantitys[0].quantity / 10); i++) {
          arrayQuantity.push(i);
        }
      }
      resolve(arrayQuantity);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetUserBySearch = (columnSearch, value) => {
  return new Promise(async (resolve, reject) => {
    try {
      let stringQuery = "";
      if (value.includes("@")) {
        stringQuery = `select * from users where ${columnSearch} like '%${value}%';`;
      } else if (value.includes("US")) {
        stringQuery = `select * from users where ${columnSearch} like '%${value}%';`;
      } else {
        stringQuery = `select * from users where ${columnSearch} like '%${value}%';`;
      }
      let users = await sequelize.query(stringQuery, {
        type: QueryTypes.SELECT,
      });
      resolve(users);
    } catch (error) {
      resolve([]);
    }
  });
};

let apiGetListMovieByCinemaID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let listMovies = await sequelize.query(
        "SELECT md.movieID, m.nameVN as name FROM moviedates as md INNER JOIN movies as m ON md.movieID = m.movieID WHERE md.cinemaID = '" +
          id +
          "'",
        { type: QueryTypes.SELECT }
      );
      resolve(listMovies);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetListMovieDateByCinemaIDAndMovieID = (cinemaID, movieID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let movieDates = await db.MovieDate.findAll({
        attributes: ["movieDateID", "date"],
        where: { cinemaID: cinemaID, movieID: movieID },
      });
      resolve(movieDates);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetDetailInfoTicket = (ticketID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let ticketByID = await apiGetTicketByID(ticketID)
      let showtime = await apiGetShowTimeByID(ticketByID.dataValues.showTimeID)
      let moviedate = await apiGetMovieDateByID(ticketByID.dataValues.movieDateID)
      let weekDay = await apiGetWeekDay(`${moviedate.dataValues.date.getFullYear()}-${moviedate.dataValues.date.getMonth()+1}-${moviedate.dataValues.date.getDate()}`)
      let ticketPrices = await apiGetTicketPrices(weekDay[0].weekday, showtime.dataValues.time < '17:00')

      let ticket = await sequelize.query(
        "SELECT tk.seats, tk.combos, tk.totalPrices, mv.nameVN, mv.time as minutes, c.name, c.address, md.date, st.time, st.quality FROM tickets as tk INNER JOIN movies as mv ON tk.movieID = mv.movieID INNER JOIN cinemas as c ON tk.cinemaID = c.cinemaID INNER JOIN moviedates as md ON tk.movieDateID = md.movieDateID INNER JOIN showtimes as st ON tk.showTimeID = st.showTimeID WHERE tk.ticketID = '" +
          ticketID +
          "'",
        { type: QueryTypes.SELECT }
      );
      ticket[0].ticketPrices = ticketPrices * ticketByID.quantityTickets
      ticket[0].comboNames = await apiGetCombosChosen(
        ticket[0].combos.split(";")
      );
      ticket[0].time = ticket[0].time.slice(0, 5);
      let timeStart =
        Number(ticket[0].time.split(":")[0]) * 60 +
        Number(ticket[0].time.split(":")[1]);

      let timeFinish = timeStart + Number(ticket[0].minutes.match(/(\d+)/)[0]);

      if (Math.floor(timeFinish / 60) < 10) {
        ticket[0].timeFinish = `0${Math.floor(timeFinish / 60)}:${
          timeFinish % 60
        }`;
      } else if (
        Math.floor(timeFinish / 60) >= 10 &&
        Math.floor(timeFinish / 60) < 24
      ) {
        ticket[0].timeFinish = `${Math.floor(timeFinish / 60)}:${
          timeFinish % 60
        }`;
      } else {
        ticket[0].timeFinish = `${Math.floor(timeFinish / 60) - 24}:${
          timeFinish % 60
        }`;
      }
      resolve(ticket[0]);
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetCombosChosen = (combos) => {
  return new Promise(async (resolve, reject) => {
    try {
      let combosChosen = [];
      await combos.map(async (combo, index) => {
        let listCombos = await sequelize.query(
          `SELECT name, price FROM combos WHERE comboID = '${combo}'`,
          {
            type: QueryTypes.SELECT,
          }
        );
        combosChosen = [...combosChosen, ...listCombos];
        combos.length === index + 1 && resolve(combosChosen);
      });
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetWeekDay = (date) => {
  return new Promise(async (resolve, reject) => {
    try {
      let weekDay = await sequelize.query(
        "SELECT WEEKDAY('"+date+"') as weekday",
        { type: QueryTypes.SELECT }
      );
      resolve(weekDay)
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetTicketPrices = (weekday, isBeforeFiveHours) => {
  return new Promise(async (resolve, reject) => {
    try {
      let ticketPrices = 0
      if(weekday === 0 |weekday === 2 | weekday === 3){
        if(isBeforeFiveHours){
          ticketPrices = await sequelize.query(
            "SELECT pricesOfMonWednesThursDay FROM fares WHERE isAdult = 1 AND isBeforeFiveHours = 1",
            { type: QueryTypes.SELECT }
          );
        }
        else{
          ticketPrices = await sequelize.query(
            "SELECT pricesOfMonWednesThursDay FROM fares WHERE isAdult = 1 AND isBeforeFiveHours = 0",
            { type: QueryTypes.SELECT }
          );
        }
        resolve(ticketPrices[0].pricesOfMonWednesThursDay)
      }
      else if(weekday === 4 |weekday === 5 | weekday === 6){
        if(isBeforeFiveHours){
          ticketPrices = await sequelize.query(
            "SELECT pricesOfFriSaturSunHoliDay FROM fares WHERE isAdult = 1 AND isBeforeFiveHours = 1",
            { type: QueryTypes.SELECT }
          );
        }
        else{
          ticketPrices = await sequelize.query(
            "SELECT pricesOfFriSaturSunHoliDay FROM fares WHERE isAdult = 1 AND isBeforeFiveHours = 0",
            { type: QueryTypes.SELECT }
          );
        }
        resolve(ticketPrices[0].pricesOfFriSaturSunHoliDay)
      }
      else if(weekday === 1){
        if(isBeforeFiveHours){
          ticketPrices = await sequelize.query(
            "SELECT pricesOfTuesDay FROM fares WHERE isAdult = 1 AND isBeforeFiveHours = 1",
            { type: QueryTypes.SELECT }
          );
        }
        else{
          ticketPrices = await sequelize.query(
            "SELECT pricesOfTuesDay FROM fares WHERE isAdult = 1 AND isBeforeFiveHours = 0",
            { type: QueryTypes.SELECT }
          );
        }
        resolve(ticketPrices[0].pricesOfTuesDay)
      }
      else{
        if(isBeforeFiveHours){
          ticketPrices = await sequelize.query(
            "SELECT pricesOfGratitudeDay FROM fares WHERE isAdult = 1 AND isBeforeFiveHours = 1",
            { type: QueryTypes.SELECT }
          );
        }
        else{
          ticketPrices = await sequelize.query(
            "SELECT pricesOfGratitudeDay FROM fares WHERE isAdult = 1 AND isBeforeFiveHours = 0",
            { type: QueryTypes.SELECT }
          );
        }
        resolve(ticketPrices[0].pricesOfGratitudeDay)
      }
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetNameTimeOfMovieByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let movies = await sequelize.query(
        `SELECT movieID, nameEN, time FROM movies WHERE movieID = '${id}'`,
        { type: QueryTypes.SELECT }
      );
      resolve(movies[0])
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetDateOfMovieDateByMovieID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let date = new Date()
      let movieDates = await sequelize.query(
        `SELECT movieDateID, date, cinemaID FROM moviedates WHERE date >= '${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}' AND movieID = '${id}'`,
        { type: QueryTypes.SELECT }
      );
      resolve(movieDates)
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetNameAddressOfCinemaByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cinemas = await sequelize.query(
        `SELECT cinemaID, name, placeID FROM cinemas WHERE cinemaID = '${id}'`,
        { type: QueryTypes.SELECT }
      );
      resolve(cinemas[0])
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetTimeQualityOfShowTimeByMovieDateID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let showtimes = await sequelize.query(
        `SELECT
        md.movieDateID,
        c.cinemaID,
        md.date,
        c.placeID as place,
        CONCAT(
          "[",
          GROUP_CONCAT(
            CONCAT(
              "{'showTimeID': '", st.showTimeID, "', ",
              "'time': '", st.time, "', ",
              "'quality': '", st.quality, "'",
              "}"
            )
            SEPARATOR ","
          ),
          "]"
        ) AS showtimes
      FROM
        showtimes AS st
      INNER JOIN
        moviedates AS md ON st.movieDateID = md.movieDateID
      INNER JOIN
        cinemas AS c ON md.cinemaID = c.cinemaID
      WHERE
        st.movieDateID = '${id}'
      GROUP BY
        md.movieDateID, c.cinemaID, md.date`,
        { type: QueryTypes.SELECT }
      );
      resolve(showtimes)
    } catch (error) {
      reject(error);
    }
  });
};

function compareCinemas(cinema1, cinema2) {
  return (
    cinema1.cinemaID === cinema2.cinemaID &&
    cinema1.name === cinema2.name &&
    cinema1.address === cinema2.address &&
    cinema1.placeID === cinema2.placeID
  );
}

let apiGetShowTimeMovie = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let movie = await apiGetNameTimeOfMovieByID(id)
      let movieDates = await apiGetDateOfMovieDateByMovieID(movie.movieID)
      let cinemas = []
      for (let i = 0; i < movieDates.length; i++) {
        let cinema = await apiGetNameAddressOfCinemaByID(movieDates[i].cinemaID)
        cinemas.push(cinema)
      }
      const uniqueCinemas = cinemas.filter((cinema, index, self) => {
        return (
          index ===
          self.findIndex((c) => compareCinemas(c, cinema))
        );
      });

      let place = uniqueCinemas.map(cinema => cinema.placeID)
      const uniquePlace = place.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      let showtimes = []
      for (let i = 0; i < movieDates.length; i++) {
        let showTime = await apiGetTimeQualityOfShowTimeByMovieDateID(movieDates[i].movieDateID)
        showtimes.push(showTime)
      }

      let showTimeMovie = {
        movie : movie,
        movieDates : movieDates,
        cinemas : uniqueCinemas,
        places : uniquePlace,
        showtimes :showtimes
      }
      console.log(showTimeMovie);
      console.log(showtimes);
      resolve(showTimeMovie)
    } catch (error) {
      reject(error);
    }
  });
};

let apiGetPricesOfFare = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let date = new Date(data.date)
      var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      var dayMWT = ['monday', 'wednesday', 'thursday'];
      var dayOfWeek = days[date.getDay()];
      let columnPrices = (dayOfWeek === 'tuesday') ? 'pricesOfTuesDay' : (dayMWT.includes(dayOfWeek) ? 'pricesOfMonWednesThursDay' : 'pricesOfFriSaturSunHoliDay')
      let isBeforeFiveHours = data.time < '17:00'

      let prices = await sequelize.query(
        `SELECT ${columnPrices } as price FROM fares WHERE cinemaID = '${data.cinemaID}' AND isBeforeFiveHours = ${isBeforeFiveHours}`,
        { type: QueryTypes.SELECT }
      );
      resolve(prices[0].price * data.quantity)
    } catch (error) {
      reject(error);
    }
  });
};
// API PUT
let apiPutUpdateUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.update(
        {
          userID: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          dateOfBirth: user.date,
          gender: user.gender,
        },
        { where: { userID: user.id } }
      );
      resolve({
        isUpdate: true,
        announceUpdate: `update ${user.id}-${user.email}-${user.name}-${user.phone}-${user.dateOfBirth}-${user.gender} is success`,
      });
    } catch (error) {
      resolve({
        isUpdate: false,
        announceUpdate: `update ${user.id}-${user.email}-${user.name}-${user.phone}-${user.dateOfBirth}-${user.gender} is fail`,
        messageError: error.errors.map((err) => {
          if (err.message === "email must be unique") {
            return "Email đã tồn tại";
          } else if (err.message === "phone must be unique") {
            return "Số điện thoại đã tồn tại";
          } else {
            return err.message;
          }
        }),
        pathError: error.errors.map((err) => err.path),
      });
    }
  });
};

let apiPutUpdateMovie = (movie) => {
  return new Promise(async (resolve, reject) => {
    try {
      const update = await db.Movie.update(
        {
          movieID: movie.id,
          nameEN: movie.nameEN,
          nameVN: movie.nameVN,
          category: movie.category,
          time: movie.time,
          premiereDate: movie.premiereDate,
          director: movie.director,
          producer: movie.producer,
          actor: movie.actor,
          country: movie.country,
          image: movie.poster,
        },
        { where: { movieID: movie.id } }
      );
      resolve({
        isUpdate: true,
        announceUpdate: `update ${movie.id}-${movie.nameEN}-${movie.nameVN}-${movie.category}-${movie.time}-${movie.premiereDate}-${movie.director}-${movie.producer}-${movie.actor}-${movie.country}-${movie.poster} is success`,
      });
    } catch (error) {
      resolve({
        isUpdate: false,
        announceUpdate: `update ${movie.id}-${movie.nameEN}-${movie.nameVN}-${movie.category}-${movie.time}-${movie.premiereDate}-${movie.director}-${movie.producer}-${movie.actor}-${movie.country}-${movie.poster} is fail`,
      });
    }
  });
};

let apiPutUpdateCinema = (cinema) => {
  return new Promise(async (resolve, reject) => {
    try {
      const update = await db.Cinema.update(
        {
          cinemaID: cinema.id,
          name: cinema.name,
          address: cinema.address,
          phone: cinema.phone,
          image: cinema.image,
          placeID: cinema.city,
        },
        { where: { cinemaID: cinema.id } }
      );
      resolve({
        isUpdate: true,
        announceUpdate: `update ${cinema.id}-${cinema.name}-${cinema.address}-${cinema.phone}-${cinema.image}-${cinema.placeID} is success`,
      });
    } catch (error) {
      resolve({
        isUpdate: false,
        announceUpdate: `update ${cinema.id}-${cinema.name}-${cinema.address}-${cinema.phone}-${cinema.image}-${cinema.placeID} is fail`,
      });
    }
  });
};

let apiPutUpdateMovieDate = (movieDate) => {
  return new Promise(async (resolve, reject) => {
    try {
      const update = await db.MovieDate.update(
        {
          movieDateID: movieDate.id,
          date: movieDate.movieDate,
          cinemaID: movieDate.cinema,
          movieID: movieDate.movie,
        },
        { where: { movieDateID: movieDate.id } }
      );
      resolve({
        isUpdate: true,
        announceUpdate: `update ${movieDate.id}-${movieDate.movieDate}-${movieDate.cinema}-${movieDate.movie} is success`,
      });
    } catch (error) {
      resolve({
        isUpdate: false,
        announceUpdate: `update ${movieDate.id}-${movieDate.movieDate}-${movieDate.cinema}-${movieDate.movie} is fail`,
      });
    }
  });
};

let apiPutUpdateShowTime = (showTime) => {
  return new Promise(async (resolve, reject) => {
    try {
      const update = await db.ShowTime.update(
        {
          time: showTime.time,
          quality: showTime.quality,
        },
        { where: { showTimeID: showTime.id } }
      );
      resolve({
        showTimeID: showTime.id,
        isUpdate: true,
        announceUpdate: `update ${showTime.id}-${showTime.time}-${showTime.quality} is success`,
      });
    } catch (error) {
      resolve({
        isUpdate: false,
        announceUpdate: `update ${showTime.id}-${showTime.time}-${showTime.quality} is fail`,
      });
    }
  });
};

let apiPutUpdateContentFilmMovie = (id, contentFilm) => {
  return new Promise(async (resolve, reject) => {
    try {
      const update = await db.Movie.update(
        {
          contentFilm: contentFilm,
        },
        { where: { movieID: id } }
      );
      resolve({
        isUpdate: true,
        contentFilm: contentFilm,
      });
    } catch (error) {
      resolve({
        isUpdate: false,
      });
    }
  });
};

let apiPutUpdateTicket = (ticket) => {
  return new Promise(async (resolve, reject) => {
    try {
      let totalPrices = 0
      let showtime = await apiGetShowTimeByID(ticket.showTime)
      let moviedate = await apiGetMovieDateByID(ticket.movieDate)
      let combosChosen = ticket.combos.length > 0 ? await apiGetCombosChosen(ticket.combos) : []
      let weekDay = await apiGetWeekDay(`${moviedate.dataValues.date.getFullYear()}-${moviedate.dataValues.date.getMonth()+1}-${moviedate.dataValues.date.getDate()}`)
      let ticketPrices = await apiGetTicketPrices(weekDay[0].weekday, showtime.dataValues.time < '17:00')

      combosChosen.forEach(combo => totalPrices += combo.price)
      totalPrices += ticketPrices*ticket.quantityTickets

      const update = await db.Ticket.update(
        {
          ticketID: ticket.id,
          quantityTickets: ticket.quantityTickets,
          seats: ticket.seats.join(";"),
          combos: ticket.combos.join(";"),
          totalPrices : totalPrices,
          cinemaID: ticket.cinema,
          movieID: ticket.movie,
          movieDateID: ticket.movieDate,
          showTimeID: ticket.showTime,
        },
        { where: { ticketID: ticket.id } }
      );
      resolve({
        isUpdate: true,
        announceUpdate: `update ${ticket.id}-${ticket.quantityTickets}-${ticket.seats}-${ticket.combos}-${ticket.cinema}-${ticket.movie}-${ticket.movieDate}-${ticket.showTime}-${totalPrices} is success`,
      });
    } catch (error) {
      resolve({
        isUpdate: false,
        announceUpdate: `update ${ticket.id}-${ticket.quantityTickets}-${ticket.seats}-${ticket.combos}-${ticket.cinema}-${ticket.movie}-${ticket.movieDate}-${ticket.showTime}-${totalPrices} is fail`,
      });
    }
  });
};

let apiPutUpdateCombo = (combo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const update = await db.Combo.update(
        {
          comboID: combo.id,
          name: combo.name,
          price: combo.price,
          cinemaID: combo.cinema,
        },
        { where: { comboID: combo.id } }
      );
      resolve({
        isUpdate: true,
        announceUpdate: `update ${combo.id}-${combo.name}-${combo.price}-${combo.cinema} is success`,
      });
    } catch (error) {
      resolve({
        isUpdate: false,
        announceUpdate: `update ${combo.id}-${combo.name}-${combo.price}-${combo.cinema} is fail`,
      });
    }
  });
};

let apiPutUpdateFare = (fare) => {
  return new Promise(async (resolve, reject) => {
    try {
      const update = await db.Fare.update(
        {
          fareID: fare.id,
          isAdult: fare.isAdult,
          isBeforeFiveHours: fare.isBeforeFiveHours,
          pricesOfMonWednesThursDay: fare.pricesOfMonWednesThursDay,
          pricesOfTuesDay: fare.pricesOfTuesDay,
          pricesOfFriSaturSunHoliDay: fare.pricesOfFriSaturSunHoliDay,
          pricesOfGratitudeDay: fare.pricesOfGratitudeDay,
          cinemaID: fare.cinema,
        },
        { where: { fareID: fare.id } }
      );
      resolve({
        isUpdate: true,
        announceUpdate: `update ${fare.id}-${fare.isAdult}-${fare.isBeforeFiveHours}-${fare.pricesOfMonWednesThursDay}-${fare.pricesOfTuesDay}-${fare.pricesOfFriSaturSunHoliDay}-${fare.pricesOfGratitudeDay}-${fare.cinema} is success`,
      });
    } catch (error) {
      resolve({
        isUpdate: false,
        announceUpdate: `update ${fare.id}-${fare.isAdult}-${fare.isBeforeFiveHours}-${fare.pricesOfMonWednesThursDay}-${fare.pricesOfTuesDay}-${fare.pricesOfFriSaturSunHoliDay}-${fare.pricesOfGratitudeDay}-${fare.cinema} is fail`,
      });
    }
  });
};

// API DELETE
let apiDeleteUserByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.destroy({
        where: { userID: id },
      });
      resolve({
        isDelete: true,
        resultDelete: `delete ${id} success`,
      });
    } catch (error) {
      resolve({
        isDelete: false,
        resultDelete: `delete ${id} fail`,
      });
    }
  });
};

let apiDeleteMovieByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Movie.destroy({
        where: { movieID: id },
      });
      resolve({
        isDelete: true,
        resultDelete: `delete ${id} success`,
      });
    } catch (error) {
      resolve({
        isDelete: false,
        resultDelete: `delete ${id} fail`,
      });
    }
  });
};

let apiDeleteCinemaByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Cinema.destroy({
        where: { cinemaID: id },
      });
      resolve({
        isDelete: true,
        resultDelete: `delete ${id} success`,
      });
    } catch (error) {
      resolve({
        isDelete: false,
        resultDelete: `delete ${id} fail`,
      });
    }
  });
};

let apiDeleteMovieDateByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.MovieDate.destroy({
        where: { movieDateID: id },
      });
      resolve({
        isDelete: true,
        resultDelete: `delete ${id} success`,
      });
    } catch (error) {
      resolve({
        isDelete: false,
        resultDelete: `delete ${id} fail`,
      });
    }
  });
};

let apiDeleteShowTimeByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.ShowTime.destroy({
        where: { showTimeID: id },
      });
      resolve({
        isDelete: true,
        resultDelete: `delete ${id} success`,
      });
    } catch (error) {
      resolve({
        isDelete: false,
        resultDelete: `delete ${id} fail`,
      });
    }
  });
};

let apiDeleteTicketByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Ticket.destroy({
        where: { ticketID: id },
      });
      resolve({
        isDelete: true,
        resultDelete: `delete ${id} success`,
      });
    } catch (error) {
      resolve({
        isDelete: false,
        resultDelete: `delete ${id} fail`,
      });
    }
  });
};

let apiDeleteComboByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Combo.destroy({
        where: { comboID: id },
      });
      resolve({
        isDelete: true,
        resultDelete: `delete ${id} success`,
      });
    } catch (error) {
      resolve({
        isDelete: false,
        resultDelete: `delete ${id} fail`,
      });
    }
  });
};

let apiDeleteFareByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Fare.destroy({
        where: { fareID: id },
      });
      resolve({
        isDelete: true,
        resultDelete: `delete ${id} success`,
      });
    } catch (error) {
      resolve({
        isDelete: false,
        resultDelete: `delete ${id} fail`,
      });
    }
  });
};

module.exports = {
  // API POST
  apiPostInsertUser,
  apiPostInsertMovie,
  apiPostInsertCinema,
  apiPostInsertMovieDate,
  apiPostInsertShowTime,
  apiPostInsertTicket,
  apiPostInsertCombo,
  apiPostInsertFare,
  apiPostInsertAccount,

  // API GET
  apiGetListCinema,
  apiGetListMovie,
  apiGetAllShowTimeByMovieDateID,
  apiGetSeatsChosen,
  apiGetCombos,
  apiGetUserID,
  apiGetAccountID,
  apiGetMovieID,
  apiGetCinemaID,
  apiGetMovieDateID,
  apiGetShowTimeID,
  apiGetTicketID,
  apiGetComboID,
  apiGetFareID,
  apiGetUserByPage,
  apiGetMovieByPage,
  apiGetCinemaByPage,
  apiGetMovieDateByPage,
  apiGetTicketByPage,
  apiGetComboByPage,
  apiGetFareByPage,
  apiGetUserByID,
  apiGetMovieByID,
  apiGetCinemaByID,
  apiGetMovieDateByID,
  apiGetShowTimeByID,
  apiGetTicketByID,
  apiGetComboByID,
  apiGetFareByID,
  apiGetQuantityUser,
  apiGetQuantityMovie,
  apiGetQuantityCinema,
  apiGetQuantityMovieDate,
  apiGetQuantityTicket,
  apiGetQuantityCombo,
  apiGetQuantityFare,
  apiGetUserBySearch,
  apiGetListMovieByCinemaID,
  apiGetListMovieDateByCinemaIDAndMovieID,
  apiGetDetailInfoTicket,
  apiGetShowTimeMovie,
  apiGetPricesOfFare,
  apiCheckAccountByEmailPassword,
  // API PUT
  apiPutUpdateUser,
  apiPutUpdateMovie,
  apiPutUpdateCinema,
  apiPutUpdateMovieDate,
  apiPutUpdateShowTime,
  apiPutUpdateContentFilmMovie,
  apiPutUpdateTicket,
  apiPutUpdateCombo,
  apiPutUpdateFare,

  // API DELETE
  apiDeleteUserByID,
  apiDeleteMovieByID,
  apiDeleteCinemaByID,
  apiDeleteMovieDateByID,
  apiDeleteShowTimeByID,
  apiDeleteTicketByID,
  apiDeleteComboByID,
  apiDeleteFareByID,
};
