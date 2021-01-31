
module.exports = app => {
    const stockmappingservice = require("../controllers/stockmappingservice.controller.js")

    var router = require("express").Router()

    router.post("/stockmismatching", stockmappingservice.findMatchingInItem)


  router.post("/itemmismatching", stockmappingservice.findMatchingInStock)

    app.use('/api/fix/stockmappingservice', router)
}