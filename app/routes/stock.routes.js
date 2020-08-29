module.exports = app => {
  const stock = require("../controllers/stock.controller.js");

  const db = require("../models");
  const Stock = db.stock;

  var router = require("express").Router();

  // Create a new stock
  router.post("/", stock.create);

  // Retrieve all stocks
  router.get("/", stock.findAll);


  //Retrieve a single with branch code 
  router.get("/:branch_CODE", stock.findOne);

  // Update a stock with branch code
  router.put("/:branch_CODE", stock.update);

  //Find by branch code
  router.get("/branch_CODE/:bc", stock.findByBranchCode);

  app.use("/api/stock", router);
};
