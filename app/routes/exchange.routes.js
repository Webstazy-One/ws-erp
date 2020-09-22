module.exports = app => {
  const exchange = require("../controllers/exchange.controller.js");

  var router = require("express").Router();

  router.post("/", exchange.create);

  router.get("/", exchange.findAll);
  
  router.get("/:exchangeId", exchange.findOne);

  router.get("/invId/:invId", exchange.findByInvId);

  router.get("/appliedInv/:appliedInv", exchange.findByAppliedInv);
  
  app.use('/api/exchange', router);
};