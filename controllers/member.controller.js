const Member = require("../models/member.model.js");
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      // Create a Tutorial
      const member = new Member({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email
      });
      // Save Tutorial in the database
      Member.create(member, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial."
          });
        else res.send(data);
      });
    };
// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    Member.getAllPublished((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutorials."
          });
        else res.send(data);
      });
};