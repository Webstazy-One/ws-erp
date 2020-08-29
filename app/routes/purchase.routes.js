module.exports = app => {
  const purchase = require("../controllers/purchase.controller.js");

  var router = require("express").Router();

  router.post("/", purchase.create);

  router.put("/:id", purchase.update);

  router.delete("/:purchase_id_iid", purchase.delete);

  // router.get("/", purchase.findAllActive);

  router.get("/:purchase_id", purchase.findOne);

  router.get("/invoice/:inv", purchase.findByInv);

  app.use('/api/purchase', router);
};