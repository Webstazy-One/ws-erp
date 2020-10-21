module.exports = app => {
  const purchase = require("../controllers/purchase.controller.js");

  var router = require("express").Router();

  router.post("/", purchase.create);

  router.get("/all", purchase.findAll);

  router.get("/", purchase.findAllActive);

  router.get("/:purchaseId", purchase.findOne);
 
  router.get("/invId/:invId", purchase.findByInvoiceId);

  app.use('/api/purchase', router);
};