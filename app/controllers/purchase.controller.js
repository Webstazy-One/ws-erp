const db = require("../models")
const { invoice } = require("../models")
const Purchase = db.purchase
const Invoice = db.invoice

exports.create = (req, res) => {

  const purchase = new Purchase({

    invId: req.body.invId,
    qty: req.body.qty,
    disc: req.body.disc,
    discPrice: req.body.discPrice,
    unitPrice: req.body.unitPrice,
    itemId: req.body.itemId,
    dateTime: req.body.dateTime,
    _active: true
  })


  purchase
    .save(purchase)
    .then(data => {

      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Purchase."
      })
    })
}



exports.findOne = (req, res) => {
  const purchaseId = req.params.purchaseId;

  Purchase.findById(purchaseId)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found purchase with id " + purchaseId });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving purchase with id=" + purchaseId });
    });
};

exports.findByInvoiceId = (req, res) => {
  const invId = req.params.invId;

  var condition = invId
    ? {
      invId: invId,
    }
    : {};

  Purchase.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving purchase by invoce id.",
      });
    });
};

exports.findAll = (req, res) => {
  Purchase.find()
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

exports.findAllActive = (req, res) => {
  Purchase.find({ _active: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving purchase."
      })
    })
}


exports.findByDateRange = (req, res) => {

  console.log(123);
  Purchase.aggregate([
    {
      "$match": {
        dateTime: {
          $gte: req.params.dateTimeBefore,
          $lt: req.params.dateTimeAfter
        }
      }
    },
    {
      "$group": {
        "_id": { "$dayOfYear": "$createdDate" },
        "totalSales": { "$sum": "$qty" }
      }
    }
  ],
  )

    .catch((err) => console.log(err))

    .then(($qty) => {
      res.send($qty)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Invoice."
      })
    })
}


