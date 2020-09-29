const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const { user } = require("../models");
var router = require("express").Router();
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    )
    next()
  })

  router.delete("/:username", controller.DeleteFromUser)

  app.get("/api/user/", controller.allAccess)

  app.get("/api/userProfile", [authJwt.verifyToken], controller.userBoard)

  router.get("/active", controller.findAllActive);

  router.put("/:username/:password", controller.updatePasswordByUserName)

  router.delete("/:username", controller.DeleteUser)

  app.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  )
 
  app.get(
    "/api/overrideUser",
    [authJwt.verifyToken, authJwt.isOverrideUser],
    controller.overrideUserBoard
  )

    app.use("/api/user", router)
}

 
 

