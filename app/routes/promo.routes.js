module.exports = app => {
  const promos = require("../controllers/promo.controller.js");
  const db = require("../models");
  const Promo = db.promo;

  var router = require("express").Router();

  router.post("/", promos.create);

  router.put("/:promoid", promos.update);

  router.delete("/:promoid", promos.delete);

  router.get("/:promoid", promos.findOne);

  router.get("/", promos.findAllActive);

  app.use("/api/promo", router);
};