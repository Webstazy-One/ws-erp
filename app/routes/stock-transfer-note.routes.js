const stn = require("../controllers/stock-transfer.controller.js")

module.exports = app => {

    var router = require("express").Router()

    router.post("/", stn.create)

    app.use("/api/stn", router)

}