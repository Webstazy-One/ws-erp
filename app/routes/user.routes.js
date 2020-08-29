const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const { user } = require("../models");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);


  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

};
module.exports = app => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();
  // Create a new user
  router.post("/", user.create);

  // Retrieve all users
  router.get("/", user.findAll);

  // Delete a User with username
  router.delete("/:username", user.delete);

  // Retrieve a single with item username
  router.get("/:username", user.findOne);

  app.use("/api/user", router);
}

