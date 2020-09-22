module.exports = (app) => {
  const brand = require("../controllers/brand.controller.js")

  var router = require("express").Router()

  router.post("/", brand.create)

  router.delete("/:brandName", brand.DeleteFromBrandName)

  router.put("/:brandName", brand.updateBrandByBrandName)

  router.get("/all", brand.findAll)

  router.get("/", brand.findAllActive)

  router.get("/:brandName", brand.findByBrandName)

  app.use("/api/brand", router)
}
