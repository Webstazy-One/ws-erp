module.exports = app => {
  const exchange = require("../controllers/exchange.controller.js");

  var router = require("express").Router();

  // Create a new Exchange
  router.post("/", exchange.create);

  // Retrieve all Exchange
  router.get("/", exchange.findAll);

  // Retrieve a single Exchange with id
  router.get("/:id", exchange.findOne);

  // Update a Exchange with id
  router.put("/:id", exchange.update);

  // Delete a Exchange with id
  router.delete("/:id", exchange.delete);

  // Create a new Exchange
  router.delete("/", exchange.deleteAll);

  app.use('/api/exchange', router);
};