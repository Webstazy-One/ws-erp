module.exports = app => {
  const stock = require("../controllers/stock.controller.js")

  var router = require("express").Router()

  router.post("/", stock.create)

  router.put("/update/:branchCode/:itemId/:qty", stock.stockPlus)

  // router.put("/set/:branchCode/:itemId/:qty", stock.stockUpdate);

  router.get("/", stock.findAll)

  router.get("/stock/:branchCode/:itemId", stock.findOne)

  // router.get("/barcode/:itemId/:amount", stock.findBarcodeForItem)

  router.get("/barcode/:itemId/:amount", stock.findBarcodeItem)

  router.get("/branchCode/:bc", stock.findByBranchCode)

  router.get("/both/branch/brand/:branchCode/:brand", stock.findByBranChCodeAndBrand)

  router.get("/brand/:brand", stock.findByBrand)

  router.get("/brand/branch/:brand/:branch", stock.findByBrandBranch)

  router.put("/stocktransfer/:sentbranchCode/:receivedbranchCode/:itemId/:qty", stock.stockTransfer)

  router.get("/itemId/:itemId", stock.findByItemId);

  app.use("/api/stock", router)
}