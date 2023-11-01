import express from "express"
import controller from '../controllers/controller'

let router = express.Router();

let initWebRoutes = (app) => {
    
    router.get("/", (req, res) => {
        res.send("Home Page")
    });

    // API GET
    router.get("/api/movie-date/get-list-cinema", controller.apiGetListCinema)
    router.get("/api/combo/get-list-cinema", controller.apiGetListCinema)
    router.get("/api/fare/get-list-cinema", controller.apiGetListCinema)
    router.get("/api/ticket/get-all-cinemas", controller.apiGetListCinema)
    router.get("/api/movie-date/get-list-movie", controller.apiGetListMovie)
    router.post("/api/show-time/get-all-showTime-by-movieDateID", controller.apiGetAllShowTimeByMovieDateID)
    router.post("/api/ticket/get-all-showTime-by-movieDateID", controller.apiGetAllShowTimeByMovieDateID)
    router.get("/api/ticket/get-seats-chosen", controller.apiGetSeatsChosen)
    router.get("/api/ticket/get-combos", controller.apiGetCombos)
    router.get("/api/user/get-userID", controller.apiGetUserID)
    router.get("/api/account/get-accountID", controller.apiGetAccountID)
    router.get("/api/movie/get-movieID", controller.apiGetMovieID)
    router.get("/api/cinema/get-cinemaID", controller.apiGetCinemaID)
    router.get("/api/movie-date/get-movieDateID", controller.apiGetMovieDateID)
    router.get("/api/ticket/get-ticketID", controller.apiGetTicketID)
    router.get("/api/combo/get-comboID", controller.apiGetComboID)
    router.get("/api/fare/get-fareID", controller.apiGetFareID)
    router.post("/api/user/get-users-by-page", controller.apiGetUserByPage)
    router.post("/api/movie/get-movies-by-page", controller.apiGetMovieByPage)
    router.post("/api/cinema/get-cinemas-by-page", controller.apiGetCinemaByPage)
    router.post("/api/movie-date/get-movieDates-by-page", controller.apiGetMovieDateByPage)
    router.post("/api/ticket/get-tickets-by-page", controller.apiGetTicketByPage)
    router.post("/api/combo/get-combos-by-page", controller.apiGetComboByPage)
    router.post("/api/fare/get-fares-by-page", controller.apiGetFareByPage)
    router.post("/api/user/get-user-by-id", controller.apiGetUserByID)
    router.post("/api/movie/get-movie-by-id", controller.apiGetMovieByID)
    router.post("/api/cinema/get-cinema-by-id", controller.apiGetCinemaByID)
    router.post("/api/movie-date/get-movieDate-by-id", controller.apiGetMovieDateByID)
    router.post("/api/show-time/get-showTime-by-id", controller.apiGetShowTimeByID)
    router.post("/api/ticket/get-ticket-by-id", controller.apiGetTicketByID)
    router.post("/api/combo/get-combo-by-id", controller.apiGetComboByID)
    router.post("/api/fare/get-fare-by-id", controller.apiGetFareByID)
    router.post("/api/user/get-quantity-user", controller.apiGetQuantityUser)
    router.post("/api/movie/get-quantity-movie", controller.apiGetQuantityMovie)
    router.post("/api/cinema/get-quantity-cinema", controller.apiGetQuantityCinema)
    router.post("/api/movie-date/get-quantity-movieDate", controller.apiGetQuantityMovieDate)
    router.post("/api/ticket/get-quantity-ticket", controller.apiGetQuantityTicket)
    router.post("/api/combo/get-quantity-combo", controller.apiGetQuantityCombo)
    router.post("/api/fare/get-quantity-fare", controller.apiGetQuantityFare)
    router.post("/api/user/get-users-by-search", controller.apiGetUserBySearch)
    router.post("/api/ticket/get-movies-by-cinemaID", controller.apiGetListMovieByCinemaID),
    router.post("/api/ticket/get-movieDates-by-cinemaID-movieID", controller.apiGetListMovieDateByCinemaIDAndMovieID),
    router.post("/api/ticket/get-detail-info-ticket-by-id", controller.apiGetDetailInfoTicket)
    router.post("/api/movie/get-show-time-movie-by-movieID", controller.apiGetShowTimeMovie)
    router.post("/api/fare/get-prices-of-fare-by-cinemaID", controller.apiGetPricesOfFare)
    router.post("/api/account/check-account-by-email-password", controller.apiCheckAccountByEmailPassword)
    // API POST
    router.post("/api/account/post-account", controller.apiPostInsertAccount)
    router.post("/api/user/post-user", controller.apiPostInsertUser)
    router.post("/api/movie/post-movie", controller.apiPostInsertMovie)
    router.post("/api/cinema/post-cinema", controller.apiPostInsertCinema)
    router.post("/api/movie-date/post-movieDate", controller.apiPostInsertMovieDate)
    router.post("/api/show-time/post-showTime", controller.apiPostInsertShowTime)
    router.post("/api/ticket/post-ticket", controller.apiPostInsertTicket)
    router.post("/api/combo/post-combo", controller.apiPostInsertCombo)
    router.post("/api/fare/post-fare", controller.apiPostInsertFare)

    // API PUT
    router.put("/api/user/put-user", controller.apiPutUpdateUser)
    router.put("/api/movie/put-movie", controller.apiPutUpdateMovie)
    router.put("/api/cinema/put-cinema", controller.apiPutUpdateCinema)
    router.put("/api/movie-date/put-movieDate", controller.apiPutUpdateMovieDate)
    router.put("/api/show-time/put-showTime", controller.apiPutUpdateShowTime)
    router.put("/api/movie/put-content-film-movie", controller.apiPutUpdateContentFilmMovie)
    router.put("/api/ticket/put-ticket", controller.apiPutUpdateTicket)
    router.put("/api/combo/put-combo", controller.apiPutUpdateCombo)
    router.put("/api/fare/put-fare", controller.apiPutUpdateFare)

    // API DELETE
    router.post("/api/user/delete-user-by-id", controller.apiDeleteUserByID)
    router.post("/api/movie/delete-movie-by-id", controller.apiDeleteMovieByID)
    router.post("/api/cinema/delete-cinema-by-id", controller.apiDeleteCinemaByID)
    router.post("/api/movie-date/delete-movieDate-by-id", controller.apiDeleteMovieDateByID)
    router.post("/api/show-time/delete-showTime-by-id", controller.apiDeleteShowTimeByID)
    router.post("/api/ticket/delete-ticket-by-id", controller.apiDeleteTicketByID)
    router.post("/api/combo/delete-combo-by-id", controller.apiDeleteComboByID)
    router.post("/api/fare/delete-fare-by-id", controller.apiDeleteFareByID)

    return app.use("/", router);
}

export default initWebRoutes