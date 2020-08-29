module.exports = app => {
  const cust_merge = require("../controllers/cust_merge.controller.js");

  var router = require("express").Router();

  // Create a new cust_merge
  router.post("/", cust_merge.create);

  // Retrieve all cust_merge
  router.get("/", cust_merge.findAll);

  // Retrieve a single cust_merge with phone
  router.get("/:phone", cust_merge.findOne);

  // Delete a cust_merge with phone
  router.delete("/:phone", cust_merge.delete);

  // Delete a cust_merge with phone1
  router.delete("/:phone1", cust_merge.delete);
  //List customer merge by phone
  router.get("/phone1/:ph", cust_merge.findByPhone1);

  app.use("/api/cust_merge", router);
};
