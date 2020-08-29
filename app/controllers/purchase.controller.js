const db = require("../models");
const Purchase = db.purchase;

// Create and Save a new Purchase
exports.create = (req, res) => {
  // Validate request
  if (!req.body.purchase_id_iid) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Purchase
  const purchase = new Purchase({
    purchase_id_iid: req.body.purchase_id_iid,
    inv_id: req.body.inv_id,
    qty: req.body.qty,
    disc: req.body.disc,
    disc_price: req.body.disc_price,
    unit_price: req.body.unit_price,
    branch_CODE: req.body.branch_CODE,
    _active: req.body._active ? req.body.active : false,
  });

  // Save Purchase in the database
  purchase
    .save(purchase)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Purchase."
      });
    });
};

// Retrieve all Purchase from the database.
exports.findAll = (req, res) => {
  const purchase_id = req.query.purchase_id;
  var condition = purchase_id ? { purchase_id: { $regex: new RegExp(purchase_id), $options: "i" } } : {};

  Purchase.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Purchase."
      });
    });
};

exports.findOne = (req, res) => {
  const purchase_id_iid = req.params.purchase_id_iid;

  Purchase.findById(purchase_id_iid)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Purchase with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Purchase with id=" + id });
    });
};

exports.findByInv = (req, res) => {
  const inv = req.params.inv;

  var condition = inv ? { inv_id : req.params.inv } : {};

  Purchase.find(condition)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Purchase with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Purchase with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Purchase.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Purchase with id=${id}. Maybe Purchase was not found!`
        });
      } else res.send({ message: "Purchase was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Purchase with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const purchase_id_iid = req.params.purchase_id_iid;

  Purchase.findOneAndRemove(purchase_id_iid, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Purchase with purchase_id_iid=${purchase_id_iid}. Maybe Purchase was not found!`
        });
      } else {
        res.send({
          message: "Purchase was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Purchase with purchase_id_iid=" + purchase_id_iid
      });
    });
};



// Find all purchase which active
exports.findAllActive = (req, res) => {
  Purchase.find({ _active: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving purchase."
      });
    });
};
