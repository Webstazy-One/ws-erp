const db = require("../models");
const Customer = db.customer;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const customer = new Customer({
    phone: req.body.phone,
    name: req.body.name,
    address: req.body.address,
  });

  customer
    .save(customer)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the customer.",
      });
    });
};

exports.findAll = (req, res) => {
  Customer.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customer.",
      });
    });
};

// // Find a single Customer with an id
// exports.findOne = (req, res) => {
//   const phone = req.params.phone;

//   Customer.findById(phone)
//     .then(data => {
//       if (!data)
//         res.status(404).send({ message: "Not found customer with phone " + phone });
//       else res.send(data);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .send({ message: "Error retrieving customer with phone =" + phone });
//     });
// };

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const phone = req.params.phone;

  Customer.findOneAndUpdate(phone, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Customer with phone=${phone}. Maybe Customer was not found!`,
        });
      } else res.send({ message: "Customer was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Customer with phone=" + phone,
      });
    });
};

exports.delete = (req, res) => {
  const phone = req.params.phone;

  Customer.findOneAndRemove(phone, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Customer with phone=${phone}. Maybe Customer was not found!`,
        });
      } else {
        res.send({
          message: "Customer was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Customer with phone=" + phone,
      });
    });
};

exports.findByPhone = (req, res) => {
  const phone = req.params.ph;
  var condition = phone
    ? {
      phone: { $regex: new RegExp(req.params.ph), $options: "i" },
    }
    : {};

  Customer.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items.",
      });
    });
};
