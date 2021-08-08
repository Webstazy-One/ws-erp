const db = require("../models")
const StockTransfer = db.stn

exports.create = (req, res) => {
  if (!req.body.STNid || !req.body.source || !req.body.destin) {
    res.status(400).send({ message: "Content can not be empty!" })
    return
  }
  const stockTransfer = new StockTransfer({
    STNid: req.body.STNid,
    sourceBranch: req.body.source,
    destinBranch: req.body.destin,
    itemCount: req.body.count
  })

  stockTransfer
    .save(stockTransfer)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the stock."
      })
    })
}