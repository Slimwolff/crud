module.exports = app => {
    const users = require("../controller/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a newusers
    router.post("/create", users.create);
  
    // Retrieve all users
    router.get("/getall", users.findAll);
  
    // Retrieve all published users
    // router.get("/published", users.findAllPublished);
  
    // Retrieve a singleusers with id
    router.get("/:id", users.findOne);
  
    // Update ausers with id
    router.put("/:id", users.update);
  
    // Delete ausers with id
    router.delete("/:id", users.delete);
  
    // Create a new Tutorial
    // router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);
};