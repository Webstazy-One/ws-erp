module.exports = app => {
  const cust_merge = require("../controllers/cust_merge.controller.js");

  var router = require("express").Router();

  router.post("/", cust_merge.create);

  app.use("/api/cust_merge", router);
};
