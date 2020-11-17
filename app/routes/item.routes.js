module.exports = (app) => {
  const items = require("../controllers/item.controller.js")

  var router = require("express").Router()

  router.post(
    "/",
    [
      checkItemnameBrandExisted
    ],
    items.create)

  router.delete("/:iid", items.DeleteFromItemId)

  router.put("/:id", [
    checkItemnameBrandExisted
  ], items.update)

  router.put("/:id/:price", items.updatePriceById)

  router.put("/active/resolve/:id", items.UpdatedtoResolve)

  router.put("/merge/:id1/:id2", items.UpdateDisputedToRealItem)

  router.get("/", items.findAllActive)

  router.get("/top/:skip", items.findTopItems)

  router.get("/all", items.findAll)

  router.get("/brand/:br", items.findByBrand)

  router.get("/barcode/:bc", items.findBybarcode)

  router.get("/name/:name", items.findByName)

  router.get("/:id", items.findOne)

  router.get("/cat/:subCategory", items.findBySubcategory)

  router.get("/brand/bName/:bName", items.findByBrandAndName)

  router.get("/active/disputed", items.findItemDisputed)

  router.get("/merge/:id1/:id2", items.findDisputedAndRealItem)

  app.use("/api/item", router)

  router.get("/:id", items.hotfix1)
};
