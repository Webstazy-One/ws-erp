module.exports = app => {
  const tag = require("../controllers/tag.controller.js");

  var router = require("express").Router();

  router.post("/", tag.create);

  app.use('/api/tag', router);
};