const db = require("../models");
const Exchange = db.exchange;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.iid) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a  Exchange
  const exchange = new Exchange({
    applied_inv: req.body.applied_inv,
    amount: req.body.amount,
    pid: req.body.pid,
    iid: req.body.iid,
    inv_id: req.body.inv_id,

  });

  // Save Exchange in the database
  exchange
    .save(exchange)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Exchange."
      });
    });
};

exports.findAll = (req, res) => {
  const iid = req.query.iid;
  var condition = iid ? { iid: { $regex: new RegExp(iid), $options: "i" } } : {};

  Exchange.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving exchanges."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Exchange.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Exchange with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Exchange with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Exchange.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Exchange with id=${id}. Maybe Exchange was not found!`
        });
      } else res.send({ message: "Exchange was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Exchange with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Exchange.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Exchange with id=${id}. Maybe Exchange was not found!`
        });
      } else {
        res.send({
          message: "Exchange was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Exchange with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Exchange.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Exchange was deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Exchange."
      });
    });
};