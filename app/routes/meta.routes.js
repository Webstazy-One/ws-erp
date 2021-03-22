module.exports = app => {
    const meta = require("../controllers/meta.controller.js");

    var router = require("express").Router();

    router.put("/SGDRate", meta.updateSGDRate);
    router.put("/SGDInc", meta.updateSGDInc);
    router.get("/:k", meta.findByName);
    router.get("/all", meta.findAll);

    app.use('/api/meta', router);
};