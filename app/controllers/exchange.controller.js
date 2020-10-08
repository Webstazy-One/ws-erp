const db = require("../models");
const Exchange = db.exchange;

exports.create = (req, res) => {


  const exchange = new Exchange({
    invId: req.body.invId,
    pid: req.body.pid,
    condition: req.body.condition,
    amount: req.body.amount,
    appliedInv: req.body.appliedInv
  })

  exchange
    .save(exchange)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Exchange."
      })
    })
}

exports.findOne = (req, res) => {
  const exchangeId = req.params.exchangeId;

  Exchange.findById(exchangeId)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Exchange with exchangeId " + exchangeId })
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Exchange with exchangeId=" + exchangeId })
    })
}

exports.findByInvId = (req, res) => {
  const invId = req.params.invId;
  console.log(req.query);
  var condition = invId
    ? {
      invId: invId,
    }
    : {}

  Exchange.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving exchange."
      })
    })
}

exports.findByAppliedInv = (req, res) => {
  const appliedInv = req.params.appliedInv;
  console.log(req.query);
  var condition = appliedInv
    ? {
      appliedInv: appliedInv,
    }
    : {}

  Exchange.find(condition)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving exchange."
      })
    })
}

exports.findAll = (req, res) => {
  Exchange.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving exchange."
      })
    })
}