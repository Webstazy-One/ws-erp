module.exports = (app) => {
  const customers = require("../controllers/customer.controller.js");

  var router = require("express").Router();

  router.post("/", customers.create);

  router.put("/:phone", customers.update);

  router.delete("/:phone", customers.delete);

  router.get("/:ph", customers.findByPhone);

  router.get("/", customers.findAll);

  app.use("/api/customer", router);
};
