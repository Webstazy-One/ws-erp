module.exports = app => {
  const invoice = require("../controllers/invoice.controller.js");
  const db = require("../models");
  const Invoice = db.invoice;
  var router = require("express").Router();

  router.post("/", invoice.create);

  router.delete("/:inv_id", invoice.delete);
  
  router.put("/:id", invoice.update);
    
  router.get("/:inv_id", invoice.findOne);

  router.get("/", invoice.findAll);

  router.get("/date/:dt", invoice.findByDate);

  router.get("/customer/:cust", invoice.findByCust);

  router.get("/", invoice.findAllActive);

  router.get("/id/last", invoice.findLast);

  app.use('/api/invoice', router);
  
};