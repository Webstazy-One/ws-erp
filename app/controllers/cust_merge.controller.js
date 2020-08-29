const db = require("../models");
const Cust_merge = db.cust_merge;

// Create and Save a new cust_merge
exports.create = (req, res) => {
  // Validate request
  if (!req.body.phone) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a cust_merge
  const cust_merge = new Cust_merge({
    phone: req.body.phone,
    phone1: req.body.phone1

  });

  // Save cust_merge in the database
  cust_merge
    .save(cust_merge)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the cust_merge."
      });
    });
};

// Retrieve all cust_merges from the database.
exports.findAll = (req, res) => {
  const phone = req.query.phone;
  var condition = phone ? { phone: { $regex: new RegExp(phone), $options: "i" } } : {};

  Cust_merge.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cust_merges."
      });
    });
};

// Find a single cust_merge with phone
exports.findOne = (req, res) => {
  const phone = req.params.phone;

  Cust_merge.findById(phone)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found cust_merge with phone " + phone });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving cust_merge with phone=" + phone });
    });
};


// Delete a cust_merge with the phone in the request
exports.delete = (req, res) => {
  const phone = req.params.phone;

  Cust_merge.findOneAndRemove(phone, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete cust_merge with id=${phone}. Maybe cust_merge was not found!`
        });
      } else {
        res.send({
          message: "Cust_merge was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Cust_merge with phone=" + phone
      });
    });
};

// Delete a cust_merge with the phone1 in the request
exports.delete = (req, res) => {
  const phone1 = req.params.phone1;

  Cust_merge.findOneAndRemove(phone1, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete cust_merge with id=${phone1}. Maybe cust_merge was not found!`
        });
      } else {
        res.send({
          message: "Cust_merge was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Cust_merge with phone1=" + phone1
      });
    });
};

//List item by phone1
exports.findByPhone1 = (req, res) => {
  const phone1 = req.params.ph;
  console.log(req.query);
  var condition = phone1
    ? {
      phone1: phone1,
    }
    : {};

  Cust_merge.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items.",
      });
    });
};
