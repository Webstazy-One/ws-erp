module.exports = app => {
  const goodreceivednote = require("../controllers/goodreceivednote.controller.js")

  var router = require("express").Router()

  router.post("/", goodreceivednote.create)

  router.get("/all", goodreceivednote.findAll)
  
  router.get("/:GRNId", goodreceivednote.findOne)

  app.use('/api/grn', router)
};