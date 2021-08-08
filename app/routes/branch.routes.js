module.exports = app => {
  const branch = require("../controllers/branch.controller.js");

  var router = require("express").Router();

  router.post("/", branch.create);
  
  router.put("/:branchCode", branch.updateBranchbybranchCode);
 
  router.get("/all", branch.findAll);

  router.get("/", branch.findAllActive);

  router.get("/branchCode/:bc", branch.findByBranchCode);
 
  app.use('/api/branch', router)
}