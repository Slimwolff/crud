module.exports = app => {
    const users = require("../controller/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a newusers
    router.post("/create", users.create);
  
    // Retrieve all users
    router.get("/getall", users.findAll);
  
    // Retrieve a singleusers with id
    router.get("/:id", users.findOne);
  
    // Update users with id
    router.put("/:id", users.update);
  
    // Delete ausers with id
    router.delete("/:id", users.delete);

    app.use('/api/users', router);
};