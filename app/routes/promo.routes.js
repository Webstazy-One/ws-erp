module.exports = app => {
  const promos = require("../controllers/promo.controller.js");
  
  const db = require("../models");
  
  var router = require("express").Router();

  router.post("/", promos.create);

  router.delete("/:promoId", promos.DeleteFromPromoId);

  router.get("/all", promos.findAll);

  router.get("/", promos.findAllActive);

  router.get("/brand/:brandName", promos.findByBrandName);

  router.get("/item/:itemId", promos.findByItemId);

  router.get("/:promoId", promos.findOne);
  

  
  router.get("/itemOrBrand/:appliedto", promos.findByBrandNameOrItemId);
  app.use("/api/promo", router);
};
