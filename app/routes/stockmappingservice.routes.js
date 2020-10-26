
module.exports = app => {
    const stockmappingservice = require("../controllers/stockmappingservice.controller.js")

    var router = require("express").Router()



  router.post("/itemmismatching", stockmappingservice.findMatchingInItem)

    app.use('/api/fix/stockmappingservice', router)
}