module.exports = (app) => {
  const brand = require("../controllers/brand.controller.js");

  var router = require("express").Router();

  // Create a new brand
  router.post("/", brand.create);

  router.get("/:brand_name", brand.findOne);
  // Retrieve all brand
  router.get("/", brand.findAll);

  // Update a brand with id
  router.put("/:id", brand.update);

  // Delete a brand with id
  router.delete("/:id", brand.delete);

  app.use("/api/brand", router);
};
