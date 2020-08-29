const db = require("../models");
const Invoice = db.invoice;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.inv_id) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const invoice = new Invoice({
    inv_id: req.body.inv_id,
    iid: req.body.iid,
    date: req.body.date,
    total: req.body.total,
    cashier: req.body.cashier,
    value: req.body.value,
    method: req.body.method,
  });

  invoice
    .save(invoice)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Invoice."
      });
    });
};

exports.findAll = (req, res) => {
  const inv_id = req.query.inv_id;
  var condition = inv_id ? { inv_id: { $regex: new RegExp(inv_id), $options: "i" } } : {};

  Invoice.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving invoices."
      });
    });
};

exports.findOne = (req, res) => {
  const inv_id = req.params.inv_id;

  Invoice.findById(inv_id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Invoice with id " + inv_id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Invoice with id = " + inv_id });
    });
};

exports.findByDate = (req, res) => {
  const date = req.params.dt;
  var condition = date
    ? {
      date: date,
    }
    : {};

  Invoice.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items.",
      });
    });
};

exports.findByCust = (req, res) => {
  const cust = req.params.cust;
  var condition = cust
    ? {
      cust: cust,
    }
    : {};

  Invoice.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items.",
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Invoice.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Invoice with id=${id}. Maybe Invoice was not found!`
        });
      } else res.send({ message: "Invoice was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Invoice with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const inv_id = req.params.inv_id;

  Invoice.findOneAndRemove(inv_id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Invoice with inv_id=${inv_id}. Maybe Invoice was not found!`
        });
      } else {
        res.send({
          message: "Invoice  was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Invoice with inv_id=" + inv_id
      });
    });
};

exports.findAllActive = (req, res) => {
  Invoice.find({ active: true })
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

exports.findLast = (req, res) => {
  Invoice.findOne().sort({ 'created_at' : -1 }).limit(1).then(data => {
    res.send(data);
  })
};