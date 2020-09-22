module.exports = app => {
  const stock = require("../controllers/stock.controller.js");

  const db = require("../models");
  const Stock = db.stock;

  var router = require("express").Router();
 
  router.post("/", stock.create);

  router.put("/update/:branchCode/:itemId/:qty", stock.stockUpdate);

  //router.put("/:branchCode/:currentStock", stock.updateCurrentStock);

  router.get("/", stock.findAll);

 router.get("/branchCode/:bc", stock.findByBranchCode);

  router.get("/itemId/:itemId", stock.findByItemId);

  app.use("/api/stock", router);
};