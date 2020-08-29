const db = require("../models");
const Branch = db.branch;

// Create and Save a new Branch
exports.create = (req, res) => {
  // Validate request
  if (!req.body.branch_CODE) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Branch
  const branch = new Branch({
    branch_CODE: req.body.branch_CODE,
    _active: req.body._active,
    branch_name: req.body.branch_name,
    branch_address: req.body.branch_address,
    branch_phone: req.body.branch_phone
  });

  // Save Branch in the database
  branch
    .save(branch)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Branch."
      });
    });
};

// Retrieve all Branches from the database.
exports.findAll = (req, res) => {
  const branch_CODE = req.query.branch_CODE;
  var condition = branch_CODE ? { branch_CODE: { $regex: new RegExp(branch_CODE), $options: "i" } } : {};

  Branch.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving branches."
      });
    });
};

// Find a branch with branch code
exports.findOne = (req, res) => {
  const branch_CODE = req.params.branch_CODE;

  Branch.findById(branch_CODE)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found stock with branch code" + branch_CODE });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving stock with branch code" + branch_CODE });
    });
};

// Update a Branch by the branch code in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const branch_CODE = req.params.branch_CODE;

  Branch.findOneAndUpdate(branch_CODE, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Branch with branch code=${branch_CODE}. Maybe Branch was not found!`
        });
      } else res.send({ message: "Branch was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Branch with branch_CODE=" + branch_CODE
      });
    });
};


// Delete a Branch with the specified branch_CODE in the request
exports.delete = (req, res) => {
  const branch_CODE = req.params.branch_CODE;

  Branch.findOneAndRemove(branch_CODE, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Branch with branch_CODE=${branch_CODE}. Maybe Branch was not found!`
        });
      } else {
        res.send({
          message: "Branch was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Branch with branch_CODE=" + branch_CODE
      });
    });
};


// List all Branches from the database.
exports.findAll = (req, res) => {
  const branch_CODE = req.query.branch_CODE;
  var condition = branch_CODE ? { branch_CODE: { $regex: new RegExp(branch_CODE), $options: "i" } } : {};

  Branch.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving branches."
      });
    });
};

// Find all branch which _active
exports.findAllActive = (req, res) => {
  Branch.find({ active: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Promo."
      });
    });
};





