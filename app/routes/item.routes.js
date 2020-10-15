module.exports = (app) => {
  const items = require("../controllers/item.controller.js");
  const db = require("../models");
  
  var router = require("express").Router();

  router.post("/", items.create);

  router.delete("/:iid", items.DeleteFromItemId);

  router.put("/:id", items.update);
  
  router.put("/:id/:price", items.updatePriceById);
  
  router.get("/", items.findAllActive);

  router.get("/top", items.findTopItems);

  router.get("/all", items.findAll);

  router.get("/brand/:br", items.findByBrand);

  router.get("/barcode/:bc", items.findBybarcode);

  router.get("/name/:name", items.findByName);

  router.get("/:id", items.findOne);

  router.get("/id/:id", items.findOne);
  
  app.use("/api/item", router);

  router.get("/:id", items.hotfix1);
};
