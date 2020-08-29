module.exports = (app) => {
  const items = require("../controllers/item.controller.js");
  const db = require("../models");
  const Item = db.item;

  var router = require("express").Router();

  router.post("/", items.create);

  router.put("/:id", items.update);

  router.delete("/:du", items.updateOne);

  router.get("/:id", items.findOne);

  router.get("/", items.findAllActive);  

  router.get("/brand/:br", items.findByBrand);

  router.get("/barcode/:bc", items.findBybarcode);

  router.get("/name/:nm", items.findByName);

  app.use("/api/item", router);
};
