module.exports = app => {
  const invoice = require("../controllers/invoice.controller.js");

  const db = require("../models");

  const Invoice = db.invoice;

  var router = require("express").Router();

  router.post("/", invoice.create);

  router.delete("/:invId", invoice.DeleteFromInvoiceId);

  router.get("/all", invoice.findAll);


  router.get("/", invoice.findAllActive);


  router.get("/dateRange/:dateTimeBefore/:dateTimeAfter", invoice.findByDateRange);

  router.get("/profit/dateRange/:dateTimeBefore/:dateTimeAfter", invoice.findByProfitAndDateRange);

  router.get("/date/:dt", invoice.findBydateTime);

  router.get("/:invId", invoice.findByInvoiceId);

  router.get("/customer/:ph", invoice.findByCustPhoneNo);

  router.get("/id/last/:branchCode", invoice.findLast);

  app.use('/api/invoice', router);
};