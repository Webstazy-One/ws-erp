module.exports = app => {
  const tag = require("../controllers/tag.controller.js");

  var router = require("express").Router();

  // Create a new Tag
  router.post("/", tag.create);

  // Retrieve all Tags
  router.get("/", tag.findAll);

  // Retrieve a single Tag with id
  router.get("/:id", tag.findOne);

  // Update a tag with id
  router.put("/:id", tag.update);

  // Delete a tag with id
  router.delete("/:id", tag.delete);

  // Create a new tag
  router.delete("/", tag.deleteAll);

  app.use('/api/tag', router);
};