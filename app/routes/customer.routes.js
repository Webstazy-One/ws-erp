module.exports = (app) => {
  const customers = require("../controllers/customer.controller.js");

  var router = require("express").Router();

  router.post("/", customers.create);

  router.put("/:phone", customers.updateByCustomerPhone);

  router.get("/", customers.findAll);

  router.get("/phone/:ph", customers.findByPhone);

  app.use("/api/customer", router);
};
