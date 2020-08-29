module.exports = app => {
    const repairs = require("../controllers/repair.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Item
    router.post("/", repairs.create);
  
    // Retrieve all Items
    router.get("/", repairs.findAll);
  
    // Retrieve a single Item with id
    router.get("/:id", repairs.findOne);
  
    // Update a Item with id
    router.put("/:id", repairs.update);
  
    // Delete a Item with id
    router.delete("/:id", repairs.delete);
  
    // Create a new Item
    router.delete("/", repairs.deleteAll);
  
    app.use('/api/repair', router);
  };