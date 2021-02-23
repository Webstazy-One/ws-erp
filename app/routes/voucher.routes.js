module.exports = (app) => {
    const voucher = require("../controllers/voucher.controller")

    var router = require("express").Router()

    router.post("/", voucher.create)
    router.delete("/:voucherId", voucher.delete)
    router.put("/:voucherId", voucher.update)
    router.get("/all", voucher.findAll)
    router.get("/", voucher.findAllActive)
    router.get("/:voucherId", voucher.findOne)
    router.get("/type/:type", voucher.findByType)
    app.use("/api/voucher", router)
}