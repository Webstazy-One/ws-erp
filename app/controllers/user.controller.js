const { user } = require("../models");
const User = require("../models/user.model");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

// Create and Save a user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a user
  const user = new User({

    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    phone: req.body.phone,
    roles: req.body.roles
  });

  // Save user in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stock."
      });
    });
};


// Find a user with username

exports.findOne = (req, res) => {
  const username = req.params.username;

  User.findById(username)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found a user with username" + username });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving user with username" + username });
    });
};

// Delete a user with the specified username in the request
exports.delete = (req, res) => {
  const username = req.params.username;

  User.findOneAndRemove(username, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with username=${username}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with username=" + username
      });
    });
};

