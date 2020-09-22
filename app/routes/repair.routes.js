module.exports = app => {
    const repairs = require("../controllers/repair.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", repairs.create);

    router.delete("/:jobcardId", repairs.DeleteFromJobCardId);

    router.put("/:jobcardId", repairs.updateRepairByJcId);
  
    router.get("/custPhone/:custno", repairs.findByCustNo);

    router.get("/:jobcardId", repairs.findByJobCardId);

    router.get("/await", repairs.findawaitrepairs);

    router.get("/", repairs.findAll);

    router.get("/id/last", repairs.findLast);

    app.use('/api/repair', router);
  };