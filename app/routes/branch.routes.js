module.exports = app => {
  const branch = require("../controllers/branch.controller.js");

  var router = require("express").Router();

  // Create a new Branch
  router.post("/", branch.create);

  // Retrieve all Branches
  router.get("/", branch.findAll);


  // Retrieve a single Branch with id
  router.get("/:branch_CODE", branch.findOne);

  // Update a Branch with id
  router.put("/:id", branch.update);

  // Retrieve all Active branches
  router.get("/", branch.findAllActive);

  // Delete a Branch with id
  router.delete("/:branch_CODE", branch.delete);

  // Update a branch with branch code
  router.put("/:branch_CODE", branch.update);

  app.use('/api/branch', router);
};