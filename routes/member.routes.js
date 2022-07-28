module.exports = app => {
    const members = require("../controllers/members.controller.js");
    var router = require("express").Router();
    // Create a new members
    router.post("/", members.create);
    // Retrieve all members
    router.get("/", members.findAll);
    // Retrieve all published members
    router.get("/published", members.findAllPublished);
    // Retrieve a single members with id
    router.get("/:id", members.findOne);
    // Update a members with id
    router.put("/:id", members.update);
    // Delete a members with id
    router.delete("/:id", members.delete);
    // Delete all members
    router.delete("/", members.deleteAll);
    app.use('/api/members', router);
  };