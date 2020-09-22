const db = require("../models");
const Stock = db.stock;


exports.create = (req, res) => {

  if (!req.body.branchCode) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const stock = new Stock({

    branchCode: req.body.branchCode,
    itemId: req.body.itemId,
    currentStock: req.body.currentStock
  });

  stock
    .save(stock)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the stock."
      });
    });
};

exports.findByBranchCode = (req, res) => {
  const branchCode = req.params.bc;
  console.log(req.query);
  var condition = branchCode
    ? {
      branchCode: branchCode,
    }
    : {};

  Stock.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items.",
      });
    });
};

exports.findByItemId = (req, res) => {
  const itemId = req.params.itemId;
  console.log(req.query);
  var condition = itemId
    ? {
      itemId: itemId,
    }
    : {};

  Stock.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items.",
      });
    });
};

exports.findAll = (req, res) => {
  Stock.find()
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

exports.updateCurrentStock = (req, res) => {
  const branchCode = req.params.branchCode;
  const currentStock = req.params.currentStock;

  Stock.findOneAndUpdate({ branchCode: branchCode }, { $set: { currentStock: currentStock + qty } })
    .then(data => {

      if (!data) {
        res.status(404).send({
          message: `Cannot update item with currentStock=${currentStock}. Maybe item was not found!`,
        });
      } else res.send(true);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating item with currentStock=" + currentStock,
      });
    });
}


exports.stockUpdate = (req, res) => {
  const branchCode = req.params.branchCode
  const itemId = req.params.itemId

  Stock.updateOne({ branchCode : branchCode, itemId: itemId }, { $inc : { "currentStock" : req.params.qty } })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update currentStock=${currentStock}`
        })
      } else res.send('K');
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating currentStock=" + currentStock
      })
    })

}